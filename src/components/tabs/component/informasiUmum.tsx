import { formatWaktu } from "@/config/date";
import { mBerkasFormulir } from "@/data/mBerkasFormulir";
import { tInfoUmum } from "@/data/tInformasiUmum";
import { Button, Card, CardBody, CardHeader, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@heroui/react";
import { JSX, useMemo, useState } from "react";

import { HiOutlinePencil, HiOutlineEye, HiOutlineTrash } from "react-icons/hi2";
import { TbMoodSadSquint } from "react-icons/tb";

export default function InformasiUmum(){

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [variant, setVariant] = useState<null | string>(null);
    const [ selectForm, setSelectForm ] = useState<null | string>(null);

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(tInfoUmum.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return tInfoUmum.slice(start, end);
    }, [page, tInfoUmum]);

    const renderSelectedForm = () => {
        if (!selectForm) return null;

        // Mapping idForm ke komponen yang sesuai
        const formComponents: Record<string, JSX.Element> = {
            'formCoverMcu': <div>Form Hasil Tindakan ESWL</div>,
            'formCoverMcu2': <div>Form Hasil Tindakan ESWL</div>,
            'formCatatanSwl': <div>Form Hasil Tindakan ESWL</div>,
            'formHasilSwl': <div>Form Hasil Tindakan ESWL</div>,
            'formPelaksanaanSwl': <div>Form Pelaksanaan Keperawatan ESWL</div>,
            // ... tambahkan mapping untuk semua idForm yang ada
        };

        return formComponents[selectForm] || <div className="min-h-[80vh] flex items-center justify-center"><Chip endContent={<TbMoodSadSquint size={20} />} color="warning" className="animate animate-bounce"> Dokumen yang kamu cari ga ada</Chip></div>;
    };

    const handleOpenDrawer = () => {
        setVariant("drawer");
        onOpen();
    };

    const handleOpenModal = (variant: string) => {
        setVariant(variant);
        onOpen();
    };

    const handleClose = () => {
        setVariant(null);
        onClose();
    };

    const TambahData = () => {
        handleOpenModal('tambah_data')
    }

    const selectBerkas = ( idForm: string ) => {
        setSelectForm(idForm)
        handleClose()
    }

    return(
        <div>
            <Card fullWidth={true}>
                <CardHeader className="flex justify-between gap-1">
                    <span className="font-semibold text-lg">Buat Berkas</span>
                    <div className="flex gap-1">
                        <Button color="secondary">Preview</Button>
                        <Button color="primary">Simpan</Button>
                        <Button color="success" onPress={() => TambahData()}>Tambah Data</Button>
                    </div>
                </CardHeader>
                <CardBody className="lg:w-[84vw] xl:w-[89vw] min-h-[41.5vh]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                            <Table
                                removeWrapper
                                isStriped
                                isCompact
                                aria-label="Data Informasi Umum"
                            >
                                <TableHeader>
                                    <TableColumn className="bg-blue-500 text-white" >No</TableColumn>
                                    <TableColumn className="bg-blue-500 text-white" >Nama Formulir</TableColumn>
                                    <TableColumn className="bg-blue-500 text-white" >Tanggal</TableColumn>
                                    <TableColumn className="bg-blue-500 text-white" >Aksi</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {
                                        tInfoUmum.map((value, index) => (
                                            <TableRow>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{value.nama_berkas}</TableCell>
                                                <TableCell><Tooltip content={value.tanggal}>{formatWaktu(value.tanggal)}</Tooltip></TableCell>
                                                <TableCell className="flex flex-wrap gap-1">
                                                    
                                                    <Button isIconOnly color="secondary"><HiOutlineEye /></Button>
                                                    <Button isIconOnly color="danger"><HiOutlineTrash /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>

                            <div className="py-2 px-2 flex justify-between items-center">
                                <span className="text-small text-default-400">Data 1 dari 2</span>

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
                        </div>

                        <div className="lg:col-span-2">
                            {renderSelectedForm()}
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Modal backdrop="blur" isOpen={isOpen && variant === "tambah_data"} onOpenChange={handleClose} size="5xl" scrollBehavior={"inside"}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Berkas Formulir</ModalHeader>
                        <ModalBody>
                            <Table
                                removeWrapper
                                isHeaderSticky
                                maxTableHeight={500}
                                rowHeight={40}
                                aria-label="table berkas"
                            >
                                <TableHeader>
                                    <TableColumn className="bg-blue-500 text-white">Nama Formulir</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {
                                        mBerkasFormulir.map((group) => (
                                            <>
                                                <TableRow key={`header-${group.tipe}`}>
                                                    <TableCell className={`${group.tipe == '1' ? 'bg-blue-light-500' : group.tipe == '2' ? 'bg-green-500' : 'bg-pink-500'} font-semibold text-white rounded-md`}>{group.kategori}</TableCell>
                                                </TableRow>
                                                {group.items.map((item) => (
                                                    <TableRow key={item.idForm}>
                                                        <TableCell onClick={() => selectBerkas(item.idForm)} className="cursor-pointer">
                                                            {item.nama_berkas}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    )
}