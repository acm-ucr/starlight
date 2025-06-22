"use client";
import { SearchParams } from "@/types/dashboard";
import { STATUSES } from "@/data/statuses";
import Dashboard from "@/components/admin/dashboards/dashboard/dashboard";

interface AdminProps {
  searchParams: SearchParams;
}

const Admins = ({ searchParams }: AdminProps) => {
  return (
    <Dashboard searchParams={searchParams} statuses={STATUSES} title="Admins" />
  );
};

export default Admins;
