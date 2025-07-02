import {
  parseDateTime,
  today,
  getLocalTimeZone,
  toZoned,
  ZonedDateTime,
  CalendarDateTime
} from '@internationalized/date';

export function safeParseToZoned(raw: string | null | undefined): ZonedDateTime {
  const timeZone = getLocalTimeZone();

  try {
    let isoString = (raw || '').trim();

    // Ubah "2024-11-15 00:00:00" -> "2024-11-15T00:00:00"
    if (isoString.includes(' ')) {
      isoString = isoString.replace(' ', 'T');
    }
    if (!isoString.includes('T')) {
      isoString += 'T00:00:00';
    }

    const dt = parseDateTime(isoString);

    // Paksa harus CalendarDateTime sebelum konversi
    if (!(dt instanceof CalendarDateTime)) {
      throw new Error("Parsed result bukan CalendarDateTime");
    }

    return toZoned(dt, timeZone);
  } catch (e) {
    console.warn("❗ Gagal parse:", raw, "| fallback ke today()");

    // fallback beneran sebagai ZonedDateTime
    const todayDateStr = today(timeZone).toString(); // e.g. "2025-06-23"
    const todayFull = parseDateTime(`${todayDateStr}T00:00:00`);
    return toZoned(todayFull, timeZone);
  }
}

