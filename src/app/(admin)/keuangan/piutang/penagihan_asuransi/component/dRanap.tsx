import { Perusahaan } from "@/data/perusahaan";
import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Select, SelectItem, Pagination, Button, Tooltip, CardFooter, useDisclosure, Input } from "@heroui/react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiFileExcel2Line } from "react-icons/ri";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BulanIndo } from "@/data/bulan";
import { DetailPiutang, loadDetailPenagihan } from "@/services/asuransi";
import { GoDash, GoSearch } from "react-icons/go";
import ModalTagihan from "./modalDetail";
import { formatCurrency } from "@/config/formatCurrency";
import { KTableColumn } from "@/types/kTables";
import KTable from "@/components/ktable/MainTable";
import api from "@/lib/api";

interface PiutangRanap {
  uuid: string;
  no_kwitansi: string;
  tanggal: string;
  no_rm: string;
  nama_pasien: string;
  no_jaminan: string;
  nama_perusahaan: string;
  saldo: string;
  action: string;
}

const RenderButton = ({ item, table }: any) => {

  const {isOpen, onOpen, onClose} = useDisclosure();

  const [ detail, setDetail ] = useState<DetailPiutang | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [ detailError, setDetailError] = useState<string | null>(null);

  async function getDetail(data: any){
      onOpen()
      try {
          setLoadingDetail(true)
          const response = await loadDetailPenagihan({
              id: data?.id ?? 0,
              cara_bayar_id: data?.cara_bayar_id,
              jenis_cara_bayar: data?.jenis_cara_bayar,
              perusahaan_id: data?.perusahaan_id,
              jenis_layanan: data?.layanan_id,
              jenis_piutang: data?.jenis_cara_bayar,
              tanggal_dari: data?.periode_tanggal_dari,
              tanggal_sampai: data?.periode_tanggal_sampai,
              bundel_uid: data?.uid,
              periode_id: data?.periode_id,
              tab_active: "tab_daftar_piutang_rajal",
              nama_perusahaan: data.nama_perusahaan,
              kasir_ids: btoa(data?.kasir_ids),
          })
  
          setDetail(response)
      } catch (error) {
          setDetailError('Gagal memuat detail piutang');
          setDetail(null)
          console.error(error);
      } finally {
          setLoadingDetail(false)
      }
  }
  return(
    <React.Fragment>
      <Button isIconOnly color="default" size="sm" variant="light" onPress={() => getDetail(item)}>
          <HiOutlinePencilSquare />
      </Button>
      
      <ModalTagihan
          isOpen={isOpen}
          onClose={onClose}
          isLoading={loadingDetail}
          data={detail}
          error={detailError}
          fetchData={table}
      />
    </React.Fragment>
  )
}

export default function DaftarPenARanap() {
    const tableRef = useRef<any>(null);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentMonthData = BulanIndo.find(month => month.id === currentMonth);
    const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const [jenisJaminan, setJenisJaminan] = useState("4");
    const [bulan, setBulan] = useState(currentMonthData?.value || "");
    const [tahun, setTahun] = useState(currentYear.toString());
    const [page, setPage] = useState(1);

    const columns: KTableColumn<PiutangRanap>[] = [
        {
            id: "1",
            title: "Nama Penjamin",
            field: "nama_perusahaan",
            render: (item) => (
                <div>
                    <div>{item.no_kwitansi ?? <GoDash />}</div>
                </div>
            ),
        },
        {
            id: "2",
            title: "Tanggal",
            field: "tanggal",
            render: (item) => (
                <div className="flex flex-wrap gap-3">
                    {item.tanggal ?? <GoDash />}
                </div>
            )
        },
        {
            id: "3",
            title: "No rm",
            field: "no_rm",
            render: (item) => (
                item.no_rm ?? <GoDash />
            )
        },
        {
            id: "4",
            title: "Nama Pasien",
            field: "nama_pasien",
            render: (item) => (
                item.nama_pasien ?? <GoDash />
            )
        },
        {
            id: "5",
            title: "No Jaminan",
            field: "no_jaminan",
            render: (item) => (
                item.no_jaminan ?? <GoDash />
            )
        },
        {
            id: "6",
            title: "Perusahaan",
            field: "nama_perusahaan",
            render: (item) => (
                item.nama_perusahaan ?? <GoDash />
            )
        },
        {
            id: "7",
            title: "Jumlah",
            field: "saldo",
            render: (item) => (
                item.saldo ? formatCurrency(item.saldo) : ""
            )
        },
        {
            id: "8",
            title: "Action",
            field: "action",
            render: (item) => <RenderButton item={item} table={tableRef} />
        }
    ];

    return (
        <React.Fragment>
            <div className="flex flex-col gap-4">
                <Card>
                    <CardBody>
                        <div className="flex flex-col flex-wrap gap-4">
                            <div className="flex justify-between items-center flex-wrap">
                                <h1 className="font-semibold ml-2">Daftar Tagihan Rajal</h1>
                                <Button color="success" startContent={<RiFileExcel2Line />}>Export Excel</Button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4">
                                <Select
                                    label="Jenis Jaminan"
                                    selectedKeys={[jenisJaminan]}
                                    placeholder="Pilih Jaminan"
                                    onSelectionChange={(keys) => {
                                        const selectedKey = Array.from(keys)[0]?.toString() || "4";
                                        setJenisJaminan(selectedKey);
                                        setPage(1); // Reset to first page when filter changes
                                    }}
                                >
                                    <SelectItem key="4">Asuransi</SelectItem>
                                    <SelectItem key="5">Perusahaan</SelectItem>
                                </Select>

                                <Select
                                    label="Bulan"
                                    selectedKeys={[bulan]}
                                    placeholder="Pilih Bulan"
                                    onSelectionChange={(keys) => {
                                        const selectedKey = Array.from(keys)[0]?.toString() || "";
                                        setBulan(selectedKey);
                                        setPage(1);
                                    }}
                                >
                                    {BulanIndo.map((val) => (
                                        <SelectItem key={val.value}>{val.nama_bulan}</SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Tahun"
                                    selectedKeys={[tahun]}
                                    placeholder="Pilih Tahun"
                                    onSelectionChange={(keys) => {
                                        const selectedKey = Array.from(keys)[0]?.toString() || currentYear.toString();
                                        setTahun(selectedKey);
                                        setPage(1);
                                    }}
                                >
                                    {yearOptions.map((year) => (
                                        <SelectItem key={year.toString()}>{year.toString()}</SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <KTable<PiutangRanap>
                    ref={tableRef}
                    ariaLabel="Daftar Penagihan Asuransi Rawat Inap Table"
                    header={columns}
                    fetchData={async ({ page, limit, search, }) => {
                        const res = await api.get("/asuransi/piutang_ranap", {
                            params: { page, limit, search, cara_bayar_id: jenisJaminan, bulan, tahun },
                        });
                        return {
                            data: res.data.data,
                            total: res.data.total,
                        };
                    }}
                />
            </div>
        </React.Fragment>
    );
}