"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/admins";
interface DASProps {
  searchParams: SearchParams;
}

const DAS = ({ searchParams }: DASProps) => {
  return (
    <Dashboard
      searchParams={searchParams}
      title="DAS"
      columns={COLUMNS}
      statuses={STATUSES}
      tags={TAGS}
      dashboardType="admin"
    />
  );
};

export default DAS;
