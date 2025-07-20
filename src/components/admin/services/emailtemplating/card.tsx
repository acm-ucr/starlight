"use client";
import { useQuery } from "@tanstack/react-query";
import Table from "@/components/admin/services/emailtemplating/table";
import COLUMNS, { EmailTemplate } from "@/data/admin/services/columns";
import { Button } from "@/components/ui/button";
import { CiSquarePlus, CiTrash } from "react-icons/ci";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDialogNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState } from "react";
import type { Table as TableInstance } from "@tanstack/react-table";
import toaster from "@/utils/toaster";
interface CardProps {
  program: string;
}

const fetchEmailTemplates = async (program: string) => {
  const res = await fetch(`/api/emailtemplating?program=${program}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch email templates");
  }
  return json.templates as EmailTemplate[];
};

const Card = ({ program }: CardProps) => {
  const tableRef = useRef<TableInstance<EmailTemplate> | null>(null);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["templates", program],
    queryFn: () => fetchEmailTemplates(program.toLowerCase()),
  });
  
  const tableData = data ?? [];

  return (
    <div className="">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Email Template</DialogTitle>
              <DialogDescription>
                Fill in the specified information.
              </DialogDescription>
            </DialogHeader>
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Username</Label>
                      <Input
                        id="username-1"
                        name="username"
                        defaultValue="@peduarte"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDialogNext />
            </Carousel>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
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
