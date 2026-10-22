/**
 * quiz-data.js
 * Bank soal kuis per bab — PembelajaranKode
 * Setiap bab memiliki minimal 10 soal berkualitas
 * Format: { q, opts[], ans (index), exp }
 */

const QUIZ_DATA = {
  bab1: [
    {
      q: "Apa yang dimaksud dengan algoritma?",
      opts: ["Bahasa pemrograman Python", "Urutan langkah yang jelas dan berhingga untuk menyelesaikan masalah", "Perangkat keras komputer", "Aplikasi mobile"],
      ans: 1,
      exp: "Algoritma adalah urutan langkah yang jelas dan berhingga untuk menyelesaikan suatu masalah."
    },
    {
      q: "Simbol apa yang digunakan untuk keputusan (percabangan) pada flowchart?",
      opts: ["Oval", "Persegi panjang", "Belah ketupat", "Jajar genjang"],
      ans: 2,
      exp: "Belah ketupat digunakan untuk simbol keputusan/kondisi dalam flowchart."
    },
    {
      q: "Dalam Python, keyword apa yang dipakai untuk mendefinisikan fungsi?",
      opts: ["function", "def", "func", "define"],
      ans: 1,
      exp: "Di Python, fungsi didefinisikan dengan keyword 'def', contoh: def hitung(x):"
    },
    {
      q: "Perulangan yang dipakai ketika jumlah ulangan sudah diketahui adalah?",
      opts: ["while", "if", "for", "do"],
      ans: 2,
      exp: "Perulangan 'for' dipakai saat jumlah iterasi sudah diketahui sebelumnya."
    },
    {
      q: "Manakah nama variabel yang paling baik menurut praktik baik pemrograman?",
      opts: ["x", "a1", "nilai_akhir", "tmp"],
      ans: 2,
      exp: "Nama variabel harus bermakna dan deskriptif. 'nilai_akhir' jauh lebih jelas dari 'x' atau 'tmp'."
    },
    {
      q: "Fungsi cek_kelulusan(70) dengan batas lulus 75 mengembalikan?",
      opts: ["Lulus", "Remedial", "Error", "None"],
      ans: 1,
      exp: "Karena 70 < 75, kondisi tidak terpenuhi, sehingga fungsi mengembalikan 'Remedial'."
    },
    {
      q: "Pseudocode ditulis dalam format?",
      opts: ["Kode Python resmi", "Diagram kotak dan panah", "Bahasa sehari-hari yang terstruktur", "Kode mesin biner"],
      ans: 2,
      exp: "Pseudocode ditulis mirip bahasa sehari-hari namun terstruktur — bukan kode pemrograman resmi."
    },
    {
      q: "Oval pada flowchart digunakan untuk menggambarkan?",
      opts: ["Proses perhitungan", "Input dan output", "Keputusan/kondisi", "Titik mulai atau selesai"],
      ans: 3,
      exp: "Simbol oval (elips) digunakan untuk menandai titik awal (Mulai) dan titik akhir (Selesai) pada flowchart."
    },
    {
      q: "Fungsi dalam pemrograman berguna untuk?",
      opts: ["Menyimpan database", "Memperindah tampilan", "Menyimpan blok kode yang dapat dipanggil ulang", "Menghubungkan ke internet"],
      ans: 2,
      exp: "Fungsi adalah blok kode yang diberi nama sehingga dapat digunakan ulang — mengurangi duplikasi kode."
    },
    {
      q: "Struktur percabangan 'if-else' digunakan untuk?",
      opts: ["Mengulang kode berkali-kali", "Memilih aksi berdasarkan kondisi tertentu bernilai benar atau salah", "Menghapus variabel dari memori", "Menghubungkan program ke internet"],
      ans: 1,
      exp: "Percabangan if-else mengevaluasi kondisi: jika benar (true) jalankan blok if, jika salah (false) jalankan blok else."
    }
  ],

  bab2: [
    {
      q: "Apa fungsi DNS dalam konteks web?",
      opts: ["Menyimpan file HTML di server", "Menerjemahkan nama domain menjadi alamat IP", "Mengenkripsi data pengiriman", "Menampilkan halaman web"],
      ans: 1,
      exp: "DNS (Domain Name System) menerjemahkan nama domain seperti google.com menjadi alamat IP numerik."
    },
    {
      q: "Perbedaan HTTP dan HTTPS adalah?",
      opts: ["HTTPS lebih lambat dari HTTP", "HTTPS menambahkan lapisan enkripsi", "HTTP lebih aman untuk data sensitif", "Keduanya persis sama"],
      ans: 1,
      exp: "HTTPS menambahkan enkripsi TLS/SSL sehingga data yang dikirim antara klien dan server lebih aman."
    },
    {
      q: "Yang dimaksud 'klien' dalam web adalah?",
      opts: ["Server database", "Peramban (browser) pengguna", "Kode JavaScript di server", "File CSS"],
      ans: 1,
      exp: "Klien adalah peramban (browser) di perangkat pengguna yang mengirim permintaan ke server."
    },
    {
      q: "Teknologi utama pada front-end adalah?",
      opts: ["Python, PHP, MySQL", "HTML, CSS, JavaScript", "Node.js, Django, Laravel", "Java, C++, Swift"],
      ans: 1,
      exp: "Front-end menggunakan HTML (struktur), CSS (tampilan), dan JavaScript (interaktivitas)."
    },
    {
      q: "Apa langkah pertama saat kamu mengetik URL di peramban?",
      opts: ["Server langsung mengirim HTML", "Peramban menanyakan alamat IP ke DNS", "JavaScript langsung dijalankan", "CSS diterapkan ke halaman"],
      ans: 1,
      exp: "Langkah pertama adalah resolusi DNS — peramban menanyakan alamat IP dari nama domain ke server DNS."
    },
    {
      q: "Back-end bertanggung jawab atas?",
      opts: ["Warna tombol di halaman", "Animasi CSS pada tampilan", "Logika bisnis, database, dan keamanan server", "Tampilan responsif mobile"],
      ans: 2,
      exp: "Back-end mengelola logika bisnis, penyimpanan data di database, autentikasi, dan keamanan server."
    },
    {
      q: "Dalam analogi restoran, 'dapur' dalam web adalah?",
      opts: ["Peramban pengguna", "Protokol HTTP", "Server yang menyimpan dan mengirim data", "File CSS"],
      ans: 2,
      exp: "Dalam analogi restoran: pelanggan = klien, pelayan = HTTP, dapur = server yang menyiapkan respons."
    },
    {
      q: "Apa fungsi dari protokol TCP/IP di internet?",
      opts: ["Menyimpan desain website", "Mengatur bagaimana data dipecah menjadi paket dan dikirim sampai ke tujuan", "Membuat animasi pada browser", "Menghapus virus di komputer"],
      ans: 1,
      exp: "TCP/IP adalah protokol komunikasi standar internet yang memastikan paket data terkirim dengan andal ke alamat tujuan."
    },
    {
      q: "Kode status HTTP 404 memiliki arti?",
      opts: ["Halaman Berhasil Dimuat (OK)", "Server Mengalami Gangguan Internal", "Halaman atau Dokumen Tidak Ditemukan", "Akses Ditolak / Forbidden"],
      ans: 2,
      exp: "HTTP 404 Not Found berarti server tidak menemukan file atau halaman web yang diminta klien."
    },
    {
      q: "Perangkat lunak yang berfungsi melayani permintaan klien di web disebut?",
      opts: ["Web Server (seperti Apache/Nginx)", "Web Browser (seperti Chrome)", "Teks Editor (seperti VS Code)", "Operating System Klien"],
      ans: 0,
      exp: "Web server (seperti Apache, Nginx) mendengarkan permintaan HTTP dari klien dan mengirimkan file web sebagai respons."
    }
  ],

  bab3: [
    {
      q: "Tag HTML apa yang digunakan untuk membuat tautan (hyperlink)?",
      opts: ["<link>", "<url>", "<a>", "<href>"],
      ans: 2,
      exp: "Tag <a> dengan atribut href digunakan untuk membuat tautan di HTML. Contoh: <a href='halaman.html'>Klik</a>"
    },
    {
      q: "Atribut 'alt' pada tag <img> berguna untuk?",
      opts: ["Mengubah ukuran gambar", "Teks alternatif untuk aksesibilitas dan saat gambar gagal muat", "Menentukan warna latar gambar", "Membuat gambar bergerak"],
      ans: 1,
      exp: "Atribut alt menyediakan teks deskriptif untuk screen reader dan tampil ketika gambar gagal dimuat."
    },
    {
      q: "Elemen HTML semantik untuk navigasi adalah?",
      opts: ["<div>", "<section>", "<nav>", "<span>"],
      ans: 2,
      exp: "<nav> adalah elemen semantik khusus untuk navigasi, lebih bermakna daripada <div class='nav'>."
    },
    {
      q: "Tag <h1> sampai <h6> digunakan untuk?",
      opts: ["Membuat tabel data", "Judul dan subjudul dengan hierarki kepentingan", "Membuat formulir input", "Menampilkan gambar"],
      ans: 1,
      exp: "<h1> sampai <h6> membuat judul dengan tingkat kepentingan dari tertinggi (h1) ke terendah (h6)."
    },
    {
      q: "DOCTYPE yang benar untuk HTML5 adalah?",
      opts: ["<!DOCTYPE HTML 5>", "<!DOCTYPE html>", "<html5>", "<!HTML>"],
      ans: 1,
      exp: "<!DOCTYPE html> (huruf kecil, tanpa nomor versi) adalah deklarasi DOCTYPE yang benar untuk HTML5."
    },
    {
      q: "Untuk membuat formulir tempat pengguna mengisi data teks, tag yang digunakan adalah?",
      opts: ["<textarea>", "<input type='text'>", "<form-text>", "<textbox>"],
      ans: 1,
      exp: "<input type='text'> adalah elemen dasar untuk menerima satu baris teks dari pengguna."
    },
    {
      q: "Tag semantik <article> paling cocok digunakan untuk?",
      opts: ["Bagian header halaman", "Konten mandiri yang bermakna seperti posting blog atau artikel berita", "Footer dengan copyright", "Sidebar menu"],
      ans: 1,
      exp: "<article> digunakan untuk membungkus konten mandiri yang dapat didistribusikan secara terpisah."
    },
    {
      q: "Elemen <meta charset='UTF-8'> dalam <head> berfungsi untuk?",
      opts: ["Mengatur warna latar", "Menentukan encoding karakter teks agar mendukung berbagai simbol/bahasa", "Menghubungkan file CSS", "Membuat halaman responsif"],
      ans: 1,
      exp: "UTF-8 memastikan semua karakter, huruf, angka, dan simbol dapat ditampilkan dengan benar tanpa 'karakter rusak'."
    },
    {
      q: "Tag HTML yang tepat untuk membuat daftar tidak berurutan (bullet points) adalah?",
      opts: ["<ol>", "<ul>", "<li>", "<list>"],
      ans: 1,
      exp: "<ul> (unordered list) digunakan untuk daftar dengan bullet, sedangkan <ol> untuk daftar bernomor."
    },
    {
      q: "Atribut apa yang wajib ada pada tag <form> untuk menentukan tujuan pengiriman data?",
      opts: ["target", "method", "action", "name"],
      ans: 2,
      exp: "Atribut 'action' menentukan URL tujuan ke mana formulir akan dikirimkan saat pengguna menekan submit."
    }
  ],

  bab4: [
    {
      q: "Cara menargetkan elemen dengan id='header' di CSS adalah?",
      opts: [".header", "#header", "header", "*header"],
      ans: 1,
      exp: "Selektor ID menggunakan tanda pagar (#), contoh: #header { background: blue; }"
    },
    {
      q: "Urutan Box Model dari dalam ke luar adalah?",
      opts: ["Border → Konten → Padding → Margin", "Konten → Padding → Border → Margin", "Margin → Border → Padding → Konten", "Padding → Konten → Margin → Border"],
      ans: 1,
      exp: "Box model dari dalam: Konten (isi) → Padding (ruang dalam) → Border (garis tepi) → Margin (ruang luar)."
    },
    {
      q: "Untuk membuat layout satu dimensi (baris atau kolom) secara fleksibel, gunakan?",
      opts: ["display: grid", "display: flex", "display: inline", "display: table"],
      ans: 1,
      exp: "Flexbox (display: flex) dirancang khusus untuk tata letak satu dimensi (baris ATAU kolom)."
    },
    {
      q: "CSS selektor '.tombol:hover' digunakan untuk?",
      opts: ["Mengubah gaya tombol saat diklik aktif", "Mengubah gaya tombol saat kursor mouse berada di atasnya", "Membuat tombol tidak bisa diklik", "Menghapus tombol dari halaman"],
      ans: 1,
      exp: "Pseudo-class :hover aktif ketika pengguna mengarahkan penunjuk mouse ke atas elemen tersebut."
    },
    {
      q: "Format warna #2563eb dalam CSS merupakan format?",
      opts: ["RGB desimal", "HSL", "Heksadesimal (Hex)", "Nama warna bawaan"],
      ans: 2,
      exp: "#2563eb adalah representasi warna heksadesimal dengan format #RRGGBB."
    },
    {
      q: "Properti CSS apa yang mengatur jarak di LUAR garis tepi elemen?",
      opts: ["padding", "margin", "border-spacing", "outline"],
      ans: 1,
      exp: "Margin adalah ruang kosong di luar border elemen yang memisahkan elemen tersebut dari tetangganya."
    },
    {
      q: "CSS singkatan dari?",
      opts: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style System", "Colorful Styling Syntax"],
      ans: 1,
      exp: "CSS adalah Cascading Style Sheets — bahasa untuk mengatur presentasi dan tampilan dokumen HTML."
    },
    {
      q: "Properti CSS apa yang digunakan untuk mengatur jenis huruf (font)?",
      opts: ["font-style", "font-family", "text-font", "typeface"],
      ans: 1,
      exp: "font-family menentukan nama jenis huruf yang akan digunakan pada elemen teks."
    },
    {
      q: "Dalam CSS Flexbox, properti apa yang mengatur perataan item secara horizontal (main axis)?",
      opts: ["align-items", "justify-content", "flex-direction", "align-content"],
      ans: 1,
      exp: "justify-content mengatur perataan elemen sepanjang sumbu utama (main axis) pada wadah Flexbox."
    },
    {
      q: "Apa fungsi dari media query (@media) dalam CSS?",
      opts: ["Memutar video dan audio", "Menerapkan aturan gaya berbeda sesuai ukuran layar atau perangkat", "Mengunduh font eksternal", "Menghubungkan file JavaScript"],
      ans: 1,
      exp: "Media query memungkinkan web beradaptasi (responsif) terhadap berbagai lebar layar seperti ponsel, tablet, dan desktop."
    }
  ],

  bab5: [
    {
      q: "Dalam JavaScript, apa perbedaan 'let' dan 'const'?",
      opts: ["let untuk angka, const untuk teks", "let nilainya bisa diubah, const nilainya tetap", "const lebih cepat dari let", "Keduanya tidak ada bedanya"],
      ans: 1,
      exp: "'let' untuk variabel yang bisa berubah nilainya. 'const' untuk konstanta yang nilainya tetap setelah dideklarasikan."
    },
    {
      q: "Apa fungsi addEventListener() dalam JavaScript?",
      opts: ["Menambahkan elemen HTML baru ke DOM", "Mendaftarkan fungsi yang berjalan saat event terjadi", "Mengambil data dari server secara asinkron", "Menyimpan data ke localStorage"],
      ans: 1,
      exp: "addEventListener() mendaftarkan callback yang dijalankan ketika event tertentu (misal 'click') terjadi pada elemen."
    },
    {
      q: "DOM dalam JavaScript adalah?",
      opts: ["Bahasa pemrograman baru berbasis Java", "Representasi halaman HTML sebagai objek yang bisa dimanipulasi", "Database yang ada di peramban", "Framework JavaScript populer"],
      ans: 1,
      exp: "DOM (Document Object Model) adalah representasi struktural halaman HTML sebagai pohon objek — bisa diakses dan diubah JS."
    },
    {
      q: "Mengapa textContent lebih aman dari innerHTML?",
      opts: ["textContent lebih cepat prosesnya", "innerHTML sudah tidak didukung browser modern", "textContent tidak mengeksekusi HTML/script dari input pengguna (mencegah XSS)", "textContent mendukung lebih banyak browser"],
      ans: 2,
      exp: "textContent menyisipkan teks biasa saja. innerHTML bisa mengeksekusi kode HTML/script dari input pengguna (serangan XSS)."
    },
    {
      q: "Apa kegunaan console.log() saat debugging?",
      opts: ["Mencetak halaman ke printer fisik", "Memeriksa nilai variabel di konsol peramban", "Menyimpan data ke server backend", "Membuat log error permanen di file"],
      ans: 1,
      exp: "console.log() mencetak nilai ke konsol peramban (buka dengan F12) — sangat berguna untuk debugging."
    },
    {
      q: "Operator === dalam JavaScript digunakan untuk?",
      opts: ["Pemberian nilai ke variabel", "Perbandingan sama-dengan yang ketat (nilai DAN tipe)", "Penjumlahan dua angka", "Deklarasi fungsi arrow"],
      ans: 1,
      exp: "=== adalah strict equality — memeriksa apakah nilai DAN tipe datanya sama. Berbeda dengan = yang untuk assignment."
    },
    {
      q: "Cara mengambil elemen HTML berdasarkan id-nya di JavaScript adalah?",
      opts: ["document.getElement('id')", "document.getElementById('id')", "document.query('#id')", "window.findById('id')"],
      ans: 1,
      exp: "document.getElementById('id') mengambil elemen HTML yang memiliki atribut id tertentu dari DOM."
    },
    {
      q: "localStorage tidak boleh digunakan untuk menyimpan?",
      opts: ["Preferensi tema (gelap/terang)", "Kata sandi atau data sensitif pengguna", "Progres belajar pengguna", "Pilihan bahasa antarmuka"],
      ans: 1,
      exp: "localStorage tidak terenkripsi dan mudah diakses. Jangan simpan password, token sensitif, atau data pribadi di sana."
    },
    {
      q: "Bagaimana cara menulis komentar satu baris di JavaScript?",
      opts: ["<!-- komentar -->", "// komentar", "/* komentar */", "# komentar"],
      ans: 1,
      exp: "// digunakan untuk komentar satu baris di JavaScript, sedangkan /* */ untuk multibarisp."
    },
    {
      q: "Tipe data primitif di JavaScript untuk nilai benar atau salah adalah?",
      opts: ["string", "number", "boolean", "null"],
      ans: 2,
      exp: "Tipe data boolean hanya memiliki dua nilai: true (benar) atau false (salah)."
    }
  ],

  bab6: [
    {
      q: "PWA (Progressive Web App) adalah?",
      opts: ["Bahasa pemrograman back-end baru", "Aplikasi web yang bisa dipasang dan bekerja sebagian offline", "Framework CSS seperti Bootstrap", "Jenis database untuk aplikasi web"],
      ans: 1,
      exp: "PWA adalah aplikasi web yang dapat dipasang di perangkat dan bekerja sebagian tanpa koneksi internet."
    },
    {
      q: "Tahap pertama dalam pengembangan aplikasi adalah?",
      opts: ["Implementasi (langsung coding)", "Pengujian (testing)", "Analisis kebutuhan", "Peluncuran ke publik"],
      ans: 2,
      exp: "Analisis kebutuhan adalah tahap pertama: memahami siapa penggunanya dan masalah apa yang perlu diselesaikan."
    },
    {
      q: "Prinsip UI/UX 'satu layar, satu tujuan utama' merujuk pada prinsip?",
      opts: ["Aksesibilitas (inklusif)", "Konsistensi antarmuka", "Kesederhanaan (simplicity)", "Umpan balik pengguna"],
      ans: 2,
      exp: "Kesederhanaan: setiap layar memiliki satu tujuan utama agar tidak membingungkan pengguna."
    },
    {
      q: "Proses pengembangan aplikasi bersifat?",
      opts: ["Linear — satu arah, tidak bisa kembali", "Iteratif — bisa kembali ke tahap sebelumnya berdasarkan feedback", "Acak tanpa urutan tertentu", "Selalu dimulai dari menulis kode"],
      ans: 1,
      exp: "Proses iteratif: umpan balik pengguna sering membawa tim kembali ke tahap perancangan untuk perbaikan."
    },
    {
      q: "Aplikasi yang dibuka lewat peramban tanpa instalasi disebut?",
      opts: ["Aplikasi desktop", "Aplikasi native", "Aplikasi web", "Aplikasi embedded"],
      ans: 2,
      exp: "Aplikasi web diakses melalui peramban tanpa perlu diunduh atau dipasang, seperti Gmail atau Google Docs."
    },
    {
      q: "Apa yang dimaksud prinsip 'umpan balik jelas' dalam UI/UX?",
      opts: ["Memberi diskon kepada pengguna", "Pengguna selalu tahu apakah aksinya berhasil atau gagal", "Tampilan halaman yang penuh warna", "Animasi yang banyak di setiap klik"],
      ans: 1,
      exp: "Umpan balik jelas: sistem memberi tahu pengguna hasil dari setiap aksi mereka — sukses, gagal, atau sedang diproses."
    },
    {
      q: "Service Worker pada Progressive Web App (PWA) berfungsi untuk?",
      opts: ["Menghubungkan database MySQL", "Menangani caching offline dan background sync di browser", "Mengedit kode HTML secara otomatis", "Membuat desain antarmuka 3D"],
      ans: 1,
      exp: "Service Worker adalah skrip latar belakang yang memungkinkan PWA menyimpan cache aset dan bekerja saat offline."
    },
    {
      q: "File manifest.json pada PWA berguna untuk?",
      opts: ["Menentukan ikon aplikasi, nama, dan tampilan saat dipasang di layar utama", "Menyimpan kata sandi pengguna", "Menulis logika back-end server", "Menyusun struktur tabel database"],
      ans: 0,
      exp: "Web App Manifest (manifest.json) memberikan informasi tentang nama aplikasi, warna tema, dan ikon saat diinstal di perangkat."
    },
    {
      q: "Salah satu keuntungan utama aplikasi web dibandingkan aplikasi native adalah?",
      opts: ["Tidak perlu diunduh dari App Store dan langsung bisa diakses lewat URL", "Paling cepat memproses grafis 3D berat", "Bisa mengakses hardware tanpa izin pengguna", "Tidak membutuhkan koneksi internet sama sekali"],
      ans: 0,
      exp: "Aplikasi web dapat diakses seketika melalui peramban cukup dengan membuka link/URL tanpa proses instalasi yang rumit."
    },
    {
      q: "Prinsip UX 'Error Prevention' berarti aplikasi harus?",
      opts: ["Menyembunyikan error dari pengguna", "Mencegah terjadinya kesalahan input sebelum pengguna melakukan kesalahan", "Memberikan denda saat pengguna salah input", "Menonaktifkan tombol submit secara permanen"],
      ans: 1,
      exp: "Error Prevention: sistem dirancang mencegah kekeliruan, misalnya validasi format email saat diketik sebelum dikirim."
    }
  ],

  bab7: [
    {
      q: "Mengapa kita wajib mencantumkan sumber saat menggunakan karya orang lain?",
      opts: ["Agar file lebih besar dan terlihat lengkap", "Karena merupakan kewajiban hukum dan etika terkait hak cipta", "Supaya website terlihat profesional", "Agar mendapat izin gratis secara otomatis"],
      ans: 1,
      exp: "Hak cipta melindungi karya orang lain. Menggunakan tanpa izin atau tanpa sumber adalah pelanggaran hukum dan etika."
    },
    {
      q: "Prinsip keamanan dasar dalam pemrograman web meliputi?",
      opts: ["Menyimpan password di JavaScript yang terlihat di browser", "Percaya semua input pengguna tanpa validasi", "Menggunakan HTTPS dan memvalidasi setiap input pengguna", "Menggunakan HTTP agar lebih cepat"],
      ans: 2,
      exp: "Keamanan dasar: gunakan HTTPS, validasi input pengguna (jangan percaya mentah-mentah), dan jangan simpan rahasia di kode front-end."
    },
    {
      q: "Apa yang dimaksud 'integritas akademik' dalam konteks belajar pemrograman?",
      opts: ["Menggunakan kode orang lain tanpa perubahan apapun", "Memahami, lalu menulis ulang kode yang dipelajari dengan kata sendiri", "Tidak pernah melihat atau belajar dari contoh kode", "Selalu menulis kode tanpa bantuan siapapun"],
      ans: 1,
      exp: "Integritas akademik: belajar dari contoh itu boleh, tapi pahami dan tulislah kembali sendiri — jangan sekadar salin-tempel."
    },
    {
      q: "Mengapa kita harus mempertimbangkan pengguna dengan jaringan lambat?",
      opts: ["Tidak perlu, mayoritas sudah pakai WiFi cepat", "Untuk mengurangi biaya operasional server", "Karena inklusivitas digital — semua orang berhak mengakses informasi", "Hanya wajib untuk aplikasi milik pemerintah"],
      ans: 2,
      exp: "Inklusivitas: aplikasi yang baik bisa diakses semua orang, termasuk mereka dengan perangkat lama atau koneksi terbatas."
    },
    {
      q: "Prinsip pengumpulan data pribadi yang benar adalah?",
      opts: ["Kumpulkan sebanyak mungkin untuk keperluan bisnis masa depan", "Hanya kumpulkan data yang benar-benar diperlukan", "Simpan tanpa enkripsi agar akses lebih mudah", "Bagikan ke pihak ketiga untuk monetisasi"],
      ans: 1,
      exp: "Prinsip minimisasi data: kumpulkan hanya yang diperlukan, jelaskan kegunaannya, dan lindungi data pengguna dengan baik."
    },
    {
      q: "Lisensi Open Source seperti MIT License memperbolehkan pengguna untuk?",
      opts: ["Menggunakan, memodifikasi, dan mendistribusikan kode dengan tetap menyertakan hak cipta asli", "Hanya melihat kode tanpa boleh menjalankannya", "Mengklaim sebagai pembuat asli perangkat lunak tersebut", "Mengunci kode agar orang lain tidak bisa melihatnya"],
      ans: 0,
      exp: "Lisensi MIT sangat fleksibel: siapa pun bebas menggunakan dan mengubah kode asalkan tetap menyertakan atribusi hak cipta pencipta aslinya."
    },
    {
      q: "Apa bahaya dari serangan XSS (Cross-Site Scripting)?",
      opts: ["Komputer mati seketika", "Penyerang dapat menyuntikkan skrip berbahaya yang mencuri data sesi/cookie pengguna lain", "Layar monitor berubah warna", "Koneksi internet menjadi lebih lambat"],
      ans: 1,
      exp: "XSS terjadi saat data input pengguna tidak disanitasi sehingga kode JavaScript jahat dapat tereksekusi di browser korban."
    },
    {
      q: "Tindakan 'Cyberbullying' dan ujaran kebencian di media sosial melanggar etika digital serta dapat dijerat dengan?",
      opts: ["UU Ketenagakerjaan", "UU ITE (Informasi dan Transaksi Elektronik)", "UU Perpajakan", "UU Perbankan"],
      ans: 1,
      exp: "Di Indonesia, pelanggaran etika digital seperti pencemaran nama baik dan ujaran kebencian diatur dalam UU ITE."
    },
    {
      q: "Mengapa penting menggunakan kata sandi yang kuat dan unik untuk setiap akun pengembang?",
      opts: ["Agar cepat dihafal oleh teman", "Mencegah peretasan melalui teknik brute-force dan credential stuffing", "Syarat wajib dari penyedia laptop", "Supaya koneksi internet menjadi lebih cepat"],
      ans: 1,
      exp: "Kata sandi yang kuat dan unik mempersulit penyerang menebak atau menggunakan kata sandi yang bocor dari layanan lain."
    },
    {
      q: "Konsep 'Digital Footprint' (Jejak Digital) mengingatkan programmer untuk?",
      opts: ["Hanya coding di malam hari", "Berhati-hati dalam mempublikasikan kode, komentar, dan aktivitas online karena terekam secara permanen", "Menghapus semua file setelah selesai belajar", "Menggunakan komputer berbeda setiap hari"],
      ans: 1,
      exp: "Jejak digital terekam permanen di internet. Programmer profesional selalu menjaga etika dan jejak rekam digital yang positif."
    }
  ],
};

// Ekspor semua soal sebagai flat array untuk kuis gabungan (total 70 soal)
const ALL_QUESTIONS = Object.values(QUIZ_DATA).flat();
