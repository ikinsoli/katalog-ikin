\## US-01 Katalog dari database



\*\*Prompt:\*\*

Baca AGENTS.md dan docs/user-stories.md bagian US-01. Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE\_URL dan SUPABASE\_SECRET\_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase. Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.



\*\*Hasil:\*\*

AI membuat lib/supabase/server.js (fungsi buatSupabaseServer, tanpa sesi) dan mengubah app/page.jsx menjadi Server Component async yang mengambil produk dari Supabase. Ada penanganan error dan kondisi tabel kosong. Diuji dengan mengubah nama produk id 1 di Table Editor, dan nama di katalog ikut berubah.



\*\*Perbaikan:\*\*

Tidak ada. Kode di-review: akses Supabase hanya dari server, tanpa NEXT\_PUBLIC\_, dan pesan error tidak membocorkan detail teknis.

