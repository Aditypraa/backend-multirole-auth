<h1 align="center"> Backend Multirole EXPRESS JS </h1>

<p align="center"><img src="https://socialify.git.ci/Aditypraa/backend-multirole-auth/image?description=1&amp;descriptionEditable=Express.Js%2C%20Mysql%2C%20Sequelize%2C%20and%20Argon2&amp;forks=1&amp;issues=1&amp;language=1&amp;name=1&amp;owner=1&amp;pulls=1&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>  

## Deskripsi

Proyek ini berfokus pada pengembangan backend yang aman dan handal untuk sistem otentikasi multi-peran. Dengan menggunakan teknologi seperti Express.js, MySQL, Sequelize, dan Argon2, proyek ini menyediakan fungsionalitas berikut:

- **Otentikasi (Authentication):** Email dan Password
- **Otorisasi (Authorization):** Admin dan User
- **CRUD (Create, Read, Update, Delete) operations**

## 📃 Dokumentasi Postman

Anda dapat menemukan dokumentasi API lengkap di: [https://documenter.getpostman.com/view/24667557/2sAXqy2yao](https://documenter.getpostman.com/view/24667557/2sAXqy2yao)

## 🖇️ Link Repository Frontend React.Js

Anda dapat melihat codingan Frontend disini: [https://github.com/Aditypraa/frontend-multirole-auth](https://github.com/Aditypraa/frontend-multirole-auth)

## Fitur Utama

- **Otentikasi yang Aman:** Menggunakan Argon2 untuk hashing password yang kuat.
- **Otorisasi Berbasis Peran:** Membatasi akses ke fitur berdasarkan peran pengguna (Admin atau User).
- **CRUD Lengkap:** Menyediakan endpoint untuk membuat, membaca, memperbarui, dan menghapus data.
- **Sesi yang Aman:** Menggunakan `express-session` dan `connect-session-sequelize` untuk mengelola sesi pengguna dengan aman.
- **Dokumentasi API yang Jelas:** Dokumentasi Postman yang mudah diikuti untuk memahami dan menggunakan API.

## Teknologi yang Digunakan

- **Backend:**
  - Node.js
  - Express.js
  - MySQL
  - Sequelize (ORM untuk berinteraksi dengan MySQL)
  - Argon2 (library untuk hashing password)
  - `cookie-parser` (untuk mengelola cookies)
  - `cors` (untuk mengaktifkan Cross-Origin Resource Sharing)
  - `dotenv` (untuk mengelola variabel lingkungan)
- **Frontend (opsional):**
  - React.js (atau framework frontend lainnya)

## Instalasi & Penggunaan

1. **Kloning repositori:**

   ```bash
   git clone [https://github.com/Aditypraa/backend-multirole-auth.git](https://github.com/Aditypraa/backend-multirole-auth.git)
   ```

2. **Masuk ke Direktori Folder:**

   ```bash
   cd backend-multirole-auth
   ```

3. **Install dependensi:**

   ```bash
   npm install
   ```

4. **Konfigurasi database:**

   ```bash
   - Buat database MySQL sesuai kebutuhan.
   - Sesuaikan konfigurasi database di file .env.
   ```

5. **Jalankan server:**
   ```bash
   npm run dev
   ```
