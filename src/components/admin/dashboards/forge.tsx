"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/admins";
interface ForgeProps {
  searchParams: SearchParams;
}

const Create = ({ searchParams }: ForgeProps) => {
  const paramsWithAffiliation = { ...searchParams, affiliation: "Forge" };
  return (
    <Dashboard
      searchParams={paramsWithAffiliation}
      title="Admin"
      columns={COLUMNS}
      statuses={STATUSES}
      tags={TAGS}
      dashboardType="admin"
    />
  );
};

export default Create;
