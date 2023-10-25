const db = require("../config/database");
const mysql = require("mysql2/promise");

const crudAlatBeratService = async function (
  _id,
  _id_alat_berat,
  _id_service,
  _operation
) {
  const connection = await mysql.createConnection(db);
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      "CALL ManageAlatBeratService(?, ?, ?, ?)",
      [_id, _id_alat_berat, _id_service, _operation]
    );
    await connection.commit();

    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      throw new Error(
        "Prosedur penyimpanan tidak mengembalikan hasil yang diharapkan"
      );
    }
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.end();
  }
};

const getAlatBeratServiceById = async function (_id) {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM alat_berat_service WHERE id = ?",
      [_id]
    );
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

const getAlatBeratServiceList = async function () {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute("SELECT * FROM alat_berat_service");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

module.exports = {
  crudAlatBeratService,
  getAlatBeratServiceById,
  getAlatBeratServiceList,
};
