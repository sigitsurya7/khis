import { dummyPasien } from "@/data/dummyListPasien";
import { mLayanan } from "@/data/layanan";
import { mDokter } from "@/data/mDokter";
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardFooter, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useState } from "react";

import { FaTimes } from "react-icons/fa";
import { CiBullhorn } from "react-icons/ci";

export default function ListDokterRajal(){
    const [namaLayanan, setnamaLayanan] = useState("");
    const [namaDokter, setnamaDokter] = useState("");

    return(
        <div className="flex flex-col gap-2 flex-wrap">
            <Card>
                <CardBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Autocomplete
                            className="col-span-2 md:col-span-1"
                            defaultItems={mLayanan}
                            label="Layanan"
                            placeholder="Pilih Layanan"
                            selectedKey={namaLayanan}
                            onSelectionChange={(key) => setnamaLayanan(key?.toString() || "")}
                        >
                            {(item) => <AutocompleteItem key={item.id}>{item.nama}</AutocompleteItem>}
                        </Autocomplete>

                        <Autocomplete
                            className="col-span-2 md:col-span-1"
                            defaultItems={mDokter}
                            label="Layanan"
                            placeholder="Pilih Layanan"
                            selectedKey={namaDokter}
                            onSelectionChange={(key) => setnamaDokter(key?.toString() || "")}
                        >
                            {(item) => <AutocompleteItem key={item.id}>{item.nama}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                </CardBody>
            </Card>

            <Card isFooterBlurred className="border-none" radius="lg">
                <CardBody>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <h3 className="text-xl font-semibold">Pasien yang sedang dilayani</h3>

                        <h3 className="text-xl font-semibold">&mdash;</h3>

                        <Button color="success">PANGGIL PASIEN</Button>
                    </div>
                </CardBody>
            </Card>

            <Table isVirtualized isHeaderSticky={true} maxTableHeight={600} >
                <TableHeader>
                    <TableColumn align="center">&nbsp;</TableColumn>
                    <TableColumn>Pasien</TableColumn>
                    <TableColumn>Jaminan</TableColumn>
                    <TableColumn>layanan</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>action</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        dummyPasien.map((value, index) => {

                            const getStatusAntrian = () => {
                                const isCheckin = parseInt(value.is_checkin?.toString() || "1");
                                const pelayananId = value.pelayanan_id;
                                const statusPemeriksaanAwal = parseInt(value.status_pemeriksaan_awal);
                                const statusLabRegister = parseInt(value.status_lab_register || "0");
                                const statusAntrian = parseInt(value.status_antrian);
                                const hold = parseInt(value.hold);
                                const statusRadRegister = parseInt(value.status_rad_register || "0");
                                const statusOk = parseInt(value.status_ok || "0");

                                if (isCheckin == 0 || !pelayananId) {
                                    return <Chip color="primary">Menunggu Kehadiran</Chip>;
                                } else if (statusPemeriksaanAwal == 0) {
                                    return <Chip color="secondary">Nurse Station</Chip>;
                                } else if ((statusPemeriksaanAwal == 1 || statusLabRegister == 2) && statusAntrian == 2) {
                                    return <Chip color="success">Sedang Dilayani</Chip>;
                                } else if (hold == 1) {
                                    if (statusLabRegister == 2 || statusRadRegister == 2 || statusOk == 2) {
                                        return <Chip>Penunjang Selesai, Menunggu Dipanggil</Chip>;
                                    } else {
                                        return <Chip color="danger">Pemeriksaan Penunjang</Chip>;
                                    }
                                } else {
                                    return <Chip color="success">Menunggu dipanggil</Chip>;
                                }
                            };

                            const renderButtons = () => {
                                const isCheckin = parseInt(value.is_checkin?.toString() || "1");
                                const pelayananId = value.pelayanan_id;
                                const hold = parseInt(value.hold);

                                if (isCheckin == 0 || !pelayananId) {
                                    return null;
                                }

                                if (hold === 1) {
                                    return (
                                        <Button 
                                            color="warning"
                                            aria-label="batal"
                                            isIconOnly
                                        >
                                            <FaTimes />
                                        </Button>
                                    );
                                }

                                return (
                                    <div className="flex gap-2">
                                        <Button 
                                            color="primary"
                                            aria-label="panggil"
                                            isIconOnly
                                        >
                                            <CiBullhorn />
                                        </Button>

                                        <Button 
                                            color="warning"
                                            aria-label="batal"
                                            isIconOnly
                                        >
                                            <FaTimes />
                                        </Button>
                                    </div>
                                );
                            };

                            return(
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            {value.pasien}
                                            <Chip color="primary">{value.no_rm} || {value.no_register} || {value.no_antrian}</Chip>
                                        </div>
                                    </TableCell>
                                    <TableCell>{value.cara_bayar}</TableCell>
                                    <TableCell>{value.layanan}</TableCell>
                                    <TableCell>{getStatusAntrian()}</TableCell>
                                    <TableCell>{renderButtons()}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}