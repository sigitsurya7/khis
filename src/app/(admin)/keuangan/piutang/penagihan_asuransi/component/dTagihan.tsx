import { Perusahaan } from "@/data/perusahaan";
import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Select, SelectItem, Autocomplete, AutocompleteItem, Pagination, Button, Tooltip, ScrollShadow, CardFooter } from "@heroui/react";
import { HiOutlinePrinter, HiOutlineSpeakerWave, HiOutlinePencilSquare } from "react-icons/hi2";
import { RiFileExcel2Line } from "react-icons/ri";
import React, { useEffect, useMemo, useState } from "react";

export default function DaftarPenATagihan(){
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;
    const [jenisJaminan, setJenisJaminan] = useState("asuransi");
    const [jenisLayanan, setJenisLayanan] = useState("");
    const [namaPenjamin, setNamaPenjamin] = useState("");

    const pages = Math.ceil(Perusahaan.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return Perusahaan.slice(start, end);
    }, [page, Perusahaan]);

    useEffect(() => {
        console.log(jenisJaminan, jenisLayanan, namaPenjamin)
    }, [jenisJaminan, jenisLayanan, namaPenjamin])

    return(
       <div className="flex flex-col gap-4">
            <Card>
                <CardBody>
                    <div className="flex flex-col flex-wrap gap-4">
                        <div className="flex justify-between items-center flex-wrap">
                            <h1 className="font-semibold ml-2">Daftar Tagihan</h1>
                            <Button color="success" startContent={<RiFileExcel2Line />}>Export Excel</Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4">
                            <Select
                                label="Jenis Jaminan"
                                defaultSelectedKeys={[jenisJaminan]}
                                onSelectionChange={(keys) => setJenisJaminan(Array.from(keys)[0]?.toString() || "")}
                            >
                                <SelectItem key={"asuransi"}>Asuransi</SelectItem>
                                <SelectItem key={"perusahaan"}>Perusahaan</SelectItem>
                            </Select>

                            <Select
                                label="Jenis Layanan" placeholder="Pilih Layanan"
                                selectedKeys={jenisLayanan ? [jenisLayanan] : []}
                                onSelectionChange={(keys) => setJenisLayanan(Array.from(keys)[0]?.toString() || "")}
                            >
                                <SelectItem key="rawat_jalan">Rawat Jalan</SelectItem>
                                <SelectItem key="rawat_inap">Rawat Inap</SelectItem>
                            </Select>

                            <Autocomplete
                                className="col-span-2 md:col-span-1"
                                defaultItems={Perusahaan}
                                label="Nama Penjamin"
                                placeholder="Pilih Perusahaan"
                                selectedKey={namaPenjamin}
                                onSelectionChange={(key) => setNamaPenjamin(key?.toString() || "")}
                            >
                                {(item) => <AutocompleteItem key={item.id}>{item.nama}</AutocompleteItem>}
                            </Autocomplete>
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
                        shadow="none"
                    >
                        <TableHeader>
                            <TableColumn>No. Tagihan</TableColumn>
                            <TableColumn>Penjamin</TableColumn>
                            <TableColumn>Jenis Layanan</TableColumn>
                            <TableColumn>Total Tagihan</TableColumn>
                            <TableColumn>Diskon</TableColumn>
                            <TableColumn>Total Setelah Di Diskon</TableColumn>
                            <TableColumn>Sisa Tagihan</TableColumn>
                            <TableColumn>Tgl. Diterima</TableColumn>
                            <TableColumn>Tgl. Jatuh Tempo</TableColumn>
                            <TableColumn>Umur</TableColumn>
                            <TableColumn>Follow Up By</TableColumn>
                            <TableColumn>Koreksi By</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>Tony Reichert</TableCell>
                                <TableCell>CEO</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell className="flex gap-2 flex-wrap">
                                    <Tooltip className="capitalize" color={"primary"} content={"Follow Up"}>
                                        <Button isIconOnly color="primary"><HiOutlineSpeakerWave /></Button>
                                    </Tooltip>
                                    <Tooltip className="capitalize" color={"secondary"} content={"Koreksi"}>
                                        <Button isIconOnly color="secondary"><HiOutlinePencilSquare /></Button>
                                    </Tooltip>
                                    <Tooltip className="capitalize" color={"success"} content={"Print"}>
                                        <Button isIconOnly color="success"><HiOutlinePrinter /></Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardBody>
                <CardFooter>
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
                </CardFooter>
            </Card>
       </div>
    )
}