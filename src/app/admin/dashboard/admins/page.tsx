import Admins from "@/components/admin/dashboards/admins";
import { SearchParams } from "@/types/dashboard";

export const metadata = {
  title: "Admin | Admins",
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = ({ searchParams }: PageProps) => {
  const parsedSearchParams: SearchParams = {
    index: Number(searchParams.index) || 0,
    size: Number(searchParams.size) || 10,
    first: typeof searchParams.first === "string" ? searchParams.first : "",
    last: typeof searchParams.last === "string" ? searchParams.last : "",
    direction:
      searchParams.direction === "prev" || searchParams.direction === "next"
        ? searchParams.direction
        : "next",
  };

  return <Admins searchParams={parsedSearchParams} />;
};

export default Page;
