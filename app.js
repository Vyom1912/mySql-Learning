import mysql from "mysql2/promise";

// step 1: connect to mySQL server
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Patel@9876",
  database: "mysql_db",
});
console.log("MySQL connected Successfully");
// stepp 2: create a database
// await db.execute(`create database mysql_db`);
// console.log(await db.execute("show databases"));

// step 3: create a table
// await db.execute(
//   ` CREATE TABLE users(
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     username VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`,
// );
// step 4: CURD Operation in the table
//! Insert
// Using Inline Values(Not Recommended)
// await db.execute(
//   `INSERT INTO users (username, email) VALUES ("dhruv", "dhruv@example.com")`,
// );

// Using Prepared Statements(Recommended)
// await db.execute(`INSERT INTO users (username, email) VALUES (?, ?)`, [
//   "johnDoe",
//   "john@example.com",
// ]);

// const values = [
//   ["alice", "alice@example.com"],
//   ["bob", "bob@example.com"],
//   ["charlie", "charlie@example.com"],
// ];
// use db.query for multiple insertions
// await db.query(`INSERT INTO users (username, email) VALUES ?`, [values]);

//! Read
const [rows] = await db.execute("SELECT * FROM users");
// const [rows] = await db.execute("SELECT * FROM users where username=?", [
//   "dhruv",
// ]);

console.log(rows);

// UPDATE
// try {
//   const [result] = await db.execute(
//     `UPDATE users SET email=? WHERE username=?`,
//     ["johnUpdated@example.com", "johnDoe"],
//   );
//   console.log("Update Result:", result);
// } catch (error) {
//   console.error("Error during update:", error);
// }

// DELETE

// try {
//   const [result] = await db.execute(`DELETE FROM users WHERE username=?`, [
//     "johnDoe",
//   ]);
//   console.log("Delete Result:", result);
// } catch (error) {
//   console.error("Error during delete:", error);
// }

// step 6: close the connection
await db.end();
