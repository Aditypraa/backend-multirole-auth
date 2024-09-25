import { Sequelize } from "sequelize";
import dbSequelize from "../configs/index.js";
import Users from "./userModel.js";

const { DataTypes } = Sequelize;

const Products = dbSequelize.define(
  "product",
  {
    uuid: {
      type: DataTypes.UUID, // tipe data UUID
      defaultValue: DataTypes.UUIDV4, // nilai default UUID
      allowNull: false, // tidak boleh null
      validate: {
        notEmpty: true, // tidak boleh kosong
      },
    },
    name: {
      type: DataTypes.STRING, // tipe data string
      allowNull: false, // tidak boleh null
      validate: {
        notEmpty: true, // tidak boleh kosong
        len: [3, 255], // panjang karakter 3-255
      },
    },
    name: {
      type: DataTypes.STRING, // tipe data string
      allowNull: false, // tidak boleh null
      validate: {
        notEmpty: true, // tidak boleh kosong
        len: [3, 255], // panjang karakter 3-255
      },
    },
    price: {
      type: DataTypes.INTEGER, // tipe data integer
      allowNull: false, // tidak boleh null
      validate: {
        notEmpty: true, // tidak boleh kosong
      },
    },
    userId: {
      // foreign key dari tabel users (userId)
      type: DataTypes.INTEGER, // tipe data string
      allowNull: false, // tidak boleh null
      validate: {
        notEmpty: true, // tidak boleh kosong
      },
    },
  },
  {
    freezeTableName: true, // agar nama tabel sesuai dengan nama model
  }
);

// relasi one-to-many
Users.hasMany(Products); // hasMany artinya satu user bisa memiliki banyak product
Products.belongsTo(Users, { foreignKey: "userId" }); // belongsTo artinya satu product hanya dimiliki oleh satu user
//ATAU bisa juga dengan cara seperti ini
// Users.hasMany(Products, { foreignKey: "userId" }); // relasi one-to-many

export default Products;
