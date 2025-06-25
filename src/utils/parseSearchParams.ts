import { SearchParams } from "@/types/dashboard";

export function parseSearchParams(
  raw: Record<string, string | string[] | undefined>,
): SearchParams {
  return {
    index: Number(raw.index) || 0,
    size: Number(raw.size) || 10,
    first: typeof raw.first === "string" ? raw.first : "",
    last: typeof raw.last === "string" ? raw.last : "",
    direction:
      raw.direction === "prev" || raw.direction === "next"
        ? raw.direction
        : "next",
  };
}
