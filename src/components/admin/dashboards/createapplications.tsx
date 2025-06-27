"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/create";
import { useSession } from "next-auth/react";
import Fault from "@/utils/error";

interface CreateProps {
  searchParams: SearchParams;
}

const Create = ({ searchParams }: CreateProps) => {
  const session = useSession();
  if (session?.data?.user?.affiliation?.includes("Create")) {
    return (
      <Dashboard
        searchParams={searchParams}
        title="Create"
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

export default Create;
