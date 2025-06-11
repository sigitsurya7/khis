import { 
    Card,
    CardBody,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
} from "@heroui/react";
import { useMemo, useState } from "react";

export const users = [
  {
    key: "1",
    tanggal: "2025-05-28 11:43:21",
    no_register: "IRJ.250528.011",
    layanan: "Poli Umum",
    dokter: "dr. Ilke Karkan",
    diagnosa: "Sakit perut Aja",
    planning: "-",
  }
]

export default function InformasiPasien(){

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const rowsPerPage = 4;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);
    
    return(
        <Card fullWidth={true} className="border-none bg-background/60 dark:bg-default-100/50">
            <CardBody className="grid grid-cols-1 lg:w-[84vw] xl:w-[89.5vw]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="grid gap-1 p-2">
                        <span className="underline font-semibold"> Data Pasien</span>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>No. RM</h3>
                            <h3 className="font-semibold">00000398</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Nama</h3>
                            <h3 className="font-semibold">TN ATDHI CAHYANTO</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Jenis Kelamin</h3>
                            <h3 className="font-semibold">Laki-laki</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Tanggal Lahir</h3>
                            <h3 className="font-semibold">13/11/2002</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Alamat</h3>
                            <h3 className="font-semibold">KP PAGADEN RT 003/002</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Umur</h3>
                            <h3 className="font-semibold">22 Tahun 6 Bulan 23 Hari</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>No. Telepon</h3>
                            <h3 className="font-semibold">082118431823</h3>
                        </div>
                    </div>
                    <div className="grid gap-1 p-2">
                        <span className="underline font-semibold"> Data Registrasi Saat Ini</span>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>NIK</h3>
                            <h3 className="font-semibold">00000398</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>No. Register</h3>
                            <h3 className="font-semibold">IRN.250311.001</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Tanggal</h3>
                            <h3 className="font-semibold">11-03-2025 15:48</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Jaminan</h3>
                            <h3 className="font-semibold">Umum</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Layanan</h3>
                            <h3 className="font-semibold">Poli Umum</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <h3>Dokter</h3>
                            <h3 className="font-semibold">AKBAR, Dr. Sp.U</h3>
                        </div>
                    </div>
                </div>

                <span className="font-semibold">Riwayat Pengobatan Sebelumnya</span>

                <Table
                    aria-label="Example table with client side pagination"
                    shadow={'none'}
                    bottomContent={
                        <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                        </div>
                    }
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                    >
                    <TableHeader>
                        <TableColumn key="tanggal">Tanggal</TableColumn>
                        <TableColumn key="layanan">Layanan</TableColumn>
                        <TableColumn key="diagnosa">Diagnosa</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    )

}