import { SearchParams } from "@/types/dashboard";
import Forge from "@/components/admin/dashboards/forgeapplications";
import { parseSearchParams } from "@/utils/parseSearchParams";

export const metadata = {
  title: "Forge Applications",
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
  return <Forge searchParams={parsedSearchParams} />;
};

export default Page;
