import api from "@/lib/api";

interface LoadPiutangParams {
  cara_bayar_id: string;
  bulan: string;
  tahun: string;
  search?: string;
  page?: number;
  limit?: number;
}

interface DaftarTagihanParams {
    cara_bayar_id?: string;
    perusahaan_id?: string;
    jenis_layanan?: string;
    filterName?: string;
    page?: number;
    limit?: number;
}
interface FollowUp {
    id?: string;
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
export interface FollowUpResponse {
  action: string;
  data: FollowUpItem[] | null;
  limit: number;
  page: number;
  total: number;
}
export interface FollowUpItem {
    id?: number
    tagihan_piutang_id?: number
    tanggal: string
    follow_up_by: string
    hasil_follow_up: string
    pic_perusahaan: string
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

export interface DaftarTagihanResponse {
    action: string;
    data: any[] | null;
    limit: number;
    page: number;
    total: number;
}

export const loadPiutangRajal = async ({
  cara_bayar_id,
  bulan,
  tahun,
  search = "",
  page = 1,
  limit = 10
}: LoadPiutangParams): Promise<PiutangResponse> => {
  try {
    const response = await api.get(
      `/asuransi/piutang_rajal?search=${search}&cara_bayar_id=${cara_bayar_id}&bulan=${bulan}&tahun=${tahun}&page=${page}&limit=${limit}`
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
  search = "",
  page = 1,
  limit = 10
}: LoadPiutangParams): Promise<PiutangResponse> => {
  try {
    const response = await api.get(
      `/asuransi/piutang_ranap?search=${search}&cara_bayar_id=${cara_bayar_id}&bulan=${bulan}&tahun=${tahun}&page=${page}&limit=${limit}`
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

export const loadDaftarTagihan = async ({
    cara_bayar_id = "0",
    perusahaan_id = "0",
    jenis_layanan = "0",
    filterName = "",
    page = 1,
    limit = 10
}: DaftarTagihanParams): Promise<DaftarTagihanResponse> => {
    try {
        const response = await api.get(
        `/asuransi/daftar_tagihan?search=${filterName}&cara_bayar_id=${cara_bayar_id}&perusahaan_id=${perusahaan_id}&jenis_layanan=${jenis_layanan}&page=${page}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.error('Error loading piutang rajal:', error);
        throw error;
    }
}

export const saveDetailTagihan = async ( data : any) => {
    try {
        const response = await api.post('/asuransi/detail_penagihan/save', data);
        return response.data;
    } catch (error) {
        console.error('Error save detail tagihan:', error);
        throw error;
    }
}

export const getFollowUp = async ({
    id,
    page = 1,
    limit = 10
}: FollowUp) => {
    try {
        const response = await api.get(`asuransi/follow_up?id=${id}&page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        console.error('Error saat mengambil data:', error);
        throw error;
    }
}