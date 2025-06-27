"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/admins";
interface DASProps {
  searchParams: SearchParams;
}

const Create = ({ searchParams }: DASProps) => {
  const paramsWithAffiliation = { ...searchParams, affiliation: "DAS" };
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
