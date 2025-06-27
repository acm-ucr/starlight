import { SearchParams } from "@/types/dashboard";
import DAS from "@/components/admin/dashboards/dasapplications";
import { parseSearchParams } from "@/utils/parseSearchParams";

export const metadata = {
  title: "DAS Applications",
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
  return <DAS searchParams={parsedSearchParams} />;
};

export default Page;
