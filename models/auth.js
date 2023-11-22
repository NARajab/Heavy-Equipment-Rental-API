const db = require("../config/database");
const mysql = require("mysql2/promise");

const bcrypt = require("bcrypt");
const salRounds = 10;

const authenticateUser = async function (email, password) {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      console.log("Match:", match);
      return match ? user : null;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

const geUsertById = async function (id) {
  const connection = await mysql.createConnection(db);
  try {
    const [rows] = await connection.execute(`SELECT * FROM user WHERE id = ?`, [
      id,
    ]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
};

module.exports = {
  authenticateUser,
  geUsertById,
};
