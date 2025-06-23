"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/admins";
interface AdminProps {
  searchParams: SearchParams;
}

const Admins = ({ searchParams }: AdminProps) => {
  return (
    <Dashboard
      searchParams={searchParams}
      title="Admins"
      columns={COLUMNS}
      statuses={STATUSES}
      tags={TAGS}
      dashboardType="admin"
    />
  );
};

export default Admins;
