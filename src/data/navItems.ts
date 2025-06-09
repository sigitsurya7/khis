import { HiChevronDown, HiEllipsisHorizontal, HiOutlineHome, HiOutlineFolder, HiOutlineBanknotes } from "react-icons/hi2";
import { NavItem } from "@/types/navigation";
import React from "react";

export const navItems: NavItem[] = [
    {
    icon: React.createElement(HiOutlineHome, { className: "text-lg" }),
    name: "Dashboard",
    path: '/'
  },
  {
    icon: React.createElement(HiOutlineFolder, { className: "text-lg" }),
    name: "Pelayanan Medis",
    subItems: [
      {
        name: "Rawat Jalan",
        path: "/pelayanan_medis/rawat_jalan",
        subItems: [
          {
            name: "Booking",
            path: "/pelayanan_medis/rawat_jalan/booking",
          },
          {
            name: "Pendaftaran",
            path: "/pelayanan_medis/rawat_jalan/pendaftaran",
          },
          {
            name: "Daftar Kunjungan",
            path: "/pelayanan_medis/rawat_jalan/daftar_kunjungan",
          },
          {
            name: "Pemeriksaan Awal",
            path: "/pelayanan_medis/rawat_jalan/pemeriksaan_awal",
          },
          {
            name: "Pemeriksaan Dokter",
            path: "/pelayanan_medis/rawat_jalan/pemeriksaan_dokter",
          },
          {
            name: "Asuhan HD",
            path: "/pelayanan_medis/rawat_jalan/asuhan_hd",
          },
          {
            name: "Rehab / Fisioterapi",
            path: "/pelayanan_medis/rawat_jalan/rehab",
          },
          {
            name: "Laporan",
            path: "/pelayanan_medis/rawat_jalan/laporan",
          },
        ],
      },
      {
        name: "IGD",
        path: "/pelayanan_medis/igd",
        subItems: [
          {
            name: "Pendaftaran",
            path: "/pelayanan_medis/igd/pendaftaran"
          },
          {
            name: "Daftar Kunjungan",
            path: "/pelayanan_medis/igd/daftar_kunjungan"
          },
          {
            name: "Asuhan",
            path: "/pelayanan_medis/igd/asuhan"
          },
          {
            name: "Laporan",
            path: "/pelayanan_medis/igd/laporan"
          },
        ]
      },
      {
        name: "Rawat Inap",
        path: "/pelayanan_medis/rawat_inap",
        subItems: [
          {
            name: "Pendaftaran",
            path: "/pelayanan_medis/rawat_inap/pendaftaran",
          },
          {
            name: "Katalog Ruangan",
            path: "/pelayanan_medis/rawat_inap/katalog",
          },
          {
            name: "Ketersediaan Kamar",
            path: "/pelayanan_medis/rawat_inap/ketersediaan_kamar",
          },
          {
            name: "Daftar Kunjungan",
            path: "/pelayanan_medis/rawat_inap/daftar_kunjungan",
          },
          {
            name: "Asuhan Rawat Inap",
            path: "/pelayanan_medis/rawat_inap/asuhan",
          },
          {
            name: "Resume Medik",
            path: "/pelayanan_medis/rawat_inap/resume_medik",
          },
          {
            name: "Surveilance PPI",
            path: "/pelayanan_medis/rawat_inap/surveilance_ppi",
          },
          {
            name: "Retur Obat",
            path: "/pelayanan_medis/rawat_inap/retur_obat",
          },
          {
            name: "Laporan",
            path: "/pelayanan_medis/rawat_inap/laporan",
          },
        ],
      },
      {
        name: "OK",
        path: "/pelayanan_medis/ok",
        subItems: [
          {
            name: "Asuhan",
            path: "/pelayanan_medis/ok/asuhan",
          },
          {
            name: "Pelaksanaan Operasi",
            path: "/pelayanan_medis/ok/pelaksanaan_operasi",
          },
          {
            name: "Laporan",
            path: "/pelayanan_medis/ok/laporan",
          },
        ]
      },
      {
        name: 'VK',
        path: "/pelayanan_medis/vk",
      },
      {
        name: 'Gizi',
        path: "/pelayanan_medis/gizi",
      },
      {
        name: 'Penunjang Medis',
        path: "/pelayanan_medis/penunjang_medis",
        subItems: [
          {
            name: 'Laboratorium',
            path: '/pelayanan_medis/penunjang_medis/laboratorium',
            subItems: [
              {
                name: 'Daftar Panggilan',
                path: '/pelayanan_medis/penunjang_medis/laboratorium/daftar_panggilan'
              },
              {
                name: 'Daftar Kunjungan',
                path: '/pelayanan_medis/penunjang_medis/laboratorium/daftar_kunjungan'
              },
              {
                name: 'Daftar Pemeriksaan',
                path: '/pelayanan_medis/penunjang_medis/laboratorium/daftar_pemeriksaan'
              },
              {
                name: 'Retur',
                path: '/pelayanan_medis/penunjang_medis/laboratorium/retur'
              },
              {
                name: 'Laporan',
                path: '/pelayanan_medis/penunjang_medis/laboratorium/laporan'
              }
            ]
          },
          {
            name: 'Radiologi',
            path: '/pelayanan_medis/penunjang_medis/radiologi',
            subItems: [
              {
                name: 'Daftar Panggilan',
                path: '/pelayanan_medis/penunjang_medis/radiologi/daftar_panggilan'
              },
              {
                name: 'Daftar Kunjungan',
                path: '/pelayanan_medis/penunjang_medis/radiologi/daftar_kunjungan'
              },
              {
                name: 'Daftar Pemeriksaan',
                path: '/pelayanan_medis/penunjang_medis/radiologi/daftar_pemeriksaan'
              },
              {
                name: 'Retur',
                path: '/pelayanan_medis/penunjang_medis/radiologi/retur'
              },
              {
                name: 'Laporan',
                path: '/pelayanan_medis/penunjang_medis/radiologi/laporan'
              }
            ]
          }
        ]
      }
    ],
  },
  {
    icon: React.createElement(HiOutlineBanknotes, { className: "text-lg" }),
    name: "Keuangan",
    subItems: [
      {
          name: "Kas / Bank",
          path: "/keuangan/kas_bank/",
          subItems: [
            {
                name: "Kasir Rawat Jalan",
                path: "/keuangan/kas_bank/kasir_rawat_jalan",
                subItems: [
                    {
                        name: "List Kasir",
                        path: "/keuangan/kas_bank/kasir_rawat_jalan/list",
                    },
                    {
                        name: "Daftar Piutang Umum",
                        path: "/keuangan/kas_bank/kasir_rawat_jalan/piutang_umum",
                    },
                    {
                        name: "Daftar Pemutihan",
                        path: "/keuangan/kas_bank/kasir_rawat_jalan/pemutihan",
                    },
                ]
            },
            {
                name: "Kasir Rawat Inap",
                path: "/keuangan/kas_bank/kasir_rawat_inap",
                subItems: [
                    {
                        name: "List Kasir",
                        path: "/keuangan/kas_bank/kasir_rawat_inap/list",
                    },
                    {
                        name: "Daftar Piutang Umum",
                        path: "/keuangan/kas_bank/kasir_rawat_inap/piutang_umum",
                    },
                    {
                        name: "Daftar Pemutihan",
                        path: "/keuangan/kas_bank/kasir_rawat_inap/pemutihan",
                    },
                ]
            },
            {
              name: "Kasir Pengeluaran Kas",
              path: "/keuangan/kas_bank/pengeluaran_kas"
            },
            {
              name: "Kasir Penerimaan Kas",
              path: "/keuangan/kas_bank/penerimaan_kas"
            },
            {
              name: "Laporan",
              path: "/keuangan/kas_bank/laporan"
            },
          ]
      },
      {
        name: "Piutang",
        path: "/keuangan/piutang/",
        subItems: [
          {
            name: 'Penagihan Asuransi / Perusahaan',
            path: '/keuangan/piutang/penagihan_asuransi',
          },
          {
            name: 'Penagihan BPJS',
            path: '/keuangan/piutang/penagihan_bpjs'
          },
          {
            name: 'Penagihan COB',
            path: '/keuangan/piutang/penagihan_cob'
          },
          {
            name: 'Penagihan APOL',
            path: '/keuangan/piutang/penagihan_apol',
            subItems: [
              {
                name: "Daftar Apol",
                path: '/keuangan/piutang/penagihan_apol/daftar'
              },
              {
                name: "Monitoring",
                path: '/keuangan/piutang/penagihan_apol/monitoring'
              },
            ]
          },
          {
            name: 'Daftar Piutang',
            path: '/keuangan/piutang/daftar_piutang'
          },
          {
            name: 'Daftar Umur Piutang',
            path: '/keuangan/piutang/daftar_umur_piutang'
          },
          {
            name: 'Perbandingan Umur Piutang',
            path: '/keuangan/piutang/perbandingan_umur_piutang'
          },
        ]
      }
    ]
  }
]