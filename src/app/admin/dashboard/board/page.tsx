import { SearchParams } from "@/types/dashboard";
import Board from "@/components/admin/dashboards/board";
import { parseSearchParams } from "@/utils/parseSearchParams";

export const metadata = {
  title: "ACM Board",
};

interface RawSearchParams {
  [key: string]: string | string[] | undefined;
}

interface PageProps {
  searchParams?: Promise<RawSearchParams>;
}

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams: RawSearchParams = searchParams
    ? await searchParams
    : {};
  const parsedSearchParams: SearchParams =
    parseSearchParams(resolvedSearchParams);
  return <Board searchParams={parsedSearchParams} />;
};

export default Page;
