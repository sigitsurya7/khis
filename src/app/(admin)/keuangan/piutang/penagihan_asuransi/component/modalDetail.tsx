import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from "@heroui/react";
import { GoDash } from "react-icons/go";
import { FaRegFloppyDisk } from "react-icons/fa6";
import { formatCurrency } from "@/config/formatCurrency";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { saveDetailTagihan } from "@/services/asuransi";

interface ModalTagihanProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  data: any;
  error: string | null;
  fetchData: any
}

interface ApiPayload {
    buat_tagihan_detail_id: string[];
    id: string;
    uid: string;
    tanggal: string;
    tanggal_dari: string;
    tanggal_sampai: string;
    cara_bayar_id: string;
    perusahaan_id: string;
    jenis_layanan: string;
    total_tagihan: string;
    bundel_uid: string;
}

export default function ModalTagihan({
  isOpen,
  onClose,
  isLoading,
  data,
  error,
  fetchData
}: ModalTagihanProps) {

    const [ loading, setLoading ] = useState(false)
    const [ totalTagihan, setTotalTagihan ] = useState(0)

    // Calculate total asuransi
    useEffect(() => {
        const totalAsuransi = data?.tagihan?.detail_list?.reduce(
            (sum: number, item: any) => sum + parseFloat(item.asuransi ?? '0'), 
            0
        ) || 0;

        setTotalTagihan(totalAsuransi)
    }, [data])

    async function saveDetailTindakan(){
        setLoading(true)
        
        try {
            const apiPayload : ApiPayload = {
                buat_tagihan_detail_id: data?.tagihan?.detail_list?.map((item : any) => item.id.toString()),
                id: data.tagihan.id.toString(),
                uid: data.tagihan.uid,
                tanggal: data.tagihan.tanggal,
                tanggal_dari: data.tagihan.tanggal_dari,
                tanggal_sampai: data.tagihan.tanggal_sampai,
                cara_bayar_id: data.tagihan.cara_bayar_id.toString(),
                perusahaan_id: data.tagihan.perusahaan_id.toString(),
                jenis_layanan: data.tagihan.jenis_layanan.toString(),
                total_tagihan: totalTagihan.toFixed(0),
                bundel_uid: data.tagihan.bundel_uid
            }
            
            await saveDetailTagihan(apiPayload)
            toast.success("Data Berhasil di tambahkan");
            onClose()
            fetchData.current?.refresh()
        } catch (error) {
            toast.error("Gagal menyimpan data")
        } finally{
            setLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} size="5xl" onClose={onClose} className="z-99">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                Piutang Asuransi
                {data?.tagihan && (
                    <div className="text-sm font-normal">
                    <p>Periode: {data?.tagihan?.tanggal_dari} s/d {data?.tagihan?.tanggal_sampai}</p>
                    <p>Penjamin: {data?.nama_perusahaan}</p>
                    </div>
                )}
                </ModalHeader>
                <ModalBody>
                <Table
                    aria-label="Daftar Detail Penagihan Asuransi"
                    isCompact
                    isHeaderSticky
                    removeWrapper
                    fullWidth
                    className="max-h-[60vh] overflow-auto"
                >
                    <TableHeader>
                        <TableColumn className="bg-[#0272ef] text-white">No. Kwitansi</TableColumn>
                        <TableColumn className="bg-[#0272ef] text-white">Tanggal</TableColumn>
                        <TableColumn className="bg-[#0272ef] text-white">Nama Pasien</TableColumn>
                        <TableColumn className="bg-[#0272ef] text-white">NIK/Polis</TableColumn>
                        <TableColumn className="bg-[#0272ef] text-white">Nama Karyawan</TableColumn>
                        <TableColumn className="bg-[#0272ef] text-white">Pelayanan</TableColumn>
                        <TableColumn className="bg-[#0272ef] text-white">Diagnosa Kerja</TableColumn>
                        <TableColumn className="text-center bg-[#0272ef] text-white">Nilai</TableColumn>
                    </TableHeader>
                    <TableBody
                    isLoading={isLoading}
                    loadingContent={<Spinner />}
                    emptyContent={
                        isLoading 
                        ? "Memuat data..." 
                        : error || "Tidak ada data yang ditemukan"
                    }
                    >
                    {data?.tagihan?.detail_list?.map((item: any, index: number) => (
                        <TableRow key={index}>
                        <TableCell>{item.no_kwitansi ?? <GoDash />}</TableCell>
                        <TableCell>{item.tanggal ?? <GoDash />}</TableCell>
                        <TableCell>{item.nama ?? <GoDash />}</TableCell>
                        <TableCell>{item.no_jaminan ?? <GoDash />}</TableCell>
                        <TableCell>{item.nama_karyawan ?? <GoDash />}</TableCell>
                        <TableCell>{item.nama_layanan ?? <GoDash />}</TableCell>
                        <TableCell>{item.diagnosa_list ?? <GoDash />}</TableCell>
                        <TableCell className="text-right">
                            {formatCurrency(item.asuransi ?? '0')}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>

                {/* Total Row */}
                {data?.tagihan?.detail_list && (
                    <div className="flex justify-end mt-4">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 w-fit">
                        <div className="flex items-center gap-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-lg">
                            {formatCurrency(totalTagihan)}
                        </span>
                        </div>
                    </div>
                    </div>
                )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                        Tutup
                    </Button>
                    <Button 
                        color="success" 
                        startContent={<FaRegFloppyDisk />}
                        isDisabled={!data?.tagihan?.detail_list}
                        onPress={() => saveDetailTindakan()}
                        isLoading={loading}
                    >
                        Buat Tagihan
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}