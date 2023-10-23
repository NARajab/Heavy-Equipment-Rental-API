const db = require("../config/database");
const mysql = require("mysql2/promise");

const crudPenyewa = async function (
  _id,
  _nama_penyewa,
  _alamat_penyewa,
  _no_telphone,
  _operation
) {
  const connection = await mysql.createConnection(db);
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      "CALL ManageAlatBerat(?, ?, ?, ?, ?)",
      [_id, _nama_penyewa, _alamat_penyewa, _no_telphone, _operation]
    );
    await connection.commit();

    // Ambil hasil prosedur jika berhasil dan kembalikan nilainya
    if (rows && rows.length > 0) {
      return rows[0]; // Atau sesuaikan dengan hasil yang kamu inginkan
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

const getPenyewaById = async function (_id) {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM penyewa WHERE id = ?",
      [_id]
    );
    if (rows.length > 0) {
      return rows[0]; // Mengembalikan penyewa pertama yang ditemukan
    } else {
      return null; // Mengembalikan null jika penyewa tidak ditemukan
    }
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

const getPenyewaList = async function () {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute("SELECT * FROM penyewa");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

module.exports = {
  crudPenyewa,
  getPenyewaById,
  getPenyewaList,
};
