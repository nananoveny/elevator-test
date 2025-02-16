export const chunk = <T>(arr: T[], size: number): T[][] =>
  arr.length > size
    ? [arr.slice(0, size), ...chunk(arr.slice(size), size)]
    : [arr];
