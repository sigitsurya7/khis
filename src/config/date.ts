export function formatWaktu(dateString: string): string {
  const date = new Date(dateString);
  const sekarang = new Date();
  const selisihDetik = Math.floor((sekarang.getTime() - date.getTime()) / 1000);
  
  // Jika tanggal invalid
  if (isNaN(date.getTime())) {
    return "Tanggal tidak valid";
  }

  // Jika lebih dari 24 jam (86400 detik)
  if (selisihDetik > 86400) {
    const hari = String(date.getDate()).padStart(2, '0');
    const bulan = String(date.getMonth() + 1).padStart(2, '0');
    const tahun = date.getFullYear();
    const jam = String(date.getHours()).padStart(2, '0');
    const menit = String(date.getMinutes()).padStart(2, '0');
    const detik = String(date.getSeconds()).padStart(2, '0');
    
    return `Dibuat ${hari}/${bulan}/${tahun} ${jam}:${menit}:${detik}`;
  }

  // Jika kurang dari 24 jam
  if (selisihDetik < 60) {
    return `Dibuat ${selisihDetik} detik yang lalu`;
  }
  
  const selisihMenit = Math.floor(selisihDetik / 60);
  if (selisihMenit < 60) {
    return `Dibuat ${selisihMenit} menit yang lalu`;
  }
  
  const selisihJam = Math.floor(selisihMenit / 60);
  return `Dibuat ${selisihJam} jam yang lalu`;
}