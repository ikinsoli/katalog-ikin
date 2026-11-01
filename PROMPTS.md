\## US-01 Katalog dari database



\*\*Prompt:\*\*

Baca AGENTS.md dan docs/user-stories.md bagian US-01. Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE\_URL dan SUPABASE\_SECRET\_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase. Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.



\*\*Hasil:\*\*

AI membuat lib/supabase/server.js (fungsi buatSupabaseServer, tanpa sesi) dan mengubah app/page.jsx menjadi Server Component async yang mengambil produk dari Supabase. Ada penanganan error dan kondisi tabel kosong. Diuji dengan mengubah nama produk id 1 di Table Editor, dan nama di katalog ikut berubah.



\*\*Perbaikan:\*\*

Tidak ada. Kode di-review: akses Supabase hanya dari server, tanpa NEXT\_PUBLIC\_, dan pesan error tidak membocorkan detail teknis.



\## US-02 Detail produk



\*\*Prompt:\*\*

Baca docs/user-stories.md bagian US-02. Ubah app/produk/\[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.



\*\*Hasil:\*\*

AI mengubah app/produk/\[id]/page.jsx menjadi Server Component async yang memakai await params (Next.js 16), mengambil produk dengan .eq("id", id).maybeSingle(), dan memanggil notFound() jika produk tidak ada. Diuji: detail produk tampil, perubahan deskripsi di Supabase ikut tampil, dan /produk/9999 menampilkan halaman tidak ditemukan.



\*\*Perbaikan:\*\*

Tidak ada.



\## US-03 Pesan via WhatsApp



\*\*Prompt:\*\*

Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)". Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.



\*\*Hasil:\*\*

AI mengubah TombolWhatsApp dari <button> menjadi <a> ke https://wa.me/<nomor>?text=<pesan>, memakai toko.nomorWhatsApp, formatRupiah, encodeURIComponent, target="\_blank" dan rel="noopener noreferrer". Diuji: WhatsApp terbuka ke nomor toko dengan pesan lengkap, termasuk karakter "\&" pada nama produk.



\*\*Perbaikan:\*\*

Tidak ada.



\## US-04 Login admin



\*\*Prompt:\*\*

Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04. Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE\_URL dan SUPABASE\_PUBLISHABLE\_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.



\*\*Hasil:\*\*

AI menambahkan buatSupabaseSesiAdmin (createServerClient + cookies, publishable key) di lib/supabase/server.js, membuat Server Action masukAdmin dan keluarAdmin di app/admin/actions.js, menyambungkan form login lewat useActionState, dan menyambungkan tombol Keluar lewat form action. Pesan error login dibuat umum supaya tidak membocorkan apakah email terdaftar. Diuji: password salah memunculkan error, login benar masuk ke /admin, dan Keluar kembali ke /admin/login.



\*\*Perbaikan:\*\*

Tidak ada.



\## US-05 Ganti password



\*\*Prompt:\*\*

Baca docs/user-stories.md bagian US-05. Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.



\*\*Hasil:\*\*

AI menambahkan Server Action gantiPasswordAdmin yang memeriksa login dengan supabase.auth.getUser() sebelum memproses, memvalidasi panjang minimal 8 karakter dan kecocokan konfirmasi di server, lalu memanggil updateUser. Form disambungkan lewat useActionState dengan pesan sukses/error. Diuji: konfirmasi berbeda ditolak, ganti password berhasil, password lama gagal dipakai login, dan password baru berhasil.



\*\*Perbaikan:\*\*

Tidak ada. Catatan: karena localhost dan Vercel memakai project Supabase yang sama, password cukup diganti sekali dan berlaku di kedua lingkungan.



