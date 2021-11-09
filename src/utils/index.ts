export function isNumber(value: number | string): boolean {
  return /^\d+\.?(\d+)?$/.test(`${value}`);
}

export function normalizeLength(from: number, to: number) {
  return (value: string): string | null => {
    if (value.length >= from && value.length <= to) {
      return value;
    } else return null;
  };
}

export function normalizePrecision(precision: number) {
  return (value: string): string | null => {
    const split = value.split('.');
    if (split.length === 1 || split[1].length <= precision) {
      return value;
    } else return null;
  };
}

export function normalizeLengthOnlyNumbers(from: number, to: number, precision: number) {
  return (value: string): string | null => {
    if ((isNumber(value) && normalizeLength(from, to)(value) && normalizePrecision(precision)(value)) || !value) {
      return value;
    } else return null;
  };
}

export function formatTime(date: Date, pattern: string): string {
  if (pattern === 'hh:mm') return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
  return '';
}

export function getNewFocus(val: number): number {
  let newVal = 0;
  switch (val) {
    case 1:
      newVal = 2;
      break;
    case 2:
      newVal = 1;
      break;
  }
  return newVal;
}
