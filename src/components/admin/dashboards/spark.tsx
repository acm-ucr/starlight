"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";
import { TAGS, COLUMNS } from "@/data/admin/admins";
interface SparkProps {
  searchParams: SearchParams;
}

const Spark = ({ searchParams }: SparkProps) => {
  return (
    <Dashboard
      searchParams={searchParams}
      title="Spark"
      columns={COLUMNS}
      statuses={STATUSES}
      tags={TAGS}
      dashboardType="admin"
    />
  );
};

export default Spark;
