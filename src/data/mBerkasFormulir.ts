interface BerkasFormulir {
  NO: string;
  nama_berkas: string;
  idForm: string;
  status: string;
  pelayanan_tipe: string;
}

const berkasDikelompokkan: BerkasFormulir[] = [
  {
    "NO": "57",
    "nama_berkas": "Cover Medical Checkup Report",
    "idForm": "formCoverMcu",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "58",
    "nama_berkas": "Cover Medical Checkup Report II",
    "idForm": "formCoverMcu2",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "81",
    "nama_berkas": "Form Catatan ESWL",
    "idForm": "formCatatanSwl",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "80",
    "nama_berkas": "Form Hasil Tindakan ESWL",
    "idForm": "formHasilSwl",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "82",
    "nama_berkas": "Form Pelaksanaan Keperawatan ESWL",
    "idForm": "formPelaksanaanSwl",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "46",
    "nama_berkas": "Form Pemindahan Ruang",
    "idForm": "formPemindahanRuang",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "1",
    "nama_berkas": "Form Rehab Medik",
    "idForm": "formRawatJalan",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "9",
    "nama_berkas": "General Consent",
    "idForm": "formPemberian",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "2",
    "nama_berkas": "Informed Consent",
    "idForm": "formPersetujuanPenolakan",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "69",
    "nama_berkas": "Laporan Tindakan Khusus",
    "idForm": "formLaporanTindakanInfoUmum",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "70",
    "nama_berkas": "Lembar Hasil Tindakan Uji Fungsi",
    "idForm": "formHasilKfr",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "56",
    "nama_berkas": "Medical Check Up Report",
    "idForm": "formReportMcu",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "71",
    "nama_berkas": "Rehab Medik v2",
    "idForm": "formRehabMedik",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "77",
    "nama_berkas": "Surat Istirahat Dokter",
    "idForm": "formSid",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "83",
    "nama_berkas": "Surat Pengantar Pasien Rencana Tindakan ESWL",
    "idForm": "formPengantarSWL",
    "status": "1",
    "pelayanan_tipe": "1"
  },
  {
    "NO": "10",
    "nama_berkas": "Form Permintaan Privasi",
    "idForm": "formPrivasi",
    "status": "1",
    "pelayanan_tipe": "2"
  },
  {
    "NO": "79",
    "nama_berkas": "Form Rekonsiliasi",
    "idForm": "formRekonsiliasi",
    "status": "1",
    "pelayanan_tipe": "2"
  },
  {
    "NO": "12",
    "nama_berkas": "Lembar Hasil Tindakan Uji Fungsi/Prosedur KFR",
    "idForm": "formHasilUjiFungsiKFR",
    "status": "1",
    "pelayanan_tipe": "2"
  },
  {
    "NO": "18",
    "nama_berkas": "Sertifikat Medis Penyebab Kematian",
    "idForm": "formKematian",
    "status": "1",
    "pelayanan_tipe": "2"
  },
  {
    "NO": "7",
    "nama_berkas": "Surat Permintaan Pindah Kelas Keperawatan",
    "idForm": "formPermintaanPindah",
    "status": "1",
    "pelayanan_tipe": "2"
  },
  {
    "NO": "19",
    "nama_berkas": "Surat Permintaan Rawat",
    "idForm": "formSpr",
    "status": "1",
    "pelayanan_tipe": "2"
  },
  {
    "NO": "24",
    "nama_berkas": "Asessment Keperawatan IGD",
    "idForm": "formAssKep",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "5",
    "nama_berkas": "Form Edukasi",
    "idForm": "formEdukasi",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "45",
    "nama_berkas": "Form Edukasi Pasien BPJS",
    "idForm": "formEdukasiBpjs",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "60",
    "nama_berkas": "Form Permintaan Pindah Kelas",
    "idForm": "formPindahKelas",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "3",
    "nama_berkas": "Formulir Penandaan Lokasi Operasi ( Laki-laki )",
    "idForm": "formPenandaanLaki",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "11",
    "nama_berkas": "Formulir Penandaan Lokasi Operasi ( Perempuan )",
    "idForm": "formPenandaanCw",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "8",
    "nama_berkas": "Keterangan Perawatan Pasien ICU / HCU",
    "idForm": "formKeteranganPerawatan",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "26",
    "nama_berkas": "Lembar Pemberian Obat (LPO)",
    "idForm": "formLPO",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "59",
    "nama_berkas": "Pengkajian Integritas Kulit Pada Pasien Pediatrik",
    "idForm": "formKulitPediatrik",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "4",
    "nama_berkas": "Penilaian Pra Sedasi dan Anastesi",
    "idForm": "formPenilaianSedasi",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "75",
    "nama_berkas": "Perkiraan Biaya Operasi",
    "idForm": "formPbo",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "67",
    "nama_berkas": "Surat Keterangan Lahir",
    "idForm": "formSKL",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "78",
    "nama_berkas": "Surat Keterangan Rawat",
    "idForm": "formSkr",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "62",
    "nama_berkas": "Surat Permintaan Rawat  Bayi",
    "idForm": "formSprBayi",
    "status": "1",
    "pelayanan_tipe": "3"
  },
  {
    "NO": "66",
    "nama_berkas": "VISUM ET REPERTUM",
    "idForm": "formVisum",
    "status": "1",
    "pelayanan_tipe": "3"
  }
]

function kelompokkanBerkas(berkas: BerkasFormulir[]) {
  
  const grouped = berkas.reduce((acc, item) => {
    const key = item.pelayanan_tipe;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, BerkasFormulir[]>);

  
  return Object.entries(grouped).map(([tipe, items]) => {
    let kategori = '';
    switch (tipe) {
      case '1':
        kategori = 'Rawat Jalan';
        break;
      case '2':
        kategori = 'IGD';
        break;
      case '3':
        kategori = 'Rawat Inap';
        break;
      default:
        kategori = 'Lainnya';
    }

    return {
      kategori,
      tipe,
      items
    };
  });
}

export const mBerkasFormulir = kelompokkanBerkas(berkasDikelompokkan);