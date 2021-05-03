const pool = require("../DB/db");

class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
  }

  async save() {
    // console.log(this.password);
    // console.log(this.username);
    try {
      //   const savedUser = await pool.query(
      //     "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      //     [this.username, this.password]
      //   );
      const savedUser = await pool.query(
        `INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *`,
        [this.username, this.password, this.role]
      );
      return savedUser.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("error in db!");
    }
  }
}

module.exports = User;
