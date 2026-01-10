// Date utilities

import { format, differenceInDays, isAfter, isBefore, parseISO, addDays, startOfDay, endOfDay } from 'date-fns';

export function getLocalTodayISODate(): string {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  return differenceInDays(end, start);
}

export function isValidDateRange(checkIn: string, checkOut: string): boolean {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return isAfter(start, addDays(today, -1)) && isAfter(end, start);
}

export function getDefaultCheckIn(): string {
  const tomorrow = addDays(new Date(), 1);
  return format(tomorrow, 'yyyy-MM-dd');
}

export function getDefaultCheckOut(): string {
  const nextWeek = addDays(new Date(), 4);
  return format(nextWeek, 'yyyy-MM-dd');
}

export function formatForDisplay(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy');
}

export function isUpcoming(checkIn: string): boolean {
  const checkInDate = startOfDay(parseISO(checkIn));
  const todayStart = startOfDay(new Date());
  return isAfter(checkInDate, todayStart) || checkInDate.getTime() === todayStart.getTime();
}

export function isPast(checkOut: string): boolean {
  const checkOutDate = endOfDay(parseISO(checkOut));
  return isBefore(checkOutDate, new Date());
}

// Generate ICS file content for calendar
export function generateICSContent(
  title: string,
  location: string,
  checkIn: string,
  checkOut: string,
  description: string
): string {
  const formatICSDate = (dateStr: string): string => {
    const date = parseISO(dateStr);
    return format(date, "yyyyMMdd'T'120000");
  };

  const now = new Date();
  const uid = `${now.getTime()}@stayfinder.app`;
  const dtstamp = format(now, "yyyyMMdd'T'HHmmss'Z'");

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//StayFinder//Booking//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;VALUE=DATE:${formatICSDate(checkIn).split('T')[0]}
DTEND;VALUE=DATE:${formatICSDate(checkOut).split('T')[0]}
SUMMARY:${title}
LOCATION:${location}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
END:VEVENT
END:VCALENDAR`;
}

export function downloadICSFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
