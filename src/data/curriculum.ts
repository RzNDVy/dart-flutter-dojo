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
  wrongExplanations?: string[]; // Penjelasan mengapa pilihan lain salah
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
            'Multi-platform - Bisa dijalankan di berbagai platform (Android, iOS, Windows, Linux, Web)',
            'Type-safe - Aman terhadap kesalahan tipe data',
            'Null-safe - Aman terhadap nilai null (mencegah null error)'
          ]},
          { type: 'highlight', content: 'Dart BUKAN perkembangan dari Java atau Python! Dart adalah bahasa independen yang dikembangkan Google.' },
          { type: 'code', content: 'void main() {\n  print("Hello, Dart!");\n}', language: 'dart' }
        ]
      },
      {
        id: 'dart-main-method',
        title: 'Main Method di Dart',
        content: [
          { type: 'text', content: 'Setiap program Dart dimulai dari fungsi main(). Format main method yang benar:' },
          { type: 'code', content: '// Main method tanpa parameter\nvoid main() {\n  print("Hello!");\n}\n\n// Main method dengan parameter\nvoid main(List<String> args) {\n  print("Arguments: $args");\n}', language: 'dart' },
          { type: 'highlight', content: 'Parameter main method adalah List<String> args, BUKAN String[] args seperti di Java!' },
          { type: 'list', content: '', items: [
            'void main() - Tanpa parameter',
            'void main(List<String> args) - Dengan parameter command line',
            'Tidak ada String[] di Dart - gunakan List<String>'
          ]}
        ]
      },
      {
        id: 'dart-variables',
        title: 'Variabel di Dart',
        content: [
          { type: 'text', content: 'Dart adalah bahasa strongly-typed, artinya setiap variabel harus memiliki tipe data.' },
          { type: 'code', content: '// Deklarasi dengan tipe eksplisit\nString nama = "Budi";\nint umur = 20;\ndouble nilai = 85.5;\nbool lulus = true;\n\n// Deklarasi dengan var (tipe otomatis)\nvar x = 10;        // int\nvar y = 2.5;       // double\nvar z = "hello";   // String\n\n// var tanpa inisialisasi - VALID tapi akan dynamic\nvar a;  // a bertipe dynamic', language: 'dart' },
          { type: 'highlight', content: 'Variabel dalam Dart harus didefinisikan dengan tipe atau menggunakan var/final/const!' },
          { type: 'list', content: '', items: [
            'num - Bisa berisi int ATAU double (bilangan bulat maupun desimal)',
            'int - Hanya bilangan bulat',
            'double - Bilangan desimal',
            'dynamic - Bisa berisi tipe apapun'
          ]}
        ]
      },
      {
        id: 'dart-string-interpolation',
        title: 'String Interpolation',
        content: [
          { type: 'text', content: 'Dart menggunakan $ untuk string interpolation, BUKAN + untuk concatenation dengan variabel.' },
          { type: 'code', content: 'int x = 10;\nint hasil = 25;\n\n// BENAR - String interpolation\nprint("hasil: $hasil");           // Output: hasil: 25\nprint("x + 5 = ${x + 5}");        // Output: x + 5 = 15\n\n// BENAR - Concatenation dengan +\nprint("hasil: " + hasil.toString());\n\n// SALAH - Tidak ada $x di luar string\n// print($x + 5);  // ERROR!\n// print($x + $hasil);  // ERROR!', language: 'dart' },
          { type: 'highlight', content: 'Gunakan $variabel di dalam string, gunakan ${ekspresi} untuk operasi kompleks!' }
        ]
      },
      {
        id: 'dart-collections',
        title: 'Collections & Library',
        content: [
          { type: 'text', content: 'Dart memiliki beberapa library built-in untuk berbagai kebutuhan:' },
          { type: 'list', content: '', items: [
            'dart:core - Tipe dasar, collections (sudah ter-import otomatis)',
            'dart:collection - Queue, LinkedList, HashMap, dan struktur data lanjutan',
            'dart:io - Input/Output untuk file dan network',
            'dart:math - Fungsi matematika',
            'dart:html - Untuk interaksi web (browser)',
            'dart:async - Future, Stream untuk async programming'
          ]},
          { type: 'code', content: 'import "dart:collection";\n\n// Queue dari dart:collection\nQueue<int> antrian = Queue();\nantrian.add(1);\nantrian.add(2);\nprint(antrian.removeFirst()); // 1\n\n// List (array) dari dart:core\nList<int> angka = [1, 2, 3, 4, 5];\nprint(angka.length);  // 5 - properti, bukan method!', language: 'dart' },
          { type: 'highlight', content: 'Library dart:collection menangani struktur data seperti Queue, bukan untuk interaksi web atau operator matematika!' }
        ]
      },
      {
        id: 'dart-array-length',
        title: 'Array/List Length',
        content: [
          { type: 'text', content: 'Untuk mendapatkan jumlah elemen dalam List/Array di Dart:' },
          { type: 'code', content: 'List<int> x = [1, 2, 3, 4, 5];\n\n// BENAR\nprint(x.length);  // 5 - ini PROPERTI, bukan method!\n\n// SALAH\n// x.length()   - length bukan method!\n// x.count      - tidak ada properti count\n// x.count()    - tidak ada method count\n// count(x)     - tidak ada fungsi count', language: 'dart' },
          { type: 'highlight', content: 'Gunakan .length (tanpa kurung!) untuk mendapatkan jumlah elemen List!' }
        ]
      },
      {
        id: 'dart-loops',
        title: 'Perulangan di Dart',
        content: [
          { type: 'text', content: 'Dart memiliki beberapa jenis perulangan:' },
          { type: 'code', content: 'List<String> buah = ["apel", "jeruk", "mangga"];\n\n// for klasik\nfor (int i = 0; i < buah.length; i++) {\n  print(buah[i]);\n}\n\n// for-in (seperti foreach)\nfor (String b in buah) {\n  print(b);\n}\n\n// forEach method\nbuah.forEach((b) => print(b));\n\n// while\nint i = 0;\nwhile (i < 3) {\n  print(buah[i]);\n  i++;\n}\n\n// do-while\nint j = 0;\ndo {\n  print(buah[j]);\n  j++;\n} while (j < 3);', language: 'dart' },
          { type: 'highlight', content: 'for-in di Dart mirip dengan foreach di bahasa lain - khusus untuk iterasi collection!' }
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
            'Inheritance - Pewarisan sifat dari parent class ke child class'
          ]},
          { type: 'code', content: 'class Mahasiswa {\n  String nama;\n  int umur;\n  \n  Mahasiswa(this.nama, this.umur);\n  \n  void perkenalan() {\n    print("Halo, saya $nama");\n  }\n}', language: 'dart' }
        ]
      },
      {
        id: 'dart-underscore',
        title: 'Private dengan Underscore',
        content: [
          { type: 'text', content: 'Di Dart, underscore (_) di awal nama membuat member menjadi private (tidak bisa diakses dari luar library/file).' },
          { type: 'code', content: 'class BankAccount {\n  String _nomorRekening;  // Private - tidak bisa diakses dari luar\n  double _saldo;          // Private\n  String namaPemilik;     // Public - bisa diakses dari mana saja\n  \n  BankAccount(this._nomorRekening, this._saldo, this.namaPemilik);\n  \n  // Getter untuk mengakses private property\n  double get saldo => _saldo;\n  \n  void _validasiInternal() {  // Private method\n    // ...\n  }\n  \n  void setor(double jumlah) {  // Public method\n    _saldo += jumlah;\n  }\n}', language: 'dart' },
          { type: 'highlight', content: 'Underscore (_) membuat atribut/method tidak dapat diakses dari luar file/library!' },
          { type: 'list', content: '', items: [
            '_namaAtribut - Private, tidak bisa diakses di luar class/library',
            'namaAtribut - Public, bisa diakses dari mana saja',
            'Underscore BUKAN penamaan wajib, tapi konvensi untuk private'
          ]}
        ]
      },
      {
        id: 'dart-inheritance',
        title: 'Inheritance & Super',
        content: [
          { type: 'text', content: 'Inheritance (pewarisan) adalah pemberian akses method dan atribut dari parent class ke child class.' },
          { type: 'code', content: 'class Hewan {\n  String nama;\n  \n  Hewan(this.nama);\n  \n  void bersuara() {\n    print("Suara hewan");\n  }\n}\n\nclass Kucing extends Hewan {\n  Kucing(String nama) : super(nama);  // Memanggil constructor parent\n  \n  @override\n  void bersuara() {\n    super.bersuara();  // Memanggil method parent\n    print("Meow!");\n  }\n}', language: 'dart' },
          { type: 'highlight', content: 'Keyword super digunakan untuk merujuk ke parent class - akan selalu diikuti dengan pewarisan!' },
          { type: 'list', content: '', items: [
            'extends - Untuk inheritance dari parent class',
            'super - Merujuk ke parent class (constructor atau method)',
            '@override - Menandai method yang di-override dari parent'
          ]}
        ]
      },
      {
        id: 'dart-platforms',
        title: 'Platform yang Didukung Dart',
        content: [
          { type: 'text', content: 'Dart dapat berjalan di berbagai platform:' },
          { type: 'list', content: '', items: [
            'Android ✓ - Via Flutter',
            'iOS ✓ - Via Flutter',
            'Windows ✓ - Native dan via Flutter',
            'Linux ✓ - Native dan via Flutter',
            'macOS ✓ - Native dan via Flutter',
            'Web ✓ - Compile ke JavaScript atau WebAssembly',
            'Windows Phone ✗ - TIDAK didukung (sudah discontinued)'
          ]},
          { type: 'highlight', content: 'Dart TIDAK bisa berjalan di Windows Phone karena platform tersebut sudah tidak dikembangkan!' },
          { type: 'text', content: 'Untuk web, Dart dapat di-compile ke:' },
          { type: 'list', content: '', items: [
            'JavaScript - Untuk browser compatibility',
            'WebAssembly (Wasm) - Untuk performa lebih baik'
          ]}
        ]
      },
      {
        id: 'dart-compilation',
        title: 'Dart Compilation',
        content: [
          { type: 'text', content: 'Dart mendukung dua mode kompilasi:' },
          { type: 'list', content: '', items: [
            'JIT (Just-In-Time) - Compile saat runtime, mendukung hot reload untuk development',
            'AOT (Ahead-Of-Time) - Compile sebelum runtime, untuk production (lebih cepat startup)'
          ]},
          { type: 'highlight', content: 'JIT memungkinkan hot reload - compile langsung saat file disimpan!' },
          { type: 'code', content: '// Saat development (JIT)\n// - Hot reload tersedia\n// - Compile cepat\n// - Startup lebih lambat\n\n// Saat production (AOT)\n// - Sudah ter-compile\n// - Startup cepat\n// - Performa optimal', language: 'dart' }
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
        id: 'what-is-flutter',
        title: 'Apa itu Flutter?',
        content: [
          { type: 'text', content: 'Flutter adalah framework Dart untuk membuat aplikasi mobile (dan juga web, desktop).' },
          { type: 'highlight', content: 'Flutter adalah FRAMEWORK yang menggunakan bahasa DART, bukan Java atau JavaScript!' },
          { type: 'list', content: '', items: [
            'Flutter BUKAN bahasa pemrograman - itu adalah framework',
            'Flutter menggunakan Dart sebagai bahasa pemrogramannya',
            'Flutter BUKAN framework Java atau JavaScript',
            'Flutter bisa membuat aplikasi Android, iOS, Web, Desktop'
          ]}
        ]
      },
      {
        id: 'everything-is-widget',
        title: 'Everything is a Widget',
        content: [
          { type: 'highlight', content: '"Everything is a Widget" - Filosofi utama Flutter!' },
          { type: 'text', content: 'Dalam Flutter, basis menyusun tampilan adalah menyusun widget. Setiap elemen UI adalah widget yang bisa dikombinasikan.' },
          { type: 'list', content: '', items: [
            'MaterialApp - Widget root untuk aplikasi Material Design',
            'Scaffold - Struktur dasar halaman berbasis Material Design',
            'AppBar - Bar navigasi di atas (parameter di Scaffold)',
            'Text, Image, Icon - Widget untuk menampilkan konten',
            'ElevatedButton - Tombol dengan elevasi (bisa diberi text, BUKAN untuk gambar)'
          ]},
          { type: 'text', content: 'Widget yang digunakan untuk menyusun tampilan Flutter bukan "OEM Widget". OEM Widget tidak ada di Flutter.' }
        ]
      },
      {
        id: 'scaffold-structure',
        title: 'Scaffold & AppBar',
        content: [
          { type: 'text', content: 'Scaffold adalah widget yang menjadi struktur dasar berbasis desain material.' },
          { type: 'code', content: 'Scaffold(\n  appBar: AppBar(  // AppBar adalah PARAMETER di Scaffold\n    title: Text("Judul"),\n  ),\n  body: Center(\n    child: Text("Konten"),\n  ),\n  floatingActionButton: FloatingActionButton(\n    onPressed: () {},\n    child: Icon(Icons.add),\n  ),\n)', language: 'dart' },
          { type: 'highlight', content: 'AppBar menjadi PARAMETER pada class Scaffold, bukan Container atau Column!' },
          { type: 'list', content: '', items: [
            'Scaffold - Struktur dasar halaman',
            'AppBar - Parameter appBar di Scaffold',
            'body - Konten utama halaman',
            'floatingActionButton - Tombol mengambang',
            'drawer - Menu samping'
          ]}
        ]
      },
      {
        id: 'platform-channel',
        title: 'Platform Channel',
        content: [
          { type: 'text', content: 'Flutter menggunakan Platform Channel untuk berkomunikasi dengan native code dan sensor.' },
          { type: 'highlight', content: 'Platform Channel adalah interface yang digunakan Flutter untuk berkomunikasi dengan sensor dan native code!' },
          { type: 'code', content: '// Contoh Platform Channel\nstatic const platform = MethodChannel("com.example/battery");\n\nFuture<void> getBatteryLevel() async {\n  try {\n    final int result = await platform.invokeMethod("getBatteryLevel");\n    print("Battery level: $result%");\n  } catch (e) {\n    print("Failed to get battery level");\n  }\n}', language: 'dart' },
          { type: 'list', content: '', items: [
            'Platform Channel - Interface untuk komunikasi dengan native code',
            'MethodChannel - Untuk memanggil method native',
            'EventChannel - Untuk stream data dari native',
            'Bukan Canvas, Events, atau Location - itu bukan interface untuk sensor'
          ]}
        ]
      },
      {
        id: 'basic-widgets',
        title: 'Basic Widgets',
        content: [
          { type: 'code', content: 'class MyApp extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Scaffold(\n        appBar: AppBar(title: Text("My App")),\n        body: Center(\n          child: ElevatedButton(\n            onPressed: () {},\n            child: Text("Click Me"),  // ElevatedButton untuk text, bukan gambar\n          ),\n        ),\n      ),\n    );\n  }\n}', language: 'dart' },
          { type: 'text', content: 'ElevatedButton digunakan sebagai tombol untuk melakukan event tertentu. Untuk tombol dengan gambar, gunakan IconButton atau ElevatedButton.icon().' }
        ]
      },
      {
        id: 'child-children',
        title: 'child vs children',
        content: [
          { type: 'text', content: 'Beberapa widget menggunakan child (satu widget) dan beberapa menggunakan children (banyak widget).' },
          { type: 'code', content: '// child - untuk SATU widget\nContainer(\n  child: Text("Satu widget"),\n)\n\n// children - untuk BANYAK widget\nColumn(\n  children: [\n    Text("Widget 1"),\n    Text("Widget 2"),\n    Text("Widget 3"),\n  ],\n)\n\nRow(\n  children: [\n    Icon(Icons.star),\n    Icon(Icons.star),\n  ],\n)', language: 'dart' },
          { type: 'highlight', content: 'children adalah key/parameter yang dapat digunakan untuk beberapa widget (Column, Row, Stack, dll)!' },
          { type: 'list', content: '', items: [
            'child - Untuk widget yang hanya punya satu child (Container, Center, Padding)',
            'children - Untuk widget dengan banyak child (Column, Row, Stack, ListView)',
            'Bukan "List" atau "Collection" - itu tipe data, bukan key widget'
          ]}
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
            'StatelessWidget - Widget statis, tidak berubah, tidak bisa menyimpan nilai untuk ditampilkan',
            'StatefulWidget - Widget dinamis, bisa berubah dengan setState()'
          ]},
          { type: 'highlight', content: 'Stateless TIDAK DAPAT menyimpan nilai untuk kepentingan ditampilkan (seperti input user)!' },
          { type: 'code', content: 'class CounterApp extends StatefulWidget {\n  @override\n  _CounterAppState createState() => _CounterAppState();\n}\n\nclass _CounterAppState extends State<CounterApp> {\n  int _counter = 0;\n  \n  void _increment() {\n    setState(() {\n      _counter++;\n    });\n  }\n  \n  @override\n  Widget build(BuildContext context) {\n    return Text("Counter: $_counter");\n  }\n}', language: 'dart' },
          { type: 'text', content: 'Yang benar mengenai Stateless: Column dapat digunakan, dan dapat membuat tampilan dengan widget. TextField TIDAK bisa digunakan di Stateless karena butuh state untuk menyimpan input.' }
        ]
      },
      {
        id: 'column-row-detail',
        title: 'Column & Row Detail',
        content: [
          { type: 'text', content: 'Column dan Row adalah widget layout yang sering digunakan:' },
          { type: 'list', content: '', items: [
            'Column - Menyusun widget dari ATAS ke BAWAH (vertikal)',
            'Row - Menyusun widget dari KIRI ke KANAN (horizontal)',
            'Column TIDAK memiliki scroll built-in',
            'Column TIDAK bisa menampilkan widget melebihi layar (overflow error)',
            'Column TIDAK untuk input nilai - itu fungsi TextField'
          ]},
          { type: 'highlight', content: 'Column menyusun widget vertikal, Row horizontal. Keduanya TIDAK punya scroll dan akan overflow jika melebihi layar!' },
          { type: 'code', content: '// Column - vertikal (atas ke bawah)\nColumn(\n  children: [\n    Text("Atas"),\n    Text("Tengah"),\n    Text("Bawah"),\n  ],\n)\n\n// Row - horizontal (kiri ke kanan)\nRow(\n  children: [\n    Text("Kiri"),\n    Text("Tengah"),\n    Text("Kanan"),\n  ],\n)\n\n// Jika butuh scroll, bungkus dengan SingleChildScrollView\nSingleChildScrollView(\n  child: Column(...),\n)', language: 'dart' }
        ]
      },
      {
        id: 'dialogs',
        title: 'Dialogs & Alert',
        content: [
          { type: 'text', content: 'Flutter memiliki beberapa widget untuk dialog:' },
          { type: 'list', content: '', items: [
            'AlertDialog - Dialog dengan title, content, dan actions (sudah terstruktur)',
            'Dialog - Dialog dasar yang bisa disusun secara dinamis dan bebas',
            'SimpleDialog - Dialog sederhana untuk pilihan',
            'Tidak ada widget bernama "Alert" atau "FillDialog" di Flutter!'
          ]},
          { type: 'highlight', content: 'Dialog adalah widget untuk alert yang dapat disusun secara DINAMIS dan BEBAS!' },
          { type: 'code', content: '// AlertDialog - sudah terstruktur\nshowDialog(\n  context: context,\n  builder: (context) => AlertDialog(\n    title: Text("Konfirmasi"),\n    content: Text("Apakah Anda yakin?"),\n    actions: [TextButton(...), ElevatedButton(...)],\n  ),\n);\n\n// Dialog - bebas disusun\nshowDialog(\n  context: context,\n  builder: (context) => Dialog(\n    child: Container(\n      // Bebas menyusun apapun di sini\n      child: Column(...),\n    ),\n  ),\n);', language: 'dart' }
        ]
      },
      {
        id: 'custom-widgets',
        title: 'Membuat Widget Sendiri',
        content: [
          { type: 'text', content: 'Untuk membuat widget sendiri di Flutter, kita HARUS melakukan pewarisan (extends) dari widget yang sudah ada.' },
          { type: 'highlight', content: 'Kita TIDAK DAPAT membuat widget sendiri tanpa melakukan pewarisan dari widget yang sudah ada!' },
          { type: 'code', content: '// HARUS extends StatelessWidget atau StatefulWidget\nclass MyCustomWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Container(\n      child: Text("Custom Widget"),\n    );\n  }\n}\n\n// TIDAK BISA tanpa extends\n// class MyWidget {  // ERROR - bukan widget!\n//   Widget build() {...}\n// }', language: 'dart' },
          { type: 'list', content: '', items: [
            'Harus extends StatelessWidget atau StatefulWidget',
            'Harus implement method build()',
            'Tidak bisa membuat widget tanpa inheritance'
          ]}
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
  // Flashcard baru dari materi ujian
  { id: '13', front: 'Apa format main method dengan parameter di Dart?', back: 'void main(List<String> args) - menggunakan List<String>, BUKAN String[] seperti Java.', category: 'Dart' },
  { id: '14', front: 'Bagaimana cara mendapatkan panjang array/List di Dart?', back: 'Gunakan properti .length (tanpa kurung). Contoh: x.length, bukan x.length() atau x.count.', category: 'Dart' },
  { id: '15', front: 'Apa fungsi underscore (_) di depan nama variabel/method di Dart?', back: 'Membuat variabel/method menjadi private - tidak dapat diakses dari luar class/library.', category: 'Dart' },
  { id: '16', front: 'Apa itu Flutter?', back: 'Framework Dart untuk membuat aplikasi mobile, web, dan desktop. Bukan bahasa pemrograman!', category: 'Flutter' },
  { id: '17', front: 'Widget apa yang menjadi struktur dasar Material Design?', back: 'Scaffold - menyediakan struktur halaman dengan AppBar, body, FAB, drawer.', category: 'Flutter' },
  { id: '18', front: 'Apa interface untuk berkomunikasi dengan sensor di Flutter?', back: 'Platform Channel - interface untuk komunikasi dengan native code dan sensor.', category: 'Flutter' },
  { id: '19', front: 'Apa perbedaan child dan children di Flutter?', back: 'child untuk satu widget (Container), children untuk banyak widget (Column, Row).', category: 'Flutter' },
  { id: '20', front: 'Library Dart apa yang menangani Queue dan LinkedList?', back: 'dart:collection - untuk struktur data seperti Queue, LinkedList, HashMap.', category: 'Dart' },
  { id: '21', front: 'Apa itu JIT di Dart?', back: 'Just-In-Time compilation - compile saat runtime, mendukung hot reload untuk development.', category: 'Dart' },
  { id: '22', front: 'OS apa yang TIDAK didukung Dart?', back: 'Windows Phone - sudah discontinued dan tidak didukung oleh Dart/Flutter.', category: 'Dart' },
  { id: '23', front: 'Apa fungsi keyword super di Dart?', back: 'Merujuk ke parent class - untuk memanggil constructor atau method parent.', category: 'Dart' },
  { id: '24', front: 'Apa perbedaan AlertDialog dan Dialog?', back: 'AlertDialog sudah terstruktur (title, content, actions). Dialog bebas disusun secara dinamis.', category: 'Flutter' },
  { id: '25', front: 'Bagaimana string interpolation di Dart?', back: 'Gunakan $variabel di dalam string. Untuk ekspresi kompleks gunakan ${ekspresi}.', category: 'Dart' },
  { id: '26', front: 'Bisakah StatelessWidget menyimpan nilai input user?', back: 'TIDAK - Stateless tidak dapat menyimpan nilai untuk kepentingan ditampilkan.', category: 'Flutter' },
  { id: '27', front: 'Apakah Column memiliki scroll built-in?', back: 'TIDAK - Column tidak punya scroll. Bungkus dengan SingleChildScrollView jika butuh scroll.', category: 'Flutter' },
  { id: '28', front: 'Bisakah membuat widget sendiri tanpa inheritance?', back: 'TIDAK - Harus extends StatelessWidget atau StatefulWidget untuk membuat widget.', category: 'Flutter' },
  { id: '29', front: 'AppBar menjadi parameter pada class apa?', back: 'Scaffold - AppBar adalah parameter di Scaffold, bukan Container atau Column.', category: 'Flutter' },
  { id: '30', front: 'Apa itu pewarisan (inheritance) di OOP?', back: 'Pemberian akses method dan atribut dari parent class ke child class.', category: 'Dart' },
];

export const quizQuestions: QuizQuestion[] = [
  // Soal dari materi ujian
  {
    id: '1',
    question: 'Berikut yang merupakan pernyataan yang BENAR tentang Dart:',
    options: ['Dart dapat menghindari error null', 'Dart merupakan perkembangan dari Python', 'Dart merupakan perkembangan dari Java', 'Semua jawaban salah'],
    correctIndex: 0,
    explanation: 'Dart memiliki fitur null-safety yang dapat menghindari error null pointer exception.',
    wrongExplanations: [
      '',
      'SALAH: Dart bukan perkembangan dari Python. Dart adalah bahasa independen yang dikembangkan Google dari awal.',
      'SALAH: Dart bukan perkembangan dari Java. Meski sintaksnya mirip, Dart dikembangkan secara terpisah oleh Google.',
      'SALAH: Ada jawaban yang benar yaitu Dart dapat menghindari error null dengan fitur null-safety.'
    ],
    category: 'Dart'
  },
  {
    id: '2',
    question: 'Dari pernyataan berikut manakah yang BENAR tentang widget Flutter?',
    options: ['Kita dapat membuat widget sendiri tanpa pewarisan', 'Widget untuk menyusun tampilan adalah OEM Widget', 'Dalam menyusun tampilan Flutter basisnya adalah menyusun widget', 'Dapat menampilkan data inputan dengan Stateless'],
    correctIndex: 2,
    explanation: 'Dalam Flutter, basis menyusun tampilan adalah menyusun widget. "Everything is a Widget" adalah filosofi utama Flutter.',
    wrongExplanations: [
      'SALAH: Kita HARUS melakukan pewarisan (extends) dari StatelessWidget atau StatefulWidget untuk membuat widget sendiri.',
      'SALAH: Tidak ada yang namanya OEM Widget di Flutter. Widget standar Flutter digunakan untuk menyusun tampilan.',
      '',
      'SALAH: Stateless TIDAK DAPAT menyimpan/menampilkan data inputan karena tidak punya state. Gunakan StatefulWidget untuk itu.'
    ],
    category: 'Flutter'
  },
  {
    id: '3',
    question: 'Dalam pemrograman Dart, manakah yang BENAR sebagai parameter main method?',
    options: ['String[] arguments', 'String[] args', 'String arguments', 'List<String> args'],
    correctIndex: 3,
    explanation: 'Di Dart, parameter main method adalah List<String> args. Dart tidak menggunakan sintaks array seperti Java.',
    wrongExplanations: [
      'SALAH: String[] adalah sintaks Java, bukan Dart. Dart menggunakan List<String>.',
      'SALAH: String[] adalah sintaks Java, bukan Dart. Dart menggunakan List<String>.',
      'SALAH: String tanpa List hanya bisa menampung satu string, bukan array/list argumen.',
      ''
    ],
    category: 'Dart'
  },
  {
    id: '4',
    question: 'Berikut yang BENAR mengenai Flutter:',
    options: ['Framework Java untuk aplikasi mobile', 'Framework Dart untuk aplikasi mobile', 'Framework JavaScript untuk aplikasi mobile', 'Flutter adalah bahasa pemrograman'],
    correctIndex: 1,
    explanation: 'Flutter adalah framework yang menggunakan bahasa Dart untuk membuat aplikasi mobile (dan juga web, desktop).',
    wrongExplanations: [
      'SALAH: Flutter BUKAN framework Java. Flutter menggunakan Dart sebagai bahasa pemrogramannya.',
      '',
      'SALAH: Flutter BUKAN framework JavaScript. React Native yang menggunakan JavaScript, bukan Flutter.',
      'SALAH: Flutter adalah FRAMEWORK, bukan bahasa pemrograman. Dart adalah bahasa pemrograman yang digunakan Flutter.'
    ],
    category: 'Flutter'
  },
  {
    id: '5',
    question: 'Manakah yang BENAR tentang operator underscore (_) di Dart?',
    options: ['Tidak dapat diakses di luar class/library', 'Tidak dapat diakses di dalam class', 'Penamaan wajib untuk atribut', 'Penamaan wajib untuk method'],
    correctIndex: 0,
    explanation: 'Underscore (_) di awal nama membuat member menjadi private - tidak dapat diakses dari luar class/library.',
    wrongExplanations: [
      '',
      'SALAH: Member dengan underscore TETAP dapat diakses di dalam class tempat dia didefinisikan.',
      'SALAH: Underscore BUKAN penamaan wajib. Itu adalah konvensi untuk membuat member private.',
      'SALAH: Underscore BUKAN penamaan wajib untuk method. Itu opsional untuk membuat method private.'
    ],
    category: 'Dart'
  },
  {
    id: '6',
    question: 'Key/parameter yang dapat digunakan untuk beberapa widget adalah:',
    options: ['children', 'List', 'child', 'Collection'],
    correctIndex: 0,
    explanation: 'children adalah parameter yang digunakan untuk widget dengan banyak child seperti Column, Row, Stack.',
    wrongExplanations: [
      '',
      'SALAH: List adalah tipe data, bukan parameter widget. children menerima nilai bertipe List<Widget>.',
      'SALAH: child hanya untuk SATU widget (Container, Center). children untuk banyak widget.',
      'SALAH: Collection adalah konsep umum, bukan parameter widget Flutter.'
    ],
    category: 'Flutter'
  },
  {
    id: '7',
    question: 'Manakah pendefinisian kode berikut yang BENAR di Dart?',
    options: ["print('hasil:' + $hasil)", "print($x + 5)", "print($x + $hasil)", "print('hasil: $hasil')"],
    correctIndex: 3,
    explanation: "String interpolation di Dart menggunakan $variabel DI DALAM string. Contoh: 'hasil: $hasil'",
    wrongExplanations: [
      "SALAH: $hasil harus di dalam string. Gunakan 'hasil: $hasil' atau 'hasil:' + hasil.toString()",
      'SALAH: $x tidak valid di luar string. Untuk operasi, gunakan langsung: print(x + 5)',
      'SALAH: $x dan $hasil tidak valid di luar string. Gunakan: print(x + hasil)',
      ''
    ],
    category: 'Dart'
  },
  {
    id: '8',
    question: 'Interface yang digunakan Flutter untuk berkomunikasi dengan sensor adalah:',
    options: ['Canvas', 'Native code', 'Events', 'Platform Channel'],
    correctIndex: 3,
    explanation: 'Platform Channel adalah interface untuk berkomunikasi antara Flutter dan native code (termasuk sensor).',
    wrongExplanations: [
      'SALAH: Canvas digunakan untuk menggambar grafis, bukan untuk komunikasi dengan sensor.',
      'SALAH: Native code adalah kode platform (Java/Kotlin untuk Android, Swift untuk iOS), bukan interface.',
      'SALAH: Events adalah konsep umum untuk event handling, bukan interface spesifik untuk sensor.',
      ''
    ],
    category: 'Flutter'
  },
  {
    id: '9',
    question: 'Library Dart collection menangani tentang:',
    options: ['Interaksi web', 'Input dan output', 'Variabel himpunan seperti queues', 'Operator matematika'],
    correctIndex: 2,
    explanation: 'dart:collection menangani struktur data seperti Queue, LinkedList, HashMap, dan collection lanjutan.',
    wrongExplanations: [
      'SALAH: Interaksi web ditangani oleh dart:html, bukan dart:collection.',
      'SALAH: Input dan output ditangani oleh dart:io, bukan dart:collection.',
      '',
      'SALAH: Operator matematika ditangani oleh dart:math, bukan dart:collection.'
    ],
    category: 'Dart'
  },
  {
    id: '10',
    question: 'Widget untuk menampilkan alert yang dapat disusun secara dinamis dan bebas:',
    options: ['FillDialog', 'Alert', 'AlertDialog', 'Dialog'],
    correctIndex: 3,
    explanation: 'Dialog adalah widget dasar yang bisa disusun secara dinamis dan bebas. AlertDialog sudah terstruktur.',
    wrongExplanations: [
      'SALAH: Tidak ada widget bernama FillDialog di Flutter.',
      'SALAH: Tidak ada widget bernama Alert di Flutter. Yang ada adalah AlertDialog dan Dialog.',
      'SALAH: AlertDialog sudah terstruktur (title, content, actions). Dialog yang bebas disusun.',
      ''
    ],
    category: 'Flutter'
  },
  {
    id: '11',
    question: 'Widget yang menjadi struktur dasar berbasis desain material:',
    options: ['TextField', 'Column', 'Container', 'Scaffold'],
    correctIndex: 3,
    explanation: 'Scaffold menyediakan struktur dasar halaman Material Design (AppBar, body, FAB, drawer).',
    wrongExplanations: [
      'SALAH: TextField adalah widget untuk input text, bukan struktur dasar halaman.',
      'SALAH: Column adalah layout widget untuk menyusun widget vertikal, bukan struktur halaman.',
      'SALAH: Container adalah widget box untuk styling, bukan struktur dasar Material Design.',
      ''
    ],
    category: 'Flutter'
  },
  {
    id: '12',
    question: 'Sistem operasi dimana Dart TIDAK bisa berjalan:',
    options: ['Android', 'iOS', 'Windows Phone', 'Linux'],
    correctIndex: 2,
    explanation: 'Dart tidak bisa berjalan di Windows Phone karena platform tersebut sudah discontinued oleh Microsoft.',
    wrongExplanations: [
      'SALAH: Dart bisa berjalan di Android via Flutter.',
      'SALAH: Dart bisa berjalan di iOS via Flutter.',
      '',
      'SALAH: Dart bisa berjalan di Linux baik native maupun via Flutter.'
    ],
    category: 'Dart'
  },
  {
    id: '13',
    question: 'Jika x adalah List/array, cara mendapatkan jumlah elemen adalah:',
    options: ['x.length', 'x.count', 'count(x)', 'x.length()'],
    correctIndex: 0,
    explanation: 'Gunakan properti .length (tanpa kurung) untuk mendapatkan jumlah elemen List di Dart.',
    wrongExplanations: [
      '',
      'SALAH: Tidak ada properti .count di Dart List. Gunakan .length.',
      'SALAH: Tidak ada fungsi count(x) di Dart. Gunakan x.length.',
      'SALAH: length adalah PROPERTI, bukan method. Jadi tanpa kurung: x.length, bukan x.length().'
    ],
    category: 'Dart'
  },
  {
    id: '14',
    question: 'Perulangan yang khusus untuk iterasi array/collection adalah:',
    options: ['while', 'for', 'do while', 'for-in'],
    correctIndex: 3,
    explanation: 'for-in (seperti foreach) adalah perulangan yang khusus untuk iterasi elemen collection/array.',
    wrongExplanations: [
      'SALAH: while bisa digunakan untuk berbagai keperluan, tidak khusus untuk array.',
      'SALAH: for klasik bisa untuk berbagai keperluan dengan counter, tidak khusus untuk array.',
      'SALAH: do-while adalah perulangan dengan kondisi di akhir, tidak khusus untuk array.',
      ''
    ],
    category: 'Dart'
  },
  {
    id: '15',
    question: 'Teknologi compile saat penyimpanan file (hot reload) di Flutter:',
    options: ['ARM32', 'Risc-V', 'Wasm', 'JIT'],
    correctIndex: 3,
    explanation: 'JIT (Just-In-Time) compilation memungkinkan hot reload - compile langsung saat file disimpan.',
    wrongExplanations: [
      'SALAH: ARM32 adalah arsitektur processor, bukan teknologi compile.',
      'SALAH: Risc-V adalah arsitektur processor, bukan teknologi compile.',
      'SALAH: Wasm (WebAssembly) adalah format untuk web, bukan teknologi hot reload.',
      ''
    ],
    category: 'Dart'
  },
  {
    id: '16',
    question: 'Pernyataan yang BENAR mengenai keyword super:',
    options: ['Hanya merujuk pada atribut', 'Akan selalu diikuti dengan pewarisan', 'Proses overload', 'Hanya merujuk pada method'],
    correctIndex: 1,
    explanation: 'super digunakan untuk merujuk ke parent class, jadi akan selalu diikuti dengan pewarisan (inheritance).',
    wrongExplanations: [
      'SALAH: super bisa merujuk ke constructor, method, maupun atribut parent class.',
      '',
      'SALAH: super tidak terkait dengan overload. super untuk memanggil parent, overload untuk multiple method signature.',
      'SALAH: super bisa merujuk ke constructor dan atribut parent class juga, tidak hanya method.'
    ],
    category: 'Dart'
  },
  {
    id: '17',
    question: 'AppBar menjadi parameter pada class:',
    options: ['Container', 'MaterialApp', 'Column', 'Scaffold'],
    correctIndex: 3,
    explanation: 'AppBar adalah parameter appBar di Scaffold, bukan di Container, MaterialApp, atau Column.',
    wrongExplanations: [
      'SALAH: Container tidak memiliki parameter AppBar. Container untuk styling box.',
      'SALAH: MaterialApp tidak memiliki parameter AppBar langsung. AppBar ada di Scaffold.',
      'SALAH: Column tidak memiliki parameter AppBar. Column adalah layout widget.',
      ''
    ],
    category: 'Flutter'
  },
  {
    id: '18',
    question: 'Berikut yang BENAR mengenai Stateless, KECUALI:',
    options: ['Column dapat digunakan', 'Dapat membuat tampilan dengan widget', 'Tidak dapat menyimpan nilai untuk ditampilkan', 'TextField dapat digunakan'],
    correctIndex: 3,
    explanation: 'TextField TIDAK bisa digunakan di Stateless karena butuh state untuk menyimpan input. Ini yang SALAH.',
    wrongExplanations: [
      'INI BENAR: Column adalah layout widget yang bisa digunakan di Stateless.',
      'INI BENAR: Stateless bisa membuat tampilan dengan widget.',
      'INI BENAR: Stateless tidak dapat menyimpan nilai untuk kepentingan ditampilkan.',
      ''
    ],
    category: 'Flutter'
  },
  {
    id: '19',
    question: 'Pernyataan yang BENAR mengenai Column:',
    options: ['Memiliki scroll di dalamnya', 'Dapat menampilkan widget melebihi layar', 'Widget disusun dari kiri ke kanan', 'Semua salah'],
    correctIndex: 3,
    explanation: 'Semua salah: Column TIDAK punya scroll, TIDAK bisa overflow, dan menyusun VERTIKAL (atas-bawah), bukan horizontal.',
    wrongExplanations: [
      'SALAH: Column TIDAK memiliki scroll. Bungkus dengan SingleChildScrollView jika butuh scroll.',
      'SALAH: Column akan ERROR (overflow) jika widget melebihi layar. Gunakan scroll widget.',
      'SALAH: Column menyusun dari ATAS ke BAWAH (vertikal). Row yang dari kiri ke kanan.',
      ''
    ],
    category: 'Flutter'
  },
  {
    id: '20',
    question: 'Variable num hanya bisa diberi nilai bilangan bulat negatif maupun positif:',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'FALSE - num bisa berisi int (bilangan bulat) ATAU double (bilangan desimal), bukan hanya bilangan bulat.',
    wrongExplanations: [
      'SALAH: num bisa berisi bilangan desimal (double) juga, tidak hanya bilangan bulat.',
      ''
    ],
    category: 'Dart'
  },
  {
    id: '21',
    question: 'Pendefinisian variable berikut yang SALAH:',
    options: ['var x = 2.5;', "String hasil = '2.5';", 'double x = 2.5;', 'var x;'],
    correctIndex: 3,
    explanation: 'var x; tanpa inisialisasi akan menjadi dynamic, tapi dalam konteks strict null-safety bisa bermasalah karena belum diinisialisasi.',
    wrongExplanations: [
      'INI BENAR: var x = 2.5 valid, x akan bertipe double.',
      "INI BENAR: String hasil = '2.5' valid, menyimpan string.",
      'INI BENAR: double x = 2.5 valid, deklarasi eksplisit.',
      ''
    ],
    category: 'Dart'
  },
  {
    id: '22',
    question: 'ElevatedButton digunakan sebagai tombol untuk event yang dapat diberi gambar:',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'FALSE - ElevatedButton untuk text/icon standar. Untuk tombol dengan gambar, gunakan IconButton atau ElevatedButton.icon().',
    wrongExplanations: [
      'SALAH: ElevatedButton tidak dirancang untuk gambar. Gunakan IconButton atau ElevatedButton.icon() untuk itu.',
      ''
    ],
    category: 'Flutter'
  },
  {
    id: '23',
    question: 'Istilah pemberian akses method dan atribut dari parent ke child class:',
    options: ['Interface', 'Abstract', 'Pewarisan', 'Implement'],
    correctIndex: 2,
    explanation: 'Pewarisan (Inheritance) adalah pemberian akses method dan atribut dari parent class ke child class.',
    wrongExplanations: [
      'SALAH: Interface adalah kontrak method yang harus diimplementasi, bukan pemberian akses.',
      'SALAH: Abstract adalah class yang tidak bisa diinstansiasi langsung, bukan pemberian akses.',
      '',
      'SALAH: Implement adalah cara menggunakan interface, bukan pemberian akses dari parent.'
    ],
    category: 'Dart'
  },
  {
    id: '24',
    question: 'Aplikasi Dart untuk berjalan di browser dikompilasi ke:',
    options: ['JavaScript', 'Server', 'WebAssembly', 'JavaScript atau WebAssembly'],
    correctIndex: 3,
    explanation: 'Dart dapat dikompilasi ke JavaScript (dart2js) atau WebAssembly (Wasm) untuk berjalan di browser.',
    wrongExplanations: [
      'KURANG LENGKAP: Dart juga bisa dikompilasi ke WebAssembly, tidak hanya JavaScript.',
      'SALAH: Server bukan output kompilasi. Dart bisa berjalan di server, tapi outputnya bukan "Server".',
      'KURANG LENGKAP: Dart juga bisa dikompilasi ke JavaScript, tidak hanya WebAssembly.',
      ''
    ],
    category: 'Dart'
  },
  // Soal-soal lama yang masih relevan
  {
    id: '25',
    question: 'Apa filosofi utama Flutter?',
    options: ['Everything is a Function', 'Everything is a Widget', 'Everything is a Component', 'Everything is a View'],
    correctIndex: 1,
    explanation: '"Everything is a Widget" adalah filosofi utama Flutter. Semua elemen UI adalah widget.',
    wrongExplanations: [
      'SALAH: Flutter tidak menggunakan konsep "Everything is a Function".',
      '',
      'SALAH: Component adalah terminologi React, bukan Flutter.',
      'SALAH: View adalah terminologi iOS/Android native, bukan Flutter.'
    ],
    category: 'Flutter'
  },
  {
    id: '26',
    question: 'Keyword untuk menunggu hasil Future:',
    options: ['wait', 'await', 'async', 'then'],
    correctIndex: 1,
    explanation: 'await digunakan untuk menunggu hasil Future. Fungsi yang menggunakan await harus ditandai async.',
    wrongExplanations: [
      'SALAH: wait bukan keyword Dart. Gunakan await.',
      '',
      'SALAH: async untuk menandai fungsi asinkron, bukan untuk menunggu.',
      'SALAH: then adalah method callback, bukan keyword untuk menunggu.'
    ],
    category: 'Async'
  },
  {
    id: '27',
    question: 'Apa itu null-safety di Dart?',
    options: ['Fitur keamanan network', 'Pencegahan null pointer exception', 'Enkripsi data', 'Proteksi memory'],
    correctIndex: 1,
    explanation: 'Null-safety mencegah null pointer exception dengan memastikan variabel tidak bisa null kecuali ditandai.',
    wrongExplanations: [
      'SALAH: Null-safety tidak terkait dengan keamanan network.',
      '',
      'SALAH: Null-safety tidak terkait dengan enkripsi data.',
      'SALAH: Null-safety tidak terkait dengan proteksi memory secara langsung.'
    ],
    category: 'Dart'
  },
  {
    id: '28',
    question: 'Widget untuk menyusun children di atas satu sama lain (layer):',
    options: ['Column', 'Row', 'Stack', 'ListView'],
    correctIndex: 2,
    explanation: 'Stack menyusun children dalam layer (Z-axis), memungkinkan widget saling menimpa.',
    wrongExplanations: [
      'SALAH: Column menyusun vertikal (atas-bawah), bukan layer.',
      'SALAH: Row menyusun horizontal (kiri-kanan), bukan layer.',
      '',
      'SALAH: ListView untuk scrollable list, bukan layer.'
    ],
    category: 'Layout'
  },
  {
    id: '29',
    question: 'Keuntungan menggunakan ListView.builder():',
    options: ['Lebih cantik', 'Lazy loading - hemat memory', 'Lebih berwarna', 'Tidak ada keuntungan'],
    correctIndex: 1,
    explanation: 'ListView.builder() menggunakan lazy loading - hanya membuat widget yang terlihat di layar.',
    wrongExplanations: [
      'SALAH: ListView.builder tidak membuat tampilan lebih cantik.',
      '',
      'SALAH: ListView.builder tidak terkait dengan warna.',
      'SALAH: Ada keuntungan besar yaitu hemat memory dengan lazy loading.'
    ],
    category: 'Layout'
  },
  {
    id: '30',
    question: 'Apa fungsi Navigator.pop()?',
    options: ['Menambah halaman', 'Kembali ke halaman sebelumnya', 'Refresh halaman', 'Menutup aplikasi'],
    correctIndex: 1,
    explanation: 'Navigator.pop() menghapus halaman teratas dari navigation stack, kembali ke halaman sebelumnya.',
    wrongExplanations: [
      'SALAH: Untuk menambah halaman gunakan Navigator.push(), bukan pop().',
      '',
      'SALAH: Navigator.pop() tidak untuk refresh, itu untuk kembali.',
      'SALAH: Navigator.pop() tidak menutup aplikasi, hanya kembali ke halaman sebelumnya.'
    ],
    category: 'Navigation'
  }
];
