# Behind The Vibe Website

Website statis multi-halaman dengan tema Dark Cinematic Luxury (hitam, mocha, gold).

## Cara menjalankan
1. Ekstrak ZIP ini.
2. Buka `index.html` di browser atau unggah seluruh folder ke hosting statis.
3. Pertahankan struktur folder `assets`.

## Pengaturan sebelum website dipublikasikan
Buka `script.js`, lalu isi nilai di objek `SITE_CONFIG`:
- `instagram`: URL Instagram resmi.
- `tiktok`: URL TikTok resmi.
- `whatsappNumber`: nomor WhatsApp format internasional, angka saja (contoh Indonesia diawali 62).
- `bookingEndpoint`: endpoint Formspree/EmailJS/backend yang mengirim data booking ke email admin. Tanpa endpoint, formulir tidak akan mengaku berhasil terkirim.
- `googleFormEmbed`: URL embed Google Form untuk halaman Join Us.

## Pricelist PDF terpisah
Setiap layanan memiliki halaman PDF khusus:
- Event: `event-pricelist.html` → `assets/pricelists/event-content-creator.pdf`
- Wedding: `wedding-pricelist.html` → `assets/pricelists/wedding-content-creator.pdf`
- Personal: `personal-pricelist.html` → `assets/pricelists/personal-content-creator.pdf`

Letakkan masing-masing file PDF final di lokasi tersebut. PDF akan langsung terbuka di viewer pada halaman khusus. Tidak ada tombol download tambahan dari website. Jika file belum tersedia, halaman menampilkan pemberitahuan sementara.

## Isi booking
Jenis acara Wedding dan Event menampilkan Basic (Little Vows), Standard (Simple Day), dan Premium (Full Day). Jenis Personal hanya menampilkan Basic.

## Catatan
Website ini tidak menyertakan secret key. Jika memakai layanan email, simpan kredensial rahasia di backend/provider, bukan di file JavaScript publik.
