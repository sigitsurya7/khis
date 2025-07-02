import { formatCurrency } from "@/config/formatCurrency";
import { Button, Chip, DatePicker, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NumberInput, Pagination, ScrollShadow, Select, SelectItem, SelectSection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, useDisclosure } from "@heroui/react";
import { HiOutlinePrinter, HiOutlineSpeakerWave, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { HiOutlineSave } from "react-icons/hi";
import { FiMoreVertical } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { GoDash } from "react-icons/go";
import { CalendarDate, DateValue, getLocalTimeZone, now, parseDate, parseDateTime, parseZonedDateTime, today, ZonedDateTime } from "@internationalized/date";
import { FollowUpItem, FollowUpResponse, getFollowUp } from "@/services/asuransi";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";

export function RenderNomorTagihan({ row }: any){
    return(
        <Button variant="light" radius="full" size="sm" color="primary">{row.no_tagihan}</Button>
    )
}

export function RenderLayanan({ row }: any){
    var jenisLayanan = '';
    if(parseInt(row.jenis_layanan) == 1){
        jenisLayanan = "Rawat Jalan";
    }else if(parseInt(row.jenis_layanan) == 3){
        jenisLayanan = "Rawat Inap";
    }else if(parseInt(row.jenis_layanan) == 50){
        jenisLayanan = "Rawat Inap";
    }else{
        jenisLayanan = "Rawat Jalan";
    }

    let hasil_grouper = '';
    if (parseFloat(row.hasil_grouper || 0) !== 0) {
        let grouper = formatCurrency(row.hasil_grouper);
        hasil_grouper = grouper;
    }

    return (
        <div className="flex flex-col">
            {jenisLayanan}
            {
                row.jenis_cob ? <Chip color="primary" size="sm" className="uppercase">{row.jenis_cob.replace('_', ' ')}</Chip> : ""
            }
            {hasil_grouper}
        </div>
    )
}

export function RenderTagihan({row}: any){
    let jmlKoreksi = parseFloat(row.jumlah_koreksi);
    return(
        <div className="flex flex-col">
            {formatCurrency(row.total_tagihan)}
            {
                jmlKoreksi > 0 ? <div> Koreksi: <br /> <Chip size="sm" color="primary">{formatCurrency(jmlKoreksi)}</Chip> </div> : ""
            }
        </div>
    )
}

export function RenderDiskon({row}: any){
    let jmlKoreksi = parseFloat(row.total_tagihan) * (parseFloat(row.discount) / 100);
    return formatCurrency(jmlKoreksi)
}

export function RenderAfterDiskon({row}: any){
    let jmlKoreksi = parseFloat(row.total_tagihan) * (parseFloat(row.discount) / 100);
    let sJmlDiskon = parseFloat(row.total_tagihan) - jmlKoreksi
    return formatCurrency(sJmlDiskon.toFixed(2))
}

interface AgingResult {
  umurPiutang: number | null;       // Usia piutang sejak tgl kirim (hari)
  status: string | null;            // Status jatuh tempo
  hariKeterlambatan: number | null; // Hari keterlambatan (0 jika belum jatuh tempo)
  selisihJatuhTempo: number | null; // Sisa hari menuju jatuh tempo (nilai negatif jika sudah lewat)
}

export function hitungAgingPiutang(
  tgl_kirim: string | null,
  tgl_jatuh_tempo: string | null
): AgingResult {

  if (tgl_kirim === null || tgl_jatuh_tempo === null) {
    return {
      umurPiutang: null,
      status: null,
      hariKeterlambatan: null,
      selisihJatuhTempo: null
    };
  }

  // Parse tanggal dengan error handling
  const parseDate = (dateStr: string): Date | null => {
    try {
      const date = new Date(dateStr.split(' ')[0]);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  const kirimDate = parseDate(tgl_kirim);
  const tempoDate = parseDate(tgl_jatuh_tempo);
  const today = new Date();

  // Handle parsing error
  if (!kirimDate || !tempoDate) {
    return {
      umurPiutang: null,
      status: null,
      hariKeterlambatan: null,
      selisihJatuhTempo: null
    };
  }

  // Normalisasi waktu ke 00:00:00
  const normalizeDate = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  normalizeDate(kirimDate);
  normalizeDate(tempoDate);
  normalizeDate(today);

  // Konstanta perhitungan
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Perhitungan dasar
  const umurPiutang = Math.floor((today.getTime() - kirimDate.getTime()) / MS_PER_DAY);
  const selisihJatuhTempo = Math.floor((tempoDate.getTime() - today.getTime()) / MS_PER_DAY);
  const hariKeterlambatan = Math.max(0, -selisihJatuhTempo);

  // Tentukan status
  let status: string;
  if (selisihJatuhTempo > 0) {
    status = 'Belum Jatuh Tempo';
  } else if (selisihJatuhTempo === 0) {
    status = 'Hari Ini Jatuh Tempo';
  } else {
    status = 'Lewat Jatuh Tempo';
  }

  return {
    umurPiutang,
    status,
    hariKeterlambatan,
    selisihJatuhTempo
  };
}

export function RenderAgingPiutang({ item, isSisa }: { item: any, isSisa?: boolean }){
    const result = hitungAgingPiutang(item.tgl_kirim, item.tgl_jatuh_tempo);
    if(isSisa){
        if(item.tgl_jatuh_tempo && result.hariKeterlambatan != null){
            return <Chip size="sm" color={result.hariKeterlambatan > 0 ? "danger" : "warning"}>{moment(item.tgl_jatuh_tempo).format('DD-MM-YYYY')}</Chip>
        }else{
            return <GoDash />
        }
    }else{
        return result.hariKeterlambatan ?? <GoDash />
    }
}

export function AddTanggalKirim({ data }: any){
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [ loading, setLoading ] = useState(false)

    return(
        <>
            {
                data.tgl_kirim ?    
                    <div className="flex flex-col">
                        <span className="text-nowrap">{moment(data.tgl_kirim).format('DD-MM-YYYY')}</span>
                        <br />
                        <span className="p-1 cursor-pointer bg-green-500 dark:bg-green-800 rounded-full w-max text-wrap" onClick={onOpen}>{data.resi ?? <GoDash />}</span>
                    </div>
                : <Button size="sm" color="primary" onPress={onOpen}>Buat Tgl. Kirim</Button>
            }
            <ModalAddTanggalKirim
                isOpen={isOpen}
                onClose={onClose}
                isLoading={loading}
                data={data}
                onOpenChange={onOpenChange}
            />
        </>
    )
}

interface ModalAddTanggalKirim {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  isLoading: boolean;
  data: any;
}

function ModalAddTanggalKirim(
{
    isOpen,
    onClose,
    isLoading,
    onOpenChange,
    data
}: ModalAddTanggalKirim){
    const [ tglKirim, setTglKirim ] = useState<DateValue | null>(data.tgl_kirim ? parseDate(data.tgl_kirim.split(' ')[0]) : today(getLocalTimeZone()))
    const [ tglJatuhTempo, setJatuhTempo ] = useState<DateValue | null>(data.tgl_jatuh_tempo ? parseDate(data.tgl_jatuh_tempo.split(' ')[0]) : 
        today(getLocalTimeZone()).add({ days: 30 }))

    useEffect(() => {
        const newJatuhTempo = tglKirim?.add({ days: 30 });
        setJatuhTempo(newJatuhTempo || null);
    }, [tglKirim]);

    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <>
                    <ModalHeader>Buat Tanggal Kirim</ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-1 gap-2">
                            <Input name="resi" label="Nomor Resi" defaultValue={data.resi ?? ""} placeholder="Masukan Nomor Resi" isRequired />
                            <DatePicker label="Tanggal Kirim" value={tglKirim} onChange={setTglKirim} isRequired />
                            <DatePicker label="Tanggal Jatuh Tempo" value={tglJatuhTempo} onChange={setJatuhTempo} isRequired />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onPress={onClose}>Batal</Button>
                        <Button color="primary" isLoading={isLoading}>Kirim</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

export function RenderAction({ row }: any){
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [variant, setVariant] = useState<null | string>(null);
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setVariant(null);
        onClose();
    };

    const handleOpenModal = (variant: string) => {
        setVariant(variant);
        onOpen();
    };

    return(
        <>
            <Dropdown
                showArrow
                backdrop="opaque"
            >
                <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light"><FiMoreVertical /></Button>
                </DropdownTrigger>
                <DropdownMenu aria-label={`Dropdown Menu ${row.no_tagihan}`} variant="faded">
                    <DropdownSection title="Actions">
                        <DropdownItem
                            key="Follow Up"
                            description={`Follow Up Ke ${row.perusahaan}`}
                            startContent={<HiOutlineSpeakerWave className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
                            onPress={() => handleOpenModal('follow_up')}
                        >
                                Follow Up
                        </DropdownItem>
                        <DropdownItem
                            key="Koreksi"
                            description={`Koreksi ${row.no_tagihan}`}
                            startContent={<HiOutlinePencilSquare className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
                            onPress={() => handleOpenModal('koreksi')}
                        >
                                Koreksi
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownSection title="Print">
                        <DropdownItem
                            key="Kwitansi"
                            description={`Cetak Kwitansi`}
                            startContent={<HiOutlinePrinter className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
                        >
                                Kwitansi
                        </DropdownItem>
                        <DropdownItem
                            key="Kwitansi COB"
                            description={`Cetak Kwitansi COB`}
                            startContent={<HiOutlinePrinter className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
                        >
                                Kwitansi COB
                        </DropdownItem>
                        <DropdownItem
                            key="Rekap"
                            description={`Cetak Rekap`}
                            startContent={<HiOutlinePrinter className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
                        >
                                Rekap
                        </DropdownItem>
                        <DropdownItem
                            key="Tanda Terima"
                            description={`Cetak Tanda Terima`}
                            startContent={<HiOutlinePrinter className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
                        >
                                Tanda Terima
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>

            <ModalFollowUp
                isOpen={isOpen}
                onClose={onClose}
                handleClose={handleClose}
                row={row}
                variant={variant}
                onOpenChange={onOpenChange}
            />

            <Modal backdrop="blur" isOpen={isOpen && variant === "koreksi"} size="3xl" onOpenChange={handleClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Koreksi Tagihan</ModalHeader>
                            <ModalBody className="flex flex-col gap-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <span>Tgl. Tagihan</span>
                                        <span className="font-semibold">{moment(row.tanggal).format('DD-MM-YYYY')}</span>

                                        <span>No. Tagihan</span>
                                        <span className="font-semibold">{row.no_tagihan}</span>

                                        <span>Nama Penjamin</span>
                                        <span className="font-semibold">{row.cara_bayar}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                        <span>Tgl. Kirim</span>
                                        <span className="font-semibold">{row.tgl_kirim ? moment(row.tgl_kirim).format('DD-MM-YYYY') : <GoDash />}</span>

                                        <span>Tgl. Jatuh Tempo</span>
                                        <span className="font-semibold">{row.tgl_jatuh_tempo ? moment(row.tgl_jatuh_tempo).format('DD-MM-YYYY') : <GoDash />}</span>

                                        <span>Nama Instansi</span>
                                        <span className="font-semibold">{row.perusahaan}</span>
                                    </div>
                                </div>

                                <Divider className="my-4" />

                                <div className="grid grid-cols-4 gap-2">
                                    <span>Total Tagihan</span>
                                    <span className="font-semibold">{formatCurrency(row.total_tagihan)}</span>

                                    <span>Sisa Tagihan</span>
                                    <span className="font-semibold">{formatCurrency(row.sisa_tagihan)}</span>

                                    <NumberInput
                                        label="Koreksi"
                                        placeholder="Masukan nilai koreksi"
                                        className="col-span-2"
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">Rp. </span>
                                            </div>
                                        }
                                    />

                                    <Textarea label="Alasan" placeholder="Masukan alasan koreksi" className="col-span-2" />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={handleClose}>Batal</Button>
                                <Button color="primary">Kirim</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

interface ModalRenderAction {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  handleClose: () => void;
  variant?: string | null;
  row: any;
}

interface KaryawanList {
    id: any;
	username: string;
	pegawai_id: any;
	nama: string;
	unit_kerja_id: any;
	unit_kerja_nama: string;
}

export default function ModalFollowUp({
  isOpen,
  onClose,
  onOpenChange,
  variant,
  handleClose,
  row,
}: ModalRenderAction) {
    const [followUpList, setFollowUpList] = useState<FollowUpItem[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [error, setError] = useState(false);
    const [disab, setDisab] = useState(false);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [karyawanList, setKaryawanList] = useState<KaryawanList[]>([])
    const rowsPerPage = 10;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const pages = useMemo(() => {
        return Math.ceil(totalData / rowsPerPage) || 1;
    }, [totalData]);

    useEffect(() => {
        if (isOpen) {
            getData();
            getLocalTimeZone()
            getKaryawan()
        }
    }, [isOpen, page, row]);

    const getData = async () => {
        setLoading(true);
        setError(false);
        try {
            const response: FollowUpResponse = await getFollowUp({
                id: row.id,
                page,
                limit: rowsPerPage,
            });

            const list = response?.data ?? [];
            setFollowUpList(list.length > 0 ? list : [{ 
                tanggal: "",
                follow_up_by: "",
                tagihan_piutang_id: row.id,
                hasil_follow_up: "",
                pic_perusahaan: "",
            }]);
            if(list.length == 0){
                setDisab(true)
            }else{
                setDisab(false)
            }
            setTotalData(response?.total || 0);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getKaryawan = async () => {
        try {
            const response = await api.get('master/karyawan/list')
            setKaryawanList(response.data.karyawan_list)
        } catch (error) {
            console.error(error)
        }
    }

    type EditableFollowUpKeys = 'tanggal' | 'follow_up_by' | 'hasil_follow_up' | 'pic_perusahaan';

    const handleChange = (
        index: number,
        key: EditableFollowUpKeys,
        value: string
    ) => {
        const updated = [...followUpList];
        updated[index] = {
            ...updated[index],
            [key]: value,
        };
        setFollowUpList(updated);
    };

    const handleDateChange = (
        index: number,
        key: EditableFollowUpKeys,
        value: ZonedDateTime | null
    ) => {
    const updated = [...followUpList];
        if(value){
            const isoString = value.toString();
            const formattedDate = isoString
                .replace("T", " ")
                .split("[")[0];

            updated[index] = {
                ...updated[index],
                [key]: formattedDate,
            };

            setFollowUpList(updated);
        }else{
            return;
        }
    };

    const tambahFollowUp = () => {
        setFollowUpList([
            ...followUpList,
            { tanggal: "", follow_up_by: "", hasil_follow_up: "", tagihan_piutang_id: row.id, pic_perusahaan: ""  },
        ]);
        setEditIndex(followUpList.length);
        setDisab(true)
    };

    const simpanBaris = async () => {
        setLoading(true)
        try {
            if(editIndex != null){
                console.log(followUpList[editIndex])
            }
        } catch (error) {
            console.log(error)
        }finally{
            
            setTimeout(() => {
                setEditIndex(null);
                setDisab(false)
                getData()
            }, 5000)
        }
    };

    return (
        <Modal
            isOpen={isOpen && variant === "follow_up"}
            backdrop="blur"
            size="5xl"
            onOpenChange={handleClose}
        >
            <ModalContent>
                <ModalHeader>Buat Follow up</ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                    {/* Info tagihan */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid grid-cols-2 gap-2">
                        <span>Tgl. Tagihan</span>
                        <span className="font-semibold">{moment(row.tanggal).format("DD-MM-YYYY")}</span>
                        <span>No. Tagihan</span>
                        <span className="font-semibold">{row.no_tagihan}</span>
                        <span>Nama Instansi</span>
                        <span className="font-semibold">{row.perusahaan}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                        <span>Tgl. Kirim</span>
                        <span className="font-semibold">
                            {row.tgl_kirim ? moment(row.tgl_kirim).format("DD-MM-YYYY") : <GoDash />}
                        </span>
                        <span>Tgl. Jatuh Tempo</span>
                        <span className="font-semibold">
                            {row.tgl_jatuh_tempo ? moment(row.tgl_jatuh_tempo).format("DD-MM-YYYY") : <GoDash />}
                        </span>
                        <span>Total Tagihan</span>
                        <span className="font-semibold">{formatCurrency(row.total_tagihan)}</span>
                        </div>
                    </div>

                    {/* Table follow-up */}
                    <ScrollShadow>
                        <Table
                            aria-label="Tabel Follow Up"
                            removeWrapper
                            isCompact
                            bottomContent={
                            <div className="flex justify-start mt-2">
                                <Button color="primary" size="sm" isDisabled={disab} onPress={tambahFollowUp}>
                                    Tambah
                                </Button>
                            </div>
                            }
                        >
                            <TableHeader>
                                <TableColumn className="bg-[#0272ef] text-white">Tanggal</TableColumn>
                                <TableColumn className="bg-[#0272ef] text-white">Follow Up By</TableColumn>
                                <TableColumn className="bg-[#0272ef] text-white">Hasil Follow Up</TableColumn>
                                <TableColumn className="bg-[#0272ef] text-white">PIC Perusahaan</TableColumn>
                                <TableColumn className="bg-[#0272ef] text-white">&nbsp;</TableColumn>
                            </TableHeader>
                            <TableBody
                                emptyContent={loading ? "Memuat data..." : error ? "Gagal memuat data" : "Belum ada data"}
                                isLoading={loading}
                            >
                            {followUpList.length === 1 && followUpList[0].tanggal === "" ? (
                                // Baris input otomatis kalau data kosong
                                <TableRow key="initial-input">
                                    <TableCell>
                                        <DatePicker
                                            hideTimeZone
                                            showMonthAndYearPickers
                                            value={now(getLocalTimeZone())}
                                            label="Tanggal Follow Up"
                                            variant="bordered"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            label="Karyawan"
                                            variant="bordered"
                                            placeholder="Pilih Karyawan"
                                        >
                                            {
                                                karyawanList ?
                                                    karyawanList.map((value, index) => (
                                                        <SelectItem key={value.username}>{value.nama}</SelectItem>
                                                    ))
                                                : <SelectItem key="null">Tidak Ada</SelectItem>
                                            }
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Textarea
                                            value={followUpList[0].hasil_follow_up}
                                            label="Hasil Follow Up"
                                            variant="bordered"
                                            onChange={(e) => handleChange(0, "hasil_follow_up", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            variant="bordered"
                                            value={followUpList[0].pic_perusahaan}
                                            label="PIC Perusahaan"
                                            onChange={(e) => handleChange(0, "pic_perusahaan", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                    <Button isIconOnly size="sm" variant="light" onPress={simpanBaris}>
                                        <HiOutlineSave />
                                    </Button>
                                    </TableCell>
                                </TableRow>
                                ) : (
                                followUpList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {editIndex === index ? (
                                                <DatePicker
                                                    hideTimeZone
                                                    showMonthAndYearPickers
                                                    value={ item.tanggal ? parseZonedDateTime(`${item.tanggal.replace(' ', 'T')}[${userTimeZone}]`) : now(getLocalTimeZone())}
                                                    onChange={(value) => handleDateChange(index, "tanggal", value)}
                                                    label="Tanggal Follow Up"
                                                    variant="bordered"
                                                />
                                            ) : item.tanggal}
                                        </TableCell>
                                        <TableCell>
                                            {editIndex === index ? (
                                                <Select
                                                    label="Karyawan"
                                                    variant="bordered"
                                                    placeholder="Pilih Karyawan"
                                                >
                                                    {
                                                        karyawanList ?
                                                            karyawanList.map((value, index) => (
                                                                <SelectItem key={value.username}>{value.nama}</SelectItem>
                                                            ))
                                                        : <SelectItem key="null">Tidak Ada</SelectItem>
                                                    }
                                                </Select>
                                            ) : item.follow_up_by}
                                        </TableCell>
                                        <TableCell>
                                            {editIndex === index ? (
                                                <Textarea
                                                    value={followUpList[0].hasil_follow_up}
                                                    label="Hasil Follow Up"
                                                    variant="bordered"
                                                    onChange={(e) => handleChange(index, "hasil_follow_up", e.target.value)}
                                                />
                                            ) : item.hasil_follow_up}
                                        </TableCell>
                                        <TableCell>
                                            {editIndex === index ? (
                                            <Input
                                                variant="bordered"
                                                value={item.pic_perusahaan}
                                                label="PIC Perusahaan"
                                                onChange={(e) => handleChange(index, "pic_perusahaan", e.target.value)}
                                            />
                                            ) : item.pic_perusahaan}
                                        </TableCell>
                                        <TableCell>
                                            {editIndex === index ? (
                                                <Button isIconOnly size="sm" variant="light" onPress={simpanBaris}>
                                                    <HiOutlineSave />
                                                </Button>
                                            ) : (
                                                <div className="flex flex-wrap gap-2">
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                        onPress={() => setEditIndex(index)}
                                                    >
                                                        <HiOutlinePencilSquare />
                                                    </Button>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        color="danger"
                                                        variant="light"
                                                        onPress={() => setEditIndex(index)}
                                                    >
                                                        <HiOutlineTrash />
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )))}
                            </TableBody>
                        </Table>
                    </ScrollShadow>

                    {/* Pagination */}
                    {totalData > rowsPerPage && (
                        <div className="flex w-full justify-between items-center mt-4">
                        <div className="text-sm text-gray-500">
                            Menampilkan {(page - 1) * rowsPerPage + 1} -{" "}
                            {Math.min(page * rowsPerPage, totalData)} dari {totalData} data
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
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onPress={handleClose}>
                        Selesai
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}