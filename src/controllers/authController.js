import Users from "../models/userModel.js";
import argon2 from "argon2";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" }); // jika email atau password kosong

    const user = await Users.findOne({ where: { email } });  // Mencari user berdasarkan email
    if (!user) return res.status(404).json({ message: "User not found" }); // Jika user tidak ditemukan

    const validPassword = await argon2.verify(user.password, password); // Verifikasi password menggunakan argon2
    if (!validPassword)  return res.status(400).json({ message: "Invalid password" }); // Jika password tidak valid
    
    req.session.userId = user.uuid; // Set session userId dengan uuid user
    const { uuid, name, role } = user; // Ambil data uuid, name, dan role dari user

    // Response berhasil login
    res.status(200).json({message: "Signin success", data: { uuid, name, email, role }});
    
  } catch (error) {
    // Tangani error
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user session
export const getSession = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(404).json({ message: "User not found" }) // Jika session tidak ditemukan

    const user = await Users.findOne({ // Mencari user berdasarkan uuid
      attributes: ["uuid", "name", "email", "role"], // Hanya ambil data uuid, name, email, dan role
      where: { uuid: req.session.userId }, // Filter berdasarkan uuid session
    });

    if (!user) return res.status(404).json({ message: "User not found" }); // Jika user tidak ditemukan
  
    res.status(200).json({ message: "Get session", data: user }); // Response berhasil
     
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signout = async (req, res) => {
  req.session.destroy((err) => { // jika terjadi error saat menghapus session
    
    if (err) return res.status(500).json({ message: "Signout failed" }); // jika gagal menghapus session, maka tampilkan pesan "Signout failed"

    res.status(200).json({ message: "Signout success" }); // jika berhasil menghapus session, maka tampilkan pesan "Signout success"
    
  });
};
