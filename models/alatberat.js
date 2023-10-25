const db = require("../config/database");
const mysql = require("mysql2/promise");

const crudAlatBerat = async function (
  _id,
  _nama_alat,
  _harga_sewa_perJam,
  _stock,
  _operation
) {
  const connection = await mysql.createConnection(db);
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      "CALL ManageAlatBerat(?, ?, ?, ?, ?)",
      [_id, _nama_alat, _harga_sewa_perJam, _stock, _operation]
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

const getAlatBeratById = async function (_id) {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM alat_berat WHERE id = ?",
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

const getAlatBeratList = async function (_nama_alat) {
  const connection = await mysql.createConnection(db);
  try {
    if (_nama_alat === undefined) {
      _nama_alat = null;
    }
    const [rows] = await connection.execute("CALL CheckAlatBeratByName(?)", [
      _nama_alat,
    ]);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

module.exports = {
  crudAlatBerat,
  getAlatBeratById,
  getAlatBeratList,
};
