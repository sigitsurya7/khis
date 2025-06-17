import { Perusahaan } from "@/data/perusahaan";
import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Select, SelectItem, Pagination, Button, Tooltip, CardFooter, useDisclosure } from "@heroui/react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiFileExcel2Line } from "react-icons/ri";
import React, { useEffect, useMemo, useState } from "react";
import { BulanIndo } from "@/data/bulan";
import { DetailPiutang, loadDetailPenagihan, loadPiutangRanap, PiutangResponse } from "@/services/asuransi";
import { GoDash } from "react-icons/go";
import ModalTagihan from "./modalDetail";
import { formatCurrency } from "@/config/formatCurrency";

export default function DaftarPenARanap() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentMonthData = BulanIndo.find(month => month.id === currentMonth);
    const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const [jenisJaminan, setJenisJaminan] = useState("4");
    const [bulan, setBulan] = useState(currentMonthData?.value || "");
    const [tahun, setTahun] = useState(currentYear.toString());
    const [response, setResponse] = useState<PiutangResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [ detail, setDetail ] = useState<DetailPiutang | null>(null)
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [ detailError, setDetailError] = useState<string | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const pages = useMemo(() => {
        return response?.total ? Math.ceil(response.total / rowsPerPage) : 1;
    }, [response]);

    useEffect(() => {
        fetchData();
    }, [jenisJaminan, bulan, tahun, page]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await loadPiutangRanap({
                cara_bayar_id: jenisJaminan,
                bulan: bulan,
                tahun: tahun,
                page: page,
                limit: rowsPerPage
            });
            setResponse(result);
        } catch (error) {
            setError('Gagal memuat data piutang');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleModal = async (data: any) => {
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

                <Card>
                    <CardBody>
                        <Table
                            aria-label="Daftar Penagihan Asuransi Table"
                            isCompact={true}
                            isHeaderSticky
                            removeWrapper={true}
                            fullWidth={true}
                        >
                            <TableHeader>
                                <TableColumn>No Kwitansi</TableColumn>
                                <TableColumn>Tanggal</TableColumn>
                                <TableColumn>No. RM</TableColumn>
                                <TableColumn>Nama Pasien</TableColumn>
                                <TableColumn>Nik/Polis</TableColumn>
                                <TableColumn>Nama Asuransi</TableColumn>
                                <TableColumn>Pelayanan</TableColumn>
                                <TableColumn>Nilai</TableColumn>
                                <TableColumn>Action</TableColumn>
                            </TableHeader>
                            <TableBody
                                emptyContent={loading ? "Memuat data..." : error || "Tidak ada data yang ditemukan"}
                                isLoading={loading}
                            >
                                {response?.data ? (
                                    response.data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.no_kwitansi}</TableCell>
                                        <TableCell>{item.tanggal}</TableCell>
                                        <TableCell>{item.no_rm != null ? item.no_rm : <GoDash />}</TableCell>
                                        <TableCell>{item.nama_pasien != null ? item.nama_pasien : <GoDash />}</TableCell>
                                        <TableCell>{item.no_jaminan != null ? item.no_jaminan : <GoDash />}</TableCell>
                                        <TableCell>{item.nama_perusahaan != null ? item.nama_perusahaan : <GoDash />}</TableCell>
                                        <TableCell>{item.nama_layanan != null ? item.nama_layanan : <GoDash />}</TableCell>
                                        <TableCell>{formatCurrency(item.saldo)}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Tooltip content="Edit" placement="right">
                                                <Button isIconOnly color="default" variant="light" onPress={() => handleModal(item)}>
                                                    <HiOutlinePencilSquare />
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                    <TableCell colSpan={9} className="text-center py-8">
                                        {loading ? "Memuat data..." : error || "Tidak ada data yang ditemukan"}
                                    </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                    {response?.total && response.total > 0 ? (
                        <CardFooter>
                            <div className="flex w-full justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Menampilkan {(page - 1) * rowsPerPage + 1} -{' '}
                                    {Math.min(page * rowsPerPage, response.total)} dari {response.total} data
                                </div>
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(newPage) => setPage(newPage)}
                                />
                            </div>
                        </CardFooter>
                    ) : ''}
                </Card>
            </div>

            <ModalTagihan
                isOpen={isOpen}
                onClose={onClose}
                isLoading={loadingDetail}
                data={detail}
                error={detailError}
            />
        </React.Fragment>
    );
}