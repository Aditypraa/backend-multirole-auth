import Users from "../models/userModel.js";
import argon2 from "argon2";

export const getAllUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["id", "uuid", "name", "email", "role"], // menampilkan data id, uuid, name, email, dan role
    });
    res.status(200).json({ message: "Get all users", data: response }); // menampilkan pesan dan data user
  } catch (error) {
    res.status(500).json({ message: error.message }); // menampilkan pesan error
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["id", "uuid", "name", "email", "role"], // menampilkan data id, uuid, name, email, dan role
      where: { uuid: req.params.id }, // mencari user berdasarkan uuid
    });
    res.status(200).json({ message: "Get user by id", data: response }); // menampilkan pesan dan data user
  } catch (error) {
    res.status(500).json({ message: error.message }); // menampilkan pesan error
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body; // mengambil data name, email, password, confirmPassword, dan role dari request body
  if (password !== confirmPassword) {
    // jika password tidak sama dengan confirmPassword
    return res.status(400).json({ message: "Password not match" }); // maka tampilkan pesan "Password not match"
  }
  const hashPassword = await argon2.hash(password); // hash password menggunakan argon2
  try {
    const response = await Users.create({
      // membuat user baru
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    res.status(201).json({ message: "Register success", data: response }); // menampilkan pesan dan data user yang berhasil dibuat
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({ where: { uuid: req.params.id } }); // mencari user berdasarkan uuid

  if (!user) return res.status(404).json({ message: "User not found" }); // jika user tidak ditemukan, maka tampilkan pesan "User not found"

  const { name, email, password, confirmPassword, role } = req.body; // mengambil data name, email, password, confirmPassword, dan role dari request body

  let hashPassword; // deklarasi variabel hashPassword

  if (password === "" || password === null) {
    // jika password kosong atau null
    hashPassword = user.password; // maka gunakan password yang sudah ada
  } else {
    hashPassword = await argon2.hash(password); // jika tidak, maka hash password menggunakan argon2
  }

  if (password !== confirmPassword)
    // jika password tidak sama dengan confirmPassword
    return res.status(400).json({ message: "Password not match" }); // maka tampilkan pesan "Password not match"

  try {
    await Users.update(
      // update data user
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: { id: user.id }, // dimana id user sesuai dengan id user yang dicari
      }
    );

    const updatedUser = await Users.findOne({ where: { id: user.id } }); // mencari user berdasarkan id user yang dicari

    res.status(200).json({ message: "Update user success", data: updatedUser }); // menampilkan pesan dan data user yang berhasil diupdate
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    attributes: ["id", "uuid", "name", "email", "role"], // menampilkan data id, uuid, name, email, dan role
    where: { uuid: req.params.id }, // mencari user berdasarkan uuid
  });

  if (!user) return res.status(404).json({ message: "User not found" }); // jika user tidak ditemukan, maka tampilkan pesan "User not found"

  try {
    const deletedUserData = { ...user.dataValues }; // mengambil data user yang akan dihapus

    await Users.destroy({ where: { id: user.id } }); // hapus user berdasarkan id user yang dicari

    res
      .status(200)
      .json({ message: "Delete user success", data: deletedUserData }); // menampilkan pesan dan data user yang berhasil dihapus
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
