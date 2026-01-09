export interface ContentBlock {
  type: 'text' | 'code' | 'highlight' | 'list';
  content: string;
  language?: string;
  items?: string[];
}

export interface Topic {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  topics: Topic[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export const modules: Module[] = [
  {
    id: 'dart-foundation',
    title: 'Dart Foundation',
    icon: '🎯',
    description: 'Dasar-dasar bahasa pemrograman Dart',
    topics: [
      {
        id: 'intro-dart',
        title: 'Pengenalan Dart',
        content: [
          { type: 'text', content: 'Dart adalah bahasa pemrograman yang dikembangkan oleh Google. Dart memiliki beberapa karakteristik utama:' },
          { type: 'list', content: '', items: [
            'Client-optimized - Dioptimalkan untuk aplikasi klien',
            'Multi-platform - Bisa dijalankan di berbagai platform',
            'Type-safe - Aman terhadap kesalahan tipe data',
            'Null-safe - Aman terhadap nilai null'
          ]},
          { type: 'code', content: 'void main() {\n  print("Hello, Dart!");\n}', language: 'dart' }
        ]
      },
      {
        id: 'oop-dart',
        title: 'Object-Oriented Programming',
        content: [
          { type: 'highlight', content: 'Dalam Dart, SEMUANYA adalah Object!' },
          { type: 'text', content: 'OOP di Dart terdiri dari beberapa konsep utama:' },
          { type: 'list', content: '', items: [
            'Class - Blueprint atau cetakan untuk membuat object',
            'Object - Instance dari sebuah class',
            'Constructor - Method khusus untuk inisialisasi object',
            'Inheritance - Pewarisan sifat dari parent class'
          ]},
          { type: 'code', content: 'class Mahasiswa {\n  String nama;\n  int umur;\n  \n  Mahasiswa(this.nama, this.umur);\n  \n  void perkenalan() {\n    print("Halo, saya $nama");\n  }\n}', language: 'dart' }
        ]
      }
    ]
  },
  {
    id: 'async-programming',
    title: 'Asynchronous Programming',
    icon: '⚡',
    description: 'Pemrograman asinkron dengan Future dan async/await',
    topics: [
      {
        id: 'why-async',
        title: 'Mengapa Async?',
        content: [
          { type: 'text', content: 'Pemrograman asinkron diperlukan untuk mencegah UI freezing saat melakukan operasi yang memakan waktu.' },
          { type: 'highlight', content: 'Tanpa async, aplikasi akan "hang" saat mengambil data dari internet!' },
          { type: 'text', content: 'Contoh operasi yang membutuhkan async: fetching data, reading files, database queries.' }
        ]
      },
      {
        id: 'future-async-await',
        title: 'Future, Async & Await',
        content: [
          { type: 'text', content: 'Future merepresentasikan nilai yang akan tersedia di masa depan.' },
          { type: 'code', content: 'Future<String> fetchData() async {\n  await Future.delayed(Duration(seconds: 2));\n  return "Data berhasil diambil!";\n}\n\nvoid main() async {\n  print("Mengambil data...");\n  String result = await fetchData();\n  print(result);\n}', language: 'dart' },
          { type: 'highlight', content: 'Gunakan async/await untuk menghindari "Callback Hell"!' }
        ]
      }
    ]
  },
  {
    id: 'flutter-essentials',
    title: 'Flutter Essentials',
    icon: '💙',
    description: 'Dasar-dasar Flutter dan Widget',
    topics: [
      {
        id: 'everything-is-widget',
        title: 'Everything is a Widget',
        content: [
          { type: 'highlight', content: '"Everything is a Widget" - Filosofi utama Flutter!' },
          { type: 'text', content: 'Bayangkan widget seperti cangkir teh - setiap elemen UI adalah sebuah widget yang bisa dikombinasikan.' },
          { type: 'list', content: '', items: [
            'MaterialApp - Widget root untuk aplikasi Material Design',
            'Scaffold - Struktur dasar halaman',
            'AppBar - Bar navigasi di atas',
            'Text, Image, Icon - Widget untuk menampilkan konten',
            'ElevatedButton - Tombol dengan elevasi'
          ]}
        ]
      },
      {
        id: 'basic-widgets',
        title: 'Basic Widgets',
        content: [
          { type: 'code', content: 'class MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Scaffold(\n        appBar: AppBar(title: Text("My App")),\n        body: Center(\n          child: ElevatedButton(\n            onPressed: () {},\n            child: Text("Click Me"),\n          ),\n        ),\n      ),\n    );\n  }\n}', language: 'dart' }
        ]
      }
    ]
  },
  {
    id: 'layout-ui',
    title: 'Layout & UI',
    icon: '🎨',
    description: 'Mengatur tata letak dan UI di Flutter',
    topics: [
      {
        id: 'visible-invisible',
        title: 'Visible vs Invisible Widgets',
        content: [
          { type: 'text', content: 'Widget di Flutter terbagi menjadi dua kategori:' },
          { type: 'list', content: '', items: [
            'Visible Widget - Terlihat di layar (Container, Text, Image)',
            'Invisible Widget - Tidak terlihat, hanya mengatur layout (Column, Row, Stack)'
          ]},
          { type: 'code', content: 'Column(\n  children: [\n    Container(\n      color: Colors.blue,\n      child: Text("Box 1"),\n    ),\n    Container(\n      color: Colors.red,\n      child: Text("Box 2"),\n    ),\n  ],\n)', language: 'dart' }
        ]
      },
      {
        id: 'scrolling-widgets',
        title: 'Scrolling Widgets',
        content: [
          { type: 'text', content: 'Untuk konten yang panjang, gunakan scrolling widgets:' },
          { type: 'list', content: '', items: [
            'SingleChildScrollView - Untuk satu child yang panjang',
            'ListView - Untuk list item yang banyak',
            'GridView - Untuk layout grid'
          ]},
          { type: 'code', content: 'ListView.builder(\n  itemCount: 100,\n  itemBuilder: (context, index) {\n    return ListTile(\n      title: Text("Item $index"),\n    );\n  },\n)', language: 'dart' }
        ]
      }
    ]
  },
  {
    id: 'state-interaction',
    title: 'State & Interaction',
    icon: '🔄',
    description: 'Mengelola state dan interaksi pengguna',
    topics: [
      {
        id: 'stateless-stateful',
        title: 'Stateless vs Stateful',
        content: [
          { type: 'text', content: 'Flutter memiliki dua jenis widget berdasarkan state:' },
          { type: 'list', content: '', items: [
            'StatelessWidget - Widget statis, tidak berubah',
            'StatefulWidget - Widget dinamis, bisa berubah'
          ]},
          { type: 'highlight', content: 'Gunakan setState() untuk memperbarui UI saat state berubah!' },
          { type: 'code', content: 'class CounterApp extends StatefulWidget {\n  @override\n  _CounterAppState createState() => _CounterAppState();\n}\n\nclass _CounterAppState extends State<CounterApp> {\n  int _counter = 0;\n  \n  void _increment() {\n    setState(() {\n      _counter++;\n    });\n  }\n  \n  @override\n  Widget build(BuildContext context) {\n    return Text("Counter: $_counter");\n  }\n}', language: 'dart' }
        ]
      },
      {
        id: 'dialogs',
        title: 'Dialogs & User Input',
        content: [
          { type: 'text', content: 'Dialog digunakan untuk interaksi dengan pengguna:' },
          { type: 'code', content: 'void showMyDialog(BuildContext context) {\n  showDialog(\n    context: context,\n    builder: (context) => AlertDialog(\n      title: Text("Konfirmasi"),\n      content: Text("Apakah Anda yakin?"),\n      actions: [\n        TextButton(\n          onPressed: () => Navigator.pop(context),\n          child: Text("Batal"),\n        ),\n        ElevatedButton(\n          onPressed: () {\n            // Do something\n            Navigator.pop(context);\n          },\n          child: Text("Ya"),\n        ),\n      ],\n    ),\n  );\n}', language: 'dart' }
        ]
      }
    ]
  }
];

export const flashcards: Flashcard[] = [
  { id: '1', front: 'Apa itu Dart?', back: 'Bahasa pemrograman client-optimized yang dikembangkan oleh Google untuk membangun aplikasi multi-platform.', category: 'Dart' },
  { id: '2', front: 'Apa perbedaan StatelessWidget dan StatefulWidget?', back: 'StatelessWidget tidak berubah setelah dibuat, sedangkan StatefulWidget bisa berubah menggunakan setState().', category: 'Flutter' },
  { id: '3', front: 'Apa fungsi async/await?', back: 'Untuk menjalankan operasi asinkron tanpa memblokir UI, menghindari callback hell.', category: 'Async' },
  { id: '4', front: 'Apa itu Widget di Flutter?', back: 'Elemen dasar UI di Flutter. "Everything is a Widget" - semua yang tampil di layar adalah widget.', category: 'Flutter' },
  { id: '5', front: 'Apa fungsi Future di Dart?', back: 'Merepresentasikan nilai yang akan tersedia di masa depan (hasil operasi asinkron).', category: 'Async' },
  { id: '6', front: 'Apa perbedaan Column dan Row?', back: 'Column menyusun children secara vertikal, Row menyusun children secara horizontal.', category: 'Layout' },
  { id: '7', front: 'Apa fungsi setState()?', back: 'Memberi tahu Flutter bahwa state telah berubah dan UI perlu di-rebuild.', category: 'State' },
  { id: '8', front: 'Apa itu Constructor di Dart?', back: 'Method khusus yang dipanggil saat membuat instance baru dari sebuah class.', category: 'Dart' },
  { id: '9', front: 'Apa fungsi BuildContext?', back: 'Referensi ke lokasi widget dalam widget tree, digunakan untuk navigasi dan akses theme.', category: 'Flutter' },
  { id: '10', front: 'Apa perbedaan ListView dan GridView?', back: 'ListView menampilkan item dalam satu kolom/baris, GridView menampilkan dalam format grid.', category: 'Layout' },
  { id: '11', front: 'Apa itu Scaffold?', back: 'Widget yang menyediakan struktur dasar halaman Material Design (AppBar, body, FAB, drawer).', category: 'Flutter' },
  { id: '12', front: 'Apa fungsi Navigator.push()?', back: 'Untuk berpindah ke halaman baru dengan menambahkannya ke navigation stack.', category: 'Navigation' },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Bahasa pemrograman apa yang digunakan untuk membuat Flutter?',
    options: ['JavaScript', 'Dart', 'Kotlin', 'Swift'],
    correctIndex: 1,
    explanation: 'Flutter menggunakan Dart sebagai bahasa pemrogramannya. Dart dikembangkan oleh Google dan dioptimalkan untuk membangun aplikasi UI.',
    category: 'Dart'
  },
  {
    id: '2',
    question: 'Apa filosofi utama Flutter?',
    options: ['Everything is a Function', 'Everything is a Widget', 'Everything is a Component', 'Everything is a View'],
    correctIndex: 1,
    explanation: '"Everything is a Widget" adalah filosofi utama Flutter. Semua elemen UI, bahkan layout dan padding, adalah widget.',
    category: 'Flutter'
  },
  {
    id: '3',
    question: 'Keyword apa yang digunakan untuk menunggu hasil Future?',
    options: ['wait', 'await', 'async', 'then'],
    correctIndex: 1,
    explanation: 'Keyword "await" digunakan untuk menunggu hasil Future. Fungsi yang menggunakan await harus ditandai dengan "async".',
    category: 'Async'
  },
  {
    id: '4',
    question: 'Widget mana yang digunakan untuk menyusun children secara vertikal?',
    options: ['Row', 'Column', 'Stack', 'Wrap'],
    correctIndex: 1,
    explanation: 'Column menyusun children secara vertikal (atas ke bawah), sedangkan Row menyusun secara horizontal.',
    category: 'Layout'
  },
  {
    id: '5',
    question: 'Apa fungsi setState() di Flutter?',
    options: ['Membuat widget baru', 'Menghapus widget', 'Memperbarui UI saat state berubah', 'Mengatur style widget'],
    correctIndex: 2,
    explanation: 'setState() memberi tahu Flutter bahwa state telah berubah dan widget perlu di-rebuild untuk menampilkan perubahan.',
    category: 'State'
  },
  {
    id: '6',
    question: 'Widget apa yang menyediakan struktur dasar halaman?',
    options: ['Container', 'Scaffold', 'MaterialApp', 'Center'],
    correctIndex: 1,
    explanation: 'Scaffold menyediakan struktur dasar halaman Material Design termasuk AppBar, body, FloatingActionButton, dan Drawer.',
    category: 'Flutter'
  },
  {
    id: '7',
    question: 'Apa perbedaan utama Visible dan Invisible Widget?',
    options: ['Warna', 'Ukuran', 'Terlihat atau tidak di layar', 'Performance'],
    correctIndex: 2,
    explanation: 'Visible widget (Container, Text) terlihat di layar, sedangkan Invisible widget (Column, Row) hanya mengatur layout.',
    category: 'Layout'
  },
  {
    id: '8',
    question: 'Apa itu Constructor di OOP?',
    options: ['Method untuk menghapus object', 'Method untuk inisialisasi object', 'Method untuk cloning', 'Method untuk print'],
    correctIndex: 1,
    explanation: 'Constructor adalah method khusus yang dipanggil saat membuat instance baru dari class untuk inisialisasi.',
    category: 'Dart'
  },
  {
    id: '9',
    question: 'Widget apa yang digunakan untuk scrolling content panjang?',
    options: ['Column', 'Container', 'SingleChildScrollView', 'Center'],
    correctIndex: 2,
    explanation: 'SingleChildScrollView membuat child-nya bisa di-scroll jika konten lebih panjang dari layar.',
    category: 'Layout'
  },
  {
    id: '10',
    question: 'Kapan sebaiknya menggunakan StatefulWidget?',
    options: ['Saat UI statis', 'Saat UI perlu berubah', 'Selalu', 'Tidak pernah'],
    correctIndex: 1,
    explanation: 'StatefulWidget digunakan saat UI perlu berubah berdasarkan interaksi user atau data yang berubah.',
    category: 'State'
  },
  {
    id: '11',
    question: 'Apa yang terjadi jika tidak menggunakan async untuk operasi network?',
    options: ['Lebih cepat', 'UI akan freeze', 'Tidak ada efek', 'Error compile'],
    correctIndex: 1,
    explanation: 'Tanpa async, operasi network akan memblokir main thread sehingga UI akan freeze/hang.',
    category: 'Async'
  },
  {
    id: '12',
    question: 'Apa fungsi MaterialApp di Flutter?',
    options: ['Membuat button', 'Widget root aplikasi Material', 'Mengatur warna', 'Membuat list'],
    correctIndex: 1,
    explanation: 'MaterialApp adalah widget root yang menyediakan tema, navigasi, dan konfigurasi dasar aplikasi Material Design.',
    category: 'Flutter'
  },
  {
    id: '13',
    question: 'Keyword apa yang digunakan untuk inheritance di Dart?',
    options: ['implements', 'extends', 'inherit', 'super'],
    correctIndex: 1,
    explanation: 'Keyword "extends" digunakan untuk inheritance (pewarisan) di Dart. "implements" untuk interface.',
    category: 'Dart'
  },
  {
    id: '14',
    question: 'Apa fungsi showDialog()?',
    options: ['Menampilkan gambar', 'Menampilkan popup dialog', 'Membuat button', 'Navigasi'],
    correctIndex: 1,
    explanation: 'showDialog() digunakan untuk menampilkan popup dialog seperti AlertDialog untuk konfirmasi atau input.',
    category: 'Flutter'
  },
  {
    id: '15',
    question: 'Widget apa untuk menampilkan item dalam format grid?',
    options: ['ListView', 'Column', 'GridView', 'Row'],
    correctIndex: 2,
    explanation: 'GridView menampilkan item dalam format grid (baris dan kolom), cocok untuk gallery atau katalog produk.',
    category: 'Layout'
  },
  {
    id: '16',
    question: 'Apa itu null-safety di Dart?',
    options: ['Fitur keamanan network', 'Pencegahan null pointer exception', 'Enkripsi data', 'Proteksi memory'],
    correctIndex: 1,
    explanation: 'Null-safety adalah fitur Dart untuk mencegah null pointer exception dengan memastikan variabel tidak bisa null kecuali ditandai.',
    category: 'Dart'
  },
  {
    id: '17',
    question: 'Apa fungsi AppBar di Scaffold?',
    options: ['Footer halaman', 'Bar navigasi atas', 'Sidebar', 'Modal'],
    correctIndex: 1,
    explanation: 'AppBar adalah bar navigasi di bagian atas halaman, biasanya berisi title, action buttons, dan navigation.',
    category: 'Flutter'
  },
  {
    id: '18',
    question: 'Apa perbedaan hot reload dan hot restart?',
    options: ['Sama saja', 'Hot reload mempertahankan state, hot restart tidak', 'Hot restart lebih cepat', 'Tidak ada perbedaan'],
    correctIndex: 1,
    explanation: 'Hot reload mempertahankan state aplikasi dan hanya mengupdate perubahan, hot restart mereset semua state.',
    category: 'Flutter'
  },
  {
    id: '19',
    question: 'Widget apa yang menyusun children di atas satu sama lain (layer)?',
    options: ['Column', 'Row', 'Stack', 'ListView'],
    correctIndex: 2,
    explanation: 'Stack menyusun children dalam layer (Z-axis), memungkinkan widget saling menimpa seperti stacking cards.',
    category: 'Layout'
  },
  {
    id: '20',
    question: 'Apa fungsi BuildContext?',
    options: ['Untuk styling', 'Referensi lokasi widget di tree', 'Untuk animasi', 'Untuk networking'],
    correctIndex: 1,
    explanation: 'BuildContext adalah referensi ke lokasi widget dalam widget tree, digunakan untuk navigasi, theme, dan media query.',
    category: 'Flutter'
  },
  {
    id: '21',
    question: 'Apa itu Future di Dart?',
    options: ['Tipe data angka', 'Representasi nilai yang akan datang', 'Widget', 'Fungsi print'],
    correctIndex: 1,
    explanation: 'Future adalah objek yang merepresentasikan nilai yang akan tersedia di masa depan (hasil operasi asinkron).',
    category: 'Async'
  },
  {
    id: '22',
    question: 'Apa fungsi Navigator.pop()?',
    options: ['Menambah halaman', 'Kembali ke halaman sebelumnya', 'Refresh halaman', 'Menutup aplikasi'],
    correctIndex: 1,
    explanation: 'Navigator.pop() menghapus halaman teratas dari navigation stack, kembali ke halaman sebelumnya.',
    category: 'Navigation'
  },
  {
    id: '23',
    question: 'Widget apa untuk memberikan padding?',
    options: ['Margin', 'Padding', 'Spacing', 'Gap'],
    correctIndex: 1,
    explanation: 'Widget Padding memberikan ruang di dalam widget child. Berbeda dengan margin yang memberi ruang di luar.',
    category: 'Layout'
  },
  {
    id: '24',
    question: 'Apa itu Accessor dan Mutator?',
    options: ['Tipe data', 'Getter dan Setter', 'Widget', 'Fungsi async'],
    correctIndex: 1,
    explanation: 'Accessor (Getter) untuk mengambil nilai properti, Mutator (Setter) untuk mengubah nilai properti dalam OOP.',
    category: 'Dart'
  },
  {
    id: '25',
    question: 'Apa keuntungan menggunakan ListView.builder()?',
    options: ['Lebih cantik', 'Lazy loading - hemat memory', 'Lebih berwarna', 'Tidak ada keuntungan'],
    correctIndex: 1,
    explanation: 'ListView.builder() menggunakan lazy loading - hanya membuat widget yang terlihat di layar, hemat memory untuk list panjang.',
    category: 'Layout'
  }
];
