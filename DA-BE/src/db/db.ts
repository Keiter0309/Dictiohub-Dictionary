import mysql, { Connection, ConnectionConfig } from "mysql2";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const connectionConfig: ConnectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
} as ConnectionConfig;

// Create the MySQL connection
const con: Connection = mysql.createConnection(connectionConfig);

con.connect(async (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the database");

  // Add the admin user
  const prisma = new PrismaClient();
  try {
    // Check if the admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@gmail.com" },
    });

    if (!existingAdmin) {
      // Hash the admin password
      const hashedPassword = await bcrypt.hash("Dictiohub@admin", 10);

      // Create the admin user
      await prisma.user.create({
        data: {
          firstName: "Admin",
          lastName: "Admin",
          email: "admin@gmail.com",
          username: "administrator",
          password: hashedPassword,
          confirmPassword: hashedPassword,
          role: "admin",
        },
      });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error: any) {
    console.error("Error creating admin user:", error.message);
  } finally {
    await prisma.$disconnect();
  }
});

export default con;