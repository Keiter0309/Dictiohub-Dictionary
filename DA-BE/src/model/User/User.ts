import db from "../../db/db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// User model
export class User {
  // Get all user
  static fetchAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user", (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Get user by id
  static fetchById(id: number) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE id = ?",
        [id],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static fetchByEmail(email: string) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            console.log("Result:", result);

            if (result.length > 0) {
              resolve(result[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  // Create a new user
  static create(data: any) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO user SET ?", data, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Update user by id
  static update(id: number, data: any) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET ? WHERE id = ?",
        [data, id],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  // Delete user by id
  static delete(id: number) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM user WHERE id = ?",
        [id],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  // Save OTP to the database
  static saveOTP(email: string, otp: number) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET resetPasswordOTP = ?, resetPasswordExpires = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE email = ?",
        [otp, email],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  // Update password
  static updatePassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET password = ? WHERE email = ?",
        [password, email],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}
