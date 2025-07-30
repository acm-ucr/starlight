"use client";
import { CiSquarePlus, CiTrash } from "react-icons/ci";
import { ChevronDownIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Table from "@/components/admin/services/emailtemplating/table";
import COLUMNS, { EmailTemplate } from "@/data/admin/services/columns";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useRef, useState, useEffect, useMemo } from "react";
import type { Table as TableInstance } from "@tanstack/react-table";
import toaster from "@/utils/toaster";
import {
  Fields,
  ATTRIBUTES,
} from "@/data/admin/services/emailtemplating/spark";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BaseFields,
  RadioInput,
  TextInput,
  Field,
  DateInput,
} from "@/types/forms";

interface RenderFieldProps<T> {
  fieldName: string;
  fieldConfig: Field;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

interface CardProps {
  program: string;
}

const RenderField = <T,>({
  fieldName,
  fieldConfig,
  formData,
  setFormData,
}: RenderFieldProps<T>) => {
  const key = fieldName as keyof T;

  if (fieldConfig.input === "radio") {
    return (
      <div className="grid gap-3">
        <Label className="font-semibold">
          {(fieldConfig as RadioInput).text}
        </Label>
        <RadioGroup
          value={formData[key] as string}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, [key]: value }))
          }
          className="grid grid-cols-2 gap-2"
        >
          {Object.values((fieldConfig as RadioInput).options).map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${fieldName}-${option}`} />
              <Label htmlFor={`${fieldName}-${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (fieldConfig.input === "input") {
    return (
      <div className="grid gap-3">
        <Label htmlFor={fieldName} className="font-semibold">
          {(fieldConfig as TextInput).title}
        </Label>
        <Input
          id={fieldName}
          name={fieldName}
          value={formData[key] as string}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [key]: e.target.value }))
          }
          placeholder={(fieldConfig as TextInput).placeholder}
        />
      </div>
    );
  }
  if (fieldConfig.input === "date") {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return (
      <div className="grid gap-3">
        <Label htmlFor={fieldName} className="font-semibold">
          {(fieldConfig as DateInput).title}
        </Label>
        <div className="relative flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    selectedDate.setHours(0, 0, 0, 0);
                    setDate(selectedDate);
                    setFormData((prev) => ({
                      ...prev,
                      [key]: selectedDate.toISOString().split("T")[0],
                    }));
                  }
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }
  return null;
};

interface DynamicFormRendererProps<T> {
  fields: BaseFields;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

const DynamicFormRenderer = <T,>({
  fields,
  formData,
  setFormData,
}: DynamicFormRendererProps<T>) => {
  const allFields = Object.entries(fields);

  const chunkedFields = [];
  for (let i = 0; i < allFields.length; i += 3) {
    chunkedFields.push(allFields.slice(i, i + 3));
  }

  return (
    <CarouselContent>
      {chunkedFields.map((chunk, index) => (
        <CarouselItem key={index}>
          <div className="flex flex-col gap-6 p-1">
            {chunk.map(([fieldName, fieldConfig]) => (
              <RenderField
                key={fieldName}
                fieldName={fieldName}
                fieldConfig={fieldConfig}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

const fetchEmailTemplates = async (program: string) => {
  const res = await fetch(`/api/emailtemplating?program=${program}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch email templates");
  }
  return json.templates as EmailTemplate[];
};

const Card = ({ program }: CardProps) => {
  const [newTemplate, setNewTemplate] = useState(ATTRIBUTES);
  const tableRef = useRef<TableInstance<EmailTemplate> | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["templates", program],
    queryFn: () => fetchEmailTemplates(program.toLowerCase()),
  });

  const isFormValid = useMemo(() => {
    return Object.entries(Fields).every(([key, config]) => {
      if (!config.required) return true;
      const value = newTemplate[key as keyof typeof newTemplate];
      return !!value;
    });
  }, [newTemplate]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const isOnLastPage = current === count - 1;

  const addTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !isOnLastPage) return;

    try {
      const res = await fetch("/api/emailtemplating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program: program.toLowerCase(),
          ...newTemplate,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || "Failed to add template");
      }
      toaster(`Template added!`, "success");
      setNewTemplate(ATTRIBUTES);
      await refetch();
      setDialogOpen(false);
    } catch (err) {
      toaster("Error: " + (err as Error).message, "error");
    }
  };

  const handleDeleteSelected = async () => {
    const table = tableRef.current;
    if (!table) return;

    const selectedIds = table
      .getSelectedRowModel()
      .rows.map(
        (row) => `${row.original.season.toLowerCase()}${row.original.year}`,
      );

    if (!selectedIds.length) return;

    try {
      const res = await fetch("/api/emailtemplates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program: program.toLowerCase(),
          templateIds: selectedIds,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        toaster("Failed to delete template(s)", "error");
        throw new Error(json.message);
      }
      toaster(`${selectedIds.length} template(s) deleted!`, "success");
      await refetch();
      table.resetRowSelection();
    } catch (err) {
      toaster("Error: " + (err as Error).message, "error");
    }
  };

  const tableData = data ?? [];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-left text-3xl text-white">{program}</p>
        <div className="flex items-center text-3xl text-white">
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) setNewTemplate(ATTRIBUTES);
            }}
          >
            <DialogTrigger asChild>
              <CiSquarePlus
                className="cursor-pointer hover:text-blue-400"
                onClick={() => setDialogOpen(true)}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <form onSubmit={addTemplate}>
                <DialogHeader>
                  <DialogTitle>Create Email Template</DialogTitle>
                  <DialogDescription>
                    Step through the fields to create a new template.
                  </DialogDescription>
                </DialogHeader>

                <Carousel className="mx-auto w-full max-w-xs" setApi={setApi}>
                  <DynamicFormRenderer
                    fields={Fields}
                    formData={newTemplate}
                    setFormData={setNewTemplate}
                  />
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={!isFormValid || !isOnLastPage}
                  >
                    Create Template
                  </Button>
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
