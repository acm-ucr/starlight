import { Label } from "@/components/ui/label";
import { SearchParams } from "@/types/dashboard";
import { useState } from "react";
import Filters from "@/components/admin/dashboards/dashboard/filters";
import Table from "@/components/admin/dashboards/dashboard/table";

interface DashboardProps {
  title: string;
  searchParams: SearchParams;
  statuses: Record<string, string>;
}

export interface Filter {
  id: string;
  value: string[];
}

const Dashboard = ({ title, searchParams, statuses }: DashboardProps) => {
  const [filters, setFilters] = useState<Filter[]>([
    { id: "status", value: Object.keys(statuses) },
  ]);

  return (
    <div className="bg-starlight-gray-secondary w-10/12">
      <div className="mt-8 ml-5 flex items-center gap-x-8">
        <Label className="text-starlight-tags-white text-2xl font-bold">
          {title}
        </Label>
        <Filters
          statuses={statuses}
          filters={filters}
          setFilters={setFilters}
        />
        <Table searchParams={searchParams} />
      </div>
    </div>
  );
};

export default Dashboard;
