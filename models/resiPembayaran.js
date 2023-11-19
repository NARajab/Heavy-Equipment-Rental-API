const db = require("../config/database");
const mysql = require("mysql2/promise");

const getResiPembayaranById = async function (_idSewa) {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM resi_pembayaran WHERE id = ?",
      [_idSewa]
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

module.exports = {
  getResiPembayaranById,
};
