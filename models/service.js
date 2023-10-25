const db = require("../config/database");
const mysql = require("mysql2/promise");

const crudService = async function (
  _id,
  _kerusakan_alat,
  _biaya_service,
  _operation
) {
  const connection = await mysql.createConnection(db);
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute("CALL ManageService(?, ?, ?, ?)", [
      _id,
      _kerusakan_alat,
      _biaya_service,
      _operation,
    ]);
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

const getServiceById = async function (_id) {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM service WHERE id = ?",
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

const getServiceList = async function () {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute("SELECT * FROM service");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

module.exports = {
  crudService,
  getServiceById,
  getServiceList,
};
