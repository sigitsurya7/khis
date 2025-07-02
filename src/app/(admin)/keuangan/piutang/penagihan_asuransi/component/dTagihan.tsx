import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Select, SelectItem, Autocomplete, AutocompleteItem, Pagination, Button, Tooltip, ScrollShadow, CardFooter, Chip, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/react";
import { RiFileExcel2Line } from "react-icons/ri";
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPerusahaan, MasterPerusahaanResponse } from "@/services/masterPerusahaan";
import { DaftarTagihanResponse, loadDaftarTagihan } from "@/services/asuransi";
import { formatCurrency } from "@/config/formatCurrency";
import { AddTanggalKirim, hitungAgingPiutang, RenderAction, RenderAfterDiskon, RenderAgingPiutang, RenderDiskon, RenderLayanan, RenderNomorTagihan, RenderTagihan } from "./tagihanComp";
import moment from 'moment';
import { GoDash, GoSearch } from "react-icons/go";
import { KTableColumn } from "@/types/kTables";
import KTable from "@/components/ktable/MainTable";
import api from "@/lib/api";

interface DaftarTagihan {
    perusahaan: string;
    sisa_tagihan: string;
    tgl_jatuh_tempo: string;
    follow_up_username: string;
    koreksi_username: string;
    tgl_kirim: string;
    no_tagihan: string;
    jenis_layanan: string;
    jumlah_koreksi: string;
    total_tagihan: string;
    tanggal: string;
    discount: string;
    action: string;
}

export default function DaftarPenATagihan(){
    const tableRef = useRef<any>(null);
    
    const [jenisJaminan, setJenisJaminan] = useState<string>("4");
    const [jenisLayanan, setJenisLayanan] = useState<string>("");
    const [namaPenjamin, setNamaPenjamin] = useState<string>("");
    const [perusahaan, setPerusahaan] = useState<MasterPerusahaanResponse | null >(null);

    const getMasterPerusahaan = async () => {
        try {
            const result = await getPerusahaan()
            setPerusahaan(result)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMasterPerusahaan()
    }, [])

    const columns: KTableColumn<DaftarTagihan>[] = [
        {
            id: "1",
            title: "Nomor Tagihan",
            field: "no_tagihan",
            render: (item) => <RenderNomorTagihan row={item} />,
        },
        {
            id: "2",
            title: "Perusahaan",
            field: "perusahaan",
            render: (item) => (
                item.perusahaan
            ),
        },
        {
            id: "3",
            title: "Jenis Layanan",
            field: "jenis_layanan",
            render: (item) => <RenderLayanan row={item} />,
        },
        {
            id: "4",
            title: "Total Tagihan",
            field: "total_tagihan",
            render: (item) => <RenderTagihan row={item} />,
        },
        {
            id: "5",
            title: "Diskon",
            field: "discount",
            render: (item) => <RenderDiskon row={item} />,
        },
        {
            id: "6",
            title: "Total Setelah Di Diskon",
            field: "jumlah_koreksi",
            render: (item) => <RenderAfterDiskon row={item} />,
        },
        {
            id: "7",
            title: "Sisa Tagihan",
            field: "sisa_tagihan",
            render: (item) => (
                formatCurrency(item.sisa_tagihan)
            ),
        },
        {
            id: "8",
            title: "Tgl. Diterima",
            field: "tanggal",
            render: (item) => <AddTanggalKirim data={item} />,
        },
        {
            id: "9",
            title: "Tgl. Jatuh Tempo",
            field: "tgl_jatuh_tempo",
            render: (item) => <RenderAgingPiutang item={item} isSisa />
        },
        {
            id: "10",
            title: "Umur",
            field: "tgl_jatuh_tempo",
            render: (item) => <RenderAgingPiutang item={item} />
        },
        {
            id: "11",
            title: "Follow Up By",
            field: "follow_up_username",
            render: (item) => (
                item.follow_up_username
            )
        },
        {
            id: "12",
            title: "Koreksi By",
            field: "koreksi_username",
            render: (item) => (
                item.koreksi_username
            )
        },
        {
            id: "13",
            title: "Action",
            field: "action",
            render: (item) => <RenderAction row={item} />
        },
    ]

    return(
        <React.Fragment>
            <div className="flex flex-col gap-4 flex-wrap">
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
                                    <SelectItem key="0">-- Pilih Jaminan --</SelectItem>
                                    <SelectItem key={"4"}>Asuransi</SelectItem>
                                    <SelectItem key={"5"}>Perusahaan</SelectItem>
                                </Select>

                                <Select
                                    label="Jenis Layanan" placeholder="Pilih Layanan"
                                    selectedKeys={jenisLayanan ? [jenisLayanan] : []}
                                    onSelectionChange={(keys) => setJenisLayanan(Array.from(keys)[0]?.toString() || "")}
                                >
                                    <SelectItem key="0">-- Pilh Layanan --</SelectItem>
                                    <SelectItem key="1">Rawat Jalan</SelectItem>
                                    <SelectItem key="2">Rawat Inap</SelectItem>
                                </Select>

                                <Autocomplete
                                    className="col-span-2 md:col-span-1"
                                    defaultItems={perusahaan?.data || []}
                                    label="Nama Penjamin"
                                    placeholder="Pilih Perusahaan"
                                    selectedKey={namaPenjamin}
                                    onSelectionChange={(key) => setNamaPenjamin(key?.toString() || "")}
                                    multiple={true}
                                >
                                    {(item) => <AutocompleteItem key={item.id}>{item.nama}</AutocompleteItem>}
                                </Autocomplete>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <KTable<DaftarTagihan>
                    ref={tableRef}
                    ariaLabel="Daftar Penagihan Asuransi Table"
                    header={columns}
                    fetchData={async ({ page, limit, search, }) => {
                        const res = await api.get("/asuransi/daftar_tagihan", {
                            params: {
                                page, limit, search,
                                cara_bayar_id: jenisJaminan != "" ? jenisJaminan : "0",
                                perusahaan_id: namaPenjamin != "" ? namaPenjamin : "0",
                                jenis_layanan: jenisLayanan != "" ? jenisLayanan : "0",
                            },
                        });
                        return {
                            data: res.data.data,
                            total: res.data.total,
                        };
                    }}
                />
            </div>

        </React.Fragment>
    )
}