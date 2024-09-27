import { Sequelize } from "sequelize";
import dbSequelize from "../configs/index.js";

const { DataTypes } = Sequelize;

const Users = dbSequelize.define(
  "users",
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
    email: {
      type: DataTypes.STRING, // tipe data string
      allowNull: false, // tidak boleh null
      validate: {
        notEmpty: true, // tidak boleh kosong
        isEmail: true, // harus berformat email
      },
    },
    password: {
      type: DataTypes.STRING, // tipe data string
      allowNull: false, // tidak boleh null
      validate: {
        notEmpty: true, // tidak boleh kosong
      },
    },
    role: {
      type: DataTypes.STRING, // tipe data string
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

export default Users;
