import mysql, { Connection, ConnectionConfig } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connectionConfig: ConnectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
} as ConnectionConfig;

// Create the MySQL connection
const con: Connection = mysql.createConnection(connectionConfig);

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the database");
});

// Auto create the table if it doesn't exist
con.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    confirmPassword VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resetPasswordOTP VARCHAR(255),
    resetPasswordExpires TIMESTAMP
)`,
  (err) => {
    if (err) {
      console.error("Error creating the table:", err.message);
      return;
    }
    console.log("Table created");
  }
);

export default con;
