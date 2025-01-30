# Zoom Meeting App

Aplikasi ini memungkinkan pengguna untuk membuat, melihat, dan menghapus Zoom Meeting menggunakan Zoom API. Data transaksi disimpan di database MySQL

## 📌 Fitur

- Buat Zoom Meeting
- Lihat daftar jadwal Zoom Meeting
- hapus Zoom Meeting
- Sinkronisasi data dengan database

## 🛠️ Persyaratan

Sebelum memulai, pastikan Anda sudah menginstal:

- **Node.js** (untuk backend jika menggunakan Express.js)
- **MySQL/PostgreSQL** (sebagai database)
- **Zoom Account** (untuk mendapatkan API credentials)

## 🚀 Cara Menjalankan Proyek

### 1️⃣ Buat Akun Zoom dan Dapatkan API Credentials

1. **Daftar akun di **[**Zoom Developer Portal**](https://marketplace.zoom.us/).
2. **Buat aplikasi dengan Server-to-Server OAuth**:
   - Masuk ke [Zoom App Marketplace](https://marketplace.zoom.us/).
   - Pilih **Develop** > **Build App**.
   - Pilih **Server-to-Server OAuth**.
   - Salin **Client ID**, **Client Secret**, dan **Account ID**.

### 2️⃣ Buat Database

Gunakan MySQL atau PostgreSQL untuk menyimpan data Zoom Meeting.

#### Jika menggunakan MySQL:

```sql
CREATE DATABASE zoom_meetings;

USE zoom_meetings;
```

#### Jika menggunakan PostgreSQL:

```sql
CREATE DATABASE zoom_meetings;

\c zoom_meetings;

CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    duration INT NOT NULL,
    join_url TEXT NOT NULL,
    meeting_id VARCHAR(100) NOT NULL
);
```

### 3️⃣ Buat File `.env`

Buat file `.env` di root direktori proyek dan salin isi dari `.env_example`, lalu sesuaikan dengan konfigurasi Anda.

```bash
ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret
ZOOM_ACCOUNT_ID=your_zoom_account_id
DATABASE_URL=mysql://user:password@localhost:3306/zoom_meetings  # Sesuaikan untuk PostgreSQL jika digunakan
PORT=3000
```

### 4️⃣ Jalankan Backend

Pastikan backend sudah dikonfigurasi dengan benar lalu jalankan:

```bash
# Jika menggunakan Node.js
npm install
npm run dev

### 🔥 API Endpoint

- **POST** `/api/zoom/create` → Buat Zoom Meeting
- **GET** `/api/zoom/list` → Lihat daftar Zoom Meeting
- **DELETE** `/api/zoom/delete/:id` → Hapus Zoom Meeting

---

