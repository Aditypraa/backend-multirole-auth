import Users from "../models/userModel.js";

export const verifyUser = async (req, res, next) => {
  // Jika tidak ada session dengan userId
  if (!req.session.userId)
    return res.status(401).json({ message: "Mohon Login Ke Akun Anda" }); // Maka kembalikan response error

  const user = await Users.findOne({ where: { uuid: req.session.userId } }); // Cari user berdasarkan session userId

  if (!user) {
    // Jika user tidak ditemukan
    return res.status(401).json({ message: "Akun Tidak Ditemukan" }); // Maka kembalikan response error
  }
  req.userId = user.id; // Set userId ke dalam request
  req.role = user.role; // Set user role ke dalam request
  next(); // Lanjut ke middleware selanjutnya
};

export const adminOnly = async (req, res, next) => {
  const user = await Users.findOne({ where: { uuid: req.session.userId } }); // Cari user berdasarkan session userId

  if (!user) {
    // Jika user tidak ditemukan
    return res.status(401).json({ message: "Akun Tidak Ditemukan" }); // Maka kembalikan response error
  }

  if (user.role !== "admin") {
    // Jika user rolenya bukan admin
    return res.status(401).json({ message: "Anda Tidak Memiliki Akses" }); // Maka kembalikan response error
  }

  next(); // Lanjut ke middleware selanjutnya
};
