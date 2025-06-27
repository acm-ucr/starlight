import { SearchParams } from "@/types/dashboard";
import Spark from "@/components/admin/dashboards/sparkteam";
import { parseSearchParams } from "@/utils/parseSearchParams";

export const metadata = {
  title: "Spark Teams",
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
  return <Spark searchParams={parsedSearchParams} />;
};

export default Page;
