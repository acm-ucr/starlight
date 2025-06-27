"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/admins";
interface SparkProps {
  searchParams: SearchParams;
}

const Create = ({ searchParams }: SparkProps) => {
  const paramsWithAffiliation = { ...searchParams, affiliation: "Spark" };
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
