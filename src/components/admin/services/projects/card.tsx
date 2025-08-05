"use client";
import { useQuery } from "@tanstack/react-query";
import Table from "@/components/admin/services/projects/table";
import COLUMNS from "@/data/admin/projects";
import { CiSquarePlus, CiTrash } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import type { Table as TableInstance } from "@tanstack/react-table";
import toaster from "@/utils/toaster";
interface CardProps {
  program: string;
}

interface RowData {
  project: string;
}
const fetchProjects = async (program: string) => {
  const res = await fetch(`/api/projects?program=${program}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch projects");
  return json.projects as string[];
};

const Card = ({ program }: CardProps) => {
  const [projectName, setProjectName] = useState("");
  const tableRef = useRef<TableInstance<RowData> | null>(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projects", program],
    queryFn: () => fetchProjects(program.toLowerCase()),
  });

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim()) return;

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          program: program.toLowerCase(),
          project: projectName,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        toaster("Failed to add project", "error");
        throw new Error(json.message || "Failed to add project");
      }
      toaster(`${projectName} added!`, "success");
      setProjectName("");
      await refetch();
      tableRef.current?.resetRowSelection();
    } catch (err) {
      toaster("Error: " + (err as Error).message, "error");
      console.error("Error:", err);
    }
  };

  const handleDeleteSelected = async () => {
    const table = tableRef.current;
    if (!table) return;

    const selected = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.project);

    if (!selected.length) return;

    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program: program.toLowerCase(),
          projects: selected,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const json = await res.json();
        toaster("Failed to delete project", "error");
        throw new Error(json.message);
      }
      toaster(`${selected.join(", ")} deleted!`, "success");
      await refetch();
      tableRef.current?.resetRowSelection();
    } catch (err) {
      toaster("Error: " + (err as Error).message, "error");
      console.error("Failed to delete:", err);
    }
  };

  const tableData = (data ?? []).map((project) => ({ project }));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-left text-3xl text-white">{program}</p>
        <div className="flex items-center text-3xl text-white">
          <Dialog>
            <DialogTrigger asChild>
              <CiSquarePlus className="cursor-pointer hover:text-blue-400" />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={addProject}>
                <DialogHeader>
                  <DialogTitle>Add Project</DialogTitle>
                  <DialogDescription>
                    Ex: ACM Atlas, CSA, Drones, SWE-Agent, etc.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                  <Label htmlFor="project-1">Project Name</Label>
                  <Input
                    id="project-1"
                    name="project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <DialogFooter className="pt-6">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Add Project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <CiTrash
            onClick={handleDeleteSelected}
            className="ml-4 cursor-pointer text-white hover:text-red-400"
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {(error as Error).message}</p>
      ) : (
        <Table
          columns={COLUMNS}
          data={tableData}
          onTableReady={(table) => (tableRef.current = table)}
        />
      )}
    </div>
  );
};

export default Card;
