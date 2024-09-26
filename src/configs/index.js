import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const configs = {
  port: process.env.APP_PORT || 3000,
  secret: process.env.SECRET_KEY,
  db: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT || "mysql", // default ke MySQL, bisa PostgreSQL, SQLite, dll.
  },
};

// Membuat instance Sequelize
const dbSequelize = new Sequelize(
  configs.db.database,
  configs.db.username,
  configs.db.password,
  {
    host: configs.db.host,
    dialect: configs.db.dialect, // Menggunakan dialect dari environment atau default
  }
);

// Mengecek koneksi ke database
dbSequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

export default dbSequelize;
