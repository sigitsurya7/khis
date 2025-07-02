import api from "@/lib/api";

interface PerusahaanMaster {
    id: number;
    uid: string;
    kode: string;
    nama: string;
    alamat: string;
    telepon: string;
    fax: string;
    kontak_person: string | null;
    telepon_cp: string;
    jabatan_kontak: string | null;
    tgl_habis: string | null;
    perkiraan_id: number;
    unit_usaha_id: number;
    jenis_tarif: number;
    keterangan: string;
    dengan_kwitansi: number;
    saldo: number;
    jenis_tanggungan: number;
    tanggungan: number;
    sop: string;
    discount_jenis: string;
    discount: number;
    max_biaya_adm: number;
    off_faktur: number;
    off_kwitansi: number;
    status: number;
    jenis: number;
    jatuh_tempo_hari: string;
    tagihan_hari: string;
    created_at: string | null;
    created_by: number;
    update_at: string;
    update_by: number;
    deleted: number;
    delete_at: string | null;
    delete_by: number | null;
}

export interface MasterPerusahaanResponse {
    data: PerusahaanMaster[] | null
}

export const getPerusahaan = async (): Promise<MasterPerusahaanResponse> => {
    try {
        const response = await api.get('master/perusahaan/list')
        return response.data;
    } catch (error) {
        console.error('Error loading Master Perusahaan:', error);
    throw error;
    }
}