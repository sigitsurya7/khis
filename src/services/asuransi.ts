import api from "@/lib/api";

interface LoadPiutangParams {
  cara_bayar_id: string;
  bulan: string;
  tahun: string;
  page?: number;
  limit?: number;
}

export interface PiutangResponse {
  action: string;
  data: any[] | null;
  limit: number;
  page: number;
  total: number;
}

export interface LoadDetailPiutangParams {
  id: string;
  cara_bayar_id: string;
  jenis_cara_bayar: string;
  perusahaan_id: string;
  jenis_layanan: string;
  jenis_piutang: string;
  tanggal_dari: string;
  tanggal_sampai: string;
  bundel_uid?: string;
  periode_id: string;
  tab_active: string;
  kasir_ids: string;
  nama_perusahaan: string;
}

interface Diagnosa {
  id?: number;
  nama?: string;
  kode?: string;
}

interface TagihanDetail {
  id?: number;
  uid?: string;
  tanggal?: string;
  pelayanan_id?: number;
  no_kwitansi?: string;
  nama?: string;
  nama_layanan?: string;
  asuransi?: string;
  no_jaminan?: string;
  nama_karyawan?: string;
  diagnosa_list?: Diagnosa[] | null;
}

interface Tagihan {
  id?: number;
  uid?: string;
  tanggal?: string;
  tanggal_dari?: string;
  tanggal_sampai?: string;
  cara_bayar_id?: number;
  perusahaan_id?: number;
  jenis_layanan?: number;
  bundel_uid?: string;
  detail_list?: TagihanDetail[];
}

export interface DetailPiutang {
  tab_active?: string;
  tagihan?: Tagihan;
  tanggal_dari?: string;
  tanggal_sampai?: string;
}

export const loadPiutangRajal = async ({
  cara_bayar_id,
  bulan,
  tahun,
  page = 1,
  limit = 10
}: LoadPiutangParams): Promise<PiutangResponse> => {
  try {
    const response = await api.get(
      `/asuransi/piutang_rajal?cara_bayar_id=${cara_bayar_id}&bulan=${bulan}&tahun=${tahun}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error loading piutang rajal:', error);
    throw error;
  }
};

export const loadPiutangRanap = async ({
  cara_bayar_id,
  bulan,
  tahun,
  page = 1,
  limit = 10
}: LoadPiutangParams): Promise<PiutangResponse> => {
  try {
    const response = await api.get(
      `/asuransi/piutang_ranap?cara_bayar_id=${cara_bayar_id}&bulan=${bulan}&tahun=${tahun}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error loading piutang rajal:', error);
    throw error;
  }
};

export const loadDetailPenagihan = async ({
  id,
  cara_bayar_id,
  jenis_cara_bayar,
  perusahaan_id,
  jenis_layanan,
  jenis_piutang,
  tanggal_dari,
  tanggal_sampai,
  bundel_uid = "",
  periode_id,
  tab_active,
  kasir_ids,
  nama_perusahaan,
}: LoadDetailPiutangParams): Promise<DetailPiutang> => {
  try {
    const response = await api.get(
      `/asuransi/detail_penagihan?id=${id}&cara_bayar_id=${cara_bayar_id}&jenis_cara_bayar=${jenis_cara_bayar}&perusahaan_id=${perusahaan_id}&jenis_layanan=${jenis_layanan}&jenis_piutang=${jenis_piutang}&tanggal_dari=${tanggal_dari}&tanggal_sampai=${tanggal_sampai}&bundel_uid=${bundel_uid}&periode_id=${periode_id}&tab_active=${tab_active}&kasir_ids=${kasir_ids}&nama_perusahaan=${nama_perusahaan}`
    );
    return response.data;
  } catch (error) {
    console.error('Error loading detail penagihan:', error);
    throw error;
  }
};