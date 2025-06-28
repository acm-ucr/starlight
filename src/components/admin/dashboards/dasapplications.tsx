"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/das";
import { useSession } from "next-auth/react";
import Fault from "@/utils/error";

interface DASProps {
  searchParams: SearchParams;
}

const DAS = ({ searchParams }: DASProps) => {
  const session = useSession();
  if (
    session?.data?.user?.affiliation?.includes("DAS") ||
    session?.data?.user?.affiliation?.includes("ACM Board")
  ) {
    return (
      <Dashboard
        searchParams={searchParams}
        title="DAS"
        columns={COLUMNS}
        statuses={STATUSES}
        tags={TAGS}
        dashboardType="member"
      />
    );
  } else {
    throw new Fault(403, "Unauthorized", "You do not have access to this page");
  }
};

export default DAS;
