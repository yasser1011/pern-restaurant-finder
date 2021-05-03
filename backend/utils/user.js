const pool = require("../DB/db");

const findUserByName = async (name) => {
  try {
    const user = await pool.query(`SELECT * FROM users where username = $1`, [
      name,
    ]);
    // console.log(user.rows);
    return user.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const findUserById = async (id) => {
  try {
    const user = await pool.query(`SELECT * FROM users where id = $1`, [id]);
    return user.rows[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { findUserByName, findUserById };
