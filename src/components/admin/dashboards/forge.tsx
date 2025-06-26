"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/forge";
interface ForgeProps {
  searchParams: SearchParams;
}

const Forge = ({ searchParams }: ForgeProps) => {
  return (
    <Dashboard
      searchParams={searchParams}
      title="Forge"
      columns={COLUMNS}
      statuses={STATUSES}
      tags={TAGS}
      dashboardType="member"
    />
  );
};

export default Forge;
