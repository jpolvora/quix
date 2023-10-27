export function calcSkip(page: number, pageSize: number): number {
    const multplier = page <= 1 ? 0 : page - 1;
    const skip = pageSize * multplier;
    return skip;
}