function parseMonthYear(value: string): Date {
  return new Date(`${value} 1`);
}

export function getDurationMonths(startDate: string, endDate: string): number {
  const start = parseMonthYear(startDate);
  const end = endDate === 'Present' ? new Date() : parseMonthYear(endDate);

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  return Math.max(1, months);
}

export function toDateTime(monthYear: string): string | undefined {
  if (monthYear === 'Present') {
    return undefined;
  }

  const date = parseMonthYear(monthYear);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}`;
}
