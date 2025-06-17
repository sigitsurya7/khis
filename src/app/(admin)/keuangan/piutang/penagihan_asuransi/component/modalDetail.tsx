import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from "@heroui/react";
import { GoDash } from "react-icons/go";
import { FaRegFloppyDisk } from "react-icons/fa6";
import { formatCurrency } from "@/config/formatCurrency";

interface ModalTagihanProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  data: any;
  error: string | null;
}

export default function ModalTagihan({
  isOpen,
  onClose,
  isLoading,
  data,
  error
}: ModalTagihanProps) {
  // Calculate total asuransi
  const totalAsuransi = data?.tagihan?.detail_list?.reduce(
    (sum: number, item: any) => sum + parseFloat(item.asuransi ?? '0'), 
    0
  ) || 0;

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
              <TableColumn>No. Kwitansi</TableColumn>
              <TableColumn>Tanggal</TableColumn>
              <TableColumn>Nama Pasien</TableColumn>
              <TableColumn>NIK/Polis</TableColumn>
              <TableColumn>Nama Karyawan</TableColumn>
              <TableColumn>Pelayanan</TableColumn>
              <TableColumn>Diagnosa Kerja</TableColumn>
              <TableColumn className="text-right">Nilai</TableColumn>
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
                  <TableCell>{item.no_kwitansi}</TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.no_jaminan}</TableCell>
                  <TableCell>{item.nama_karyawan}</TableCell>
                  <TableCell>{item.nama_layanan}</TableCell>
                  <TableCell><GoDash /></TableCell>
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
                    {formatCurrency(totalAsuransi.toString())}
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
          >
            Buat Tagihan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}