const db = require("../config/database");
const mysql = require("mysql2/promise");

const crudDetailRental = async function (
  _id,
  _id_penyewa,
  _id_alat_berat_service,
  _jumlah_unit,
  _tanggal_sewa,
  _tanggal_kembali,
  _total_pembayaran,
  _tanggal_pembayaran,
  _operation
) {
  const connection = await mysql.createConnection(db);
  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      "CALL ManageDetailRental(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        _id,
        _id_penyewa,
        _id_alat_berat_service,
        _jumlah_unit,
        _tanggal_sewa,
        _tanggal_kembali,
        _total_pembayaran,
        _tanggal_pembayaran,
        _operation,
      ]
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

const getDetailRentalById = async function (_id) {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM detail_rental WHERE id = ?",
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

const getDetailRentalList = async function (_nama_penyewa) {
  const connection = await mysql.createConnection(db);
  try {
    if (_nama_penyewa === undefined) {
      _nama_penyewa = null;
    }
    const [rows] = await connection.execute(
      "CALL CheckDetailRentalByNamePenyewa(?)",
      [_nama_penyewa]
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

module.exports = {
  crudDetailRental,
  getDetailRentalById,
  getDetailRentalList,
};
