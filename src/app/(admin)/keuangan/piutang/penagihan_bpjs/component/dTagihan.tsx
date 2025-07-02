"use client";

import KTable from "@/components/ktable/MainTable";
import { formatCurrency } from "@/config/formatCurrency";
import { BulanIndo } from "@/data/bulan";
import api from "@/lib/api";
import { KTableColumn } from "@/types/kTables";
import { Button, Card, CardBody, Select, SelectItem, useDisclosure } from "@heroui/react";
import React, { useRef, useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import ModalTagihan from "../../penagihan_asuransi/component/modalDetail";
import { DetailPiutang, loadDetailPenagihan } from "@/services/asuransi";
import { HiOutlinePencilSquare } from "react-icons/hi2";

interface PiutangRajal {
  uuid: string;
  nama_perusahaan: string;
  periode: string;
  jurusan_name: string;
  periode_tanggal_dari: string;
  periode_tanggal_sampai: string;
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

export default function Page() {
  return(
    <>
      Katanya sih penagihan bpjs []
    </>
  )
}
