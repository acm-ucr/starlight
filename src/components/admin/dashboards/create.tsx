"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/admins";
interface CreateProps {
  searchParams: SearchParams;
}

const Create = ({ searchParams }: CreateProps) => {
  return (
    <Dashboard
      searchParams={searchParams}
      title="Create"
      columns={COLUMNS}
      statuses={STATUSES}
      tags={TAGS}
      dashboardType="admin"
    />
  );
};

export default Create;
