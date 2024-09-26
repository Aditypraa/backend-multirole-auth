import Users from "../models/userModel.js";
import argon2 from "argon2";

export const signin = async (req, res) => {
  const user = await Users.findOne({ where: { email: req.body.email } }); // mencari user berdasarkan email

  if (!user) return res.status(404).json({ message: "User not found" }); // jika user tidak ditemukan, maka tampilkan pesan "User not found"

  const validPassword = await argon2.verify(user.password, req.body.password); // verifikasi password menggunakan argon2

  if (!validPassword) return res.status(400).json({ message: "Invalid password" }); // jika password tidak valid, maka tampilkan pesan "Invalid password"

  req.session.userId = user.uuid; // set session userId dengan uuid user
  const uuid = user.uuid; // mengambil data uuid dari user
  const name = user.name; // mengambil data name dari user
  const email = user.email; // mengambil data email dari user
  const role = user.role; // mengambil data role dari user

  res
    .status(200)
    .json({ message: "Signin success", data: { uuid, name, email, role } }); // menampilkan pesan dan data user yang berhasil login
};

// Get user session
export const getSession = async (req, res) => {
  if (!req.session.userId) return res.status(404).json({ message: "User not found" }); // jika session userId tidak ada, maka tampilkan pesan "User not found"

  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"], // menampilkan data uuid, name, email, dan role
    where: { uuid: req.session.userId }, // mencari user berdasarkan uuid session userId
  });

  if (!user) return res.status(404).json({ message: "User not found" }); // jika user tidak ditemukan, maka tampilkan pesan "User not found"

  res.status(200).json({ message: "Get session", data: user }); // menampilkan pesan dan data user yang sedang login
};

export const signout = async (req, res) => {
  req.session.destroy((err) => { // jika terjadi error saat menghapus session
    
    if (err) return res.status(500).json({ message: "Signout failed" }); // jika gagal menghapus session, maka tampilkan pesan "Signout failed"

    res.status(200).json({ message: "Signout success" }); // jika berhasil menghapus session, maka tampilkan pesan "Signout success"
    
  });
};
