export function toNumber(value: string): number {
    const n = Number(value);
    return isNaN(n) ? 0 : n;
}
