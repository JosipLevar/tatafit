/**
 * Date and timezone utilities locked to Europe/Zagreb
 */

export function getZagrebDateString(date: Date = new Date()): string {
  // Use 'sv-SE' locale which natively formats as YYYY-MM-DD
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Zagreb',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

export function getZagrebDateParts(date: Date = new Date()): { year: number; month: number; day: number; hour: number; minute: number; second: number } {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Zagreb',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const findVal = (type: string) => {
    const p = parts.find(x => x.type === type);
    return p ? parseInt(p.value, 10) : 0;
  };
  return {
    year: findVal('year'),
    month: findVal('month'),
    day: findVal('day'),
    hour: findVal('hour'),
    minute: findVal('minute'),
    second: findVal('second'),
  };
}

/**
 * Calculates remaining time until midnight in Europe/Zagreb
 */
export function getTimeUntilZagrebMidnight(): {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  formatted: string;
} {
  const parts = getZagrebDateParts(new Date());
  const currentSecondsIntoDay = parts.hour * 3600 + parts.minute * 60 + parts.second;
  const totalDaySeconds = 24 * 3600;
  const remaining = Math.max(0, totalDaySeconds - currentSecondsIntoDay);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatted = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return { hours, minutes, seconds, totalSeconds: remaining, formatted };
}

/**
 * Returns ISO week string in Zagreb, e.g. "2026-W45"
 * Starts on Monday.
 */
export function getZagrebWeekId(dateStr: string = getZagrebDateString()): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const target = new Date(Date.UTC(year, month - 1, day));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
  }
  const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  return `${target.getUTCFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
}

export function isSameZagrebWeek(dateStrA: string, dateStrB: string): boolean {
  return getZagrebWeekId(dateStrA) === getZagrebWeekId(dateStrB);
}

/**
 * Human friendly Croatian date representation
 */
export function formatZagrebDateNice(dateStr: string): string {
  const today = getZagrebDateString();
  if (dateStr === today) return 'Danas';

  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d));

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  const formatted = new Intl.DateTimeFormat('hr-HR', options).format(dateObj);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function getDayOfWeekIndex(dateStr: string): number {
  // 0 = Ponedjeljak, ..., 6 = Nedjelja
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d));
  const day = dateObj.getUTCDay();
  return (day + 6) % 7;
}

export const CROATIAN_DAYS = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
