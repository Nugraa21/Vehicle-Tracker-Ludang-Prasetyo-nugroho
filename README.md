<!-- README.md (Bahasa Indonesia) -->

<h1 align="center">
  Vehicle Tracker Dashboard
</h1>

<p align="center">
  Dashboard modern dan responsif untuk memantau data kendaraan secara realtime menggunakan teknologi frontend terkini.
</p>

<p align="center">
  <strong>Proyek Frontend - Ujian Mandiri</strong><br/>
  <strong>Ludang Prasetyo Nugroho</strong> — NIM: 225510017<br/>
  <strong>UTDI — Teknologi Rekayasa Perangkat Lunak (S1)</strong>
</p>

---

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-%23212121?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/ShadCN UI-000000?style=for-the-badge" />
</div>

---
<h2>🚨 Link Demo</h2>

- 🌩️ Cloudflare Pages: [vehicle-tracker-ludang-prasetyo-nugroho.pages.dev](https://vehicle-tracker-ludang-prasetyo-nugroho.pages.dev/)
- ▲ Vercel: [nugra21-magang.vercel.app](https://nugra21-magang.vercel.app/)

---
<h2>🎯 Tujuan</h2>

Membangun aplikasi <strong>Vehicle Tracker</strong> yang:

- Menampilkan daftar kendaraan dengan status dan kecepatan terkini.
- Menyediakan detail seperti lokasi, odometer, fuel level, dan timestamp.
- Navigasi mulus antara halaman daftar dan detail kendaraan.

---

<h2>📦 Teknologi</h2>

| Teknologi        | Deskripsi                                |
|------------------|--------------------------------------------|
| <img src="https://img.icons8.com/officel/16/react.png"/> React        | Library frontend untuk UI            |
| <img src="https://img.icons8.com/color/16/typescript.png"/> TypeScript  | Bahasa JavaScript ber-typing statis |
| <img src="https://img.icons8.com/color/16/tailwind_css.png"/> TailwindCSS | Framework CSS responsif             |
| 🐻 Zustand      | Manajemen state global               |
| 🧹 ShadCN UI   | Komponen UI modern & elegan          |
| 🌐 Fetch/Axios | Pengambilan data dari API            |

---

<h2>🔌 API Endpoint</h2>

### <code>GET /vehicles</code>
Mengembalikan daftar kendaraan.

### <code>GET /vehicles/:id</code>
Mengembalikan data detail satu kendaraan.

#### Contoh Response:

```json
[
  {
    "id": 1,
    "name": "Toyota Avanza",
    "status": "ACTIVE",
    "speed": 60,
    "updated_at": "2025-07-23T10:00:00Z"
  }
]
```

```json
{
  "vehicleId": 1,
  "odometer": 123456.78,
  "fuel_level": 70.2,
  "timestamp": "2025-07-23T10:00:00Z",
  "latitude": -6.12,
  "longitude": 106.85,
  "speed": 60
}
```

---

<h2>📅 Fitur Utama</h2>

### Halaman Daftar Kendaraan
- ✅ Nama kendaraan
- ✅ Status saat ini
- ✅ Kecepatan dan waktu pembaruan
- ✅ Tombol "Detail" ke halaman spesifik

### Halaman Detail Kendaraan
- ✅ Fuel level
- ✅ Odometer
- ✅ Koordinat lokasi
- ✅ Kecepatan dan timestamp

---

<h2>💡 UX & UI</h2>

- ⚡ Zustand untuk manajemen state
- 📱 UI responsif dengan TailwindCSS
- ⏳ Loader saat pengambilan data
- ❌ Penanganan error secara elegan
- 🧠 Komponen reusable
- 🎨 Tampilan modern dengan ShadCN UI

---

<h2>✅ Kriteria Penilaian</h2>

| Kriteria                            | Status       |
|-------------------------------------|--------------|
| Penggunaan Zustand                  | ✅ Sudah   |
| Layout responsif TailwindCSS        | ✅ Sudah   |
| Navigasi dinamis React Router       | ✅ Sudah   |
| Loader dan penanganan error         | ✅ Sudah   |
| Struktur komponen bersih & modular  | ✅ Sudah   |

---

<h2>🚀 Cara Menjalankan</h2>

### Jalankan di Lokal

```bash
# Clone repo
git clone https://github.com/your-username/vehicle-tracker-dashboard

# Masuk folder
cd vehicle-tracker-dashboard

# Install dependencies
npm install

# Jalankan lokal
npm run dev
```

---

<h2>🚨 Link Demo</h2>

- 🌩️ Cloudflare Pages: [vehicle-tracker-ludang-prasetyo-nugroho.pages.dev](https://vehicle-tracker-ludang-prasetyo-nugroho.pages.dev/)
- ▲ Vercel: [nugra21-magang.vercel.app](https://nugra21-magang.vercel.app/)

---

<h2>🗓️ Tenggat Pengumpulan</h2>

🕒 Submit dalam waktu <strong>maksimal 48 jam</strong> setelah menerima tugas.  
🚀 Upload ke GitHub dan deploy ke platform seperti Vercel atau Cloudflare.

---

<h2>📲 Kontak</h2>

- 👨‍💻 <strong>Ludang Prasetyo Nugroho</strong>
- 🔗 Website: [https://nugra.my.id](https://nugra.my.id)
- 📧 Email: [nugra315@gmail.com]

---

<blockquote>
  <em>"Membangun dashboard berkualitas profesional dengan teknologi modern dan struktur kode yang rapi."</em>
</blockquote>