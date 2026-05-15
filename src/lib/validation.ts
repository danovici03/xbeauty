export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function trimOr(value: unknown, max = 500): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
}

export function normalizeRoPhone(value: string): string | null {
  const digits = value.replace(/[\s().\-]/g, "");
  if (/^\+407\d{8}$/.test(digits)) return "0" + digits.slice(3);
  if (/^00407\d{8}$/.test(digits)) return "0" + digits.slice(4);
  if (/^407\d{8}$/.test(digits)) return "0" + digits.slice(2);
  if (/^07\d{8}$/.test(digits)) return digits;
  return null;
}

export function isRoPhone(value: string): boolean {
  return normalizeRoPhone(value) !== null;
}
