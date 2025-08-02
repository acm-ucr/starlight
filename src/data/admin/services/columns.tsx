import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import toaster from "@/utils/toaster";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export interface EmailTemplate {
  program: string;
  season: string;
  year: string;
  status: "accept" | "reject" | "interview";
}

const COLUMNS: ColumnDef<EmailTemplate>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-min pt-2 pb-1 pl-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="text-white"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="pt-2 pb-1 pl-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "season",
    header: () => (
      <div className="pt-2 pb-1 text-center text-white">Season</div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-white">{row.getValue("season")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: () => <div className="pt-2 pb-1 text-center text-white">Year</div>,
    cell: ({ row }) => (
      <div className="text-center text-white">{row.getValue("year")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className="pt-2 pb-1 text-center text-white">Status</div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-white">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "send",
    header: () => (
      <div className="pt-2 pb-1 text-center text-white">Send Email</div>
    ),
    cell: ({ row }) => {
      const template = row.original;
      const [open, setOpen] = useState(false);
      const [projectName, setProjectName] = useState("");
      const [recipients, setRecipients] = useState("");
      const isAcceptTemplate = template.status.toLowerCase() === "accept";
      const handleSend = async () => {
        try {
          const res = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              templateId: `${template.program.toLowerCase()}${template.season.toLowerCase()}${template.year}${template.status.toLowerCase()}`,
              program: template.program,
              status: template.status,
              recipients: recipients.split(",").map((e) => e.trim()),
              ...(isAcceptTemplate && { projectName }),
            }),
          });
          if (!res.ok) throw new Error("Failed to send email");
          toaster("Email sent successfully!", "success");
          setOpen(false);
        } catch (err) {
          toaster("Error: " + (err as Error).message, "error");
        }
      };
      return (
        <div className="flex items-center justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Send
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Email</DialogTitle>
                <DialogDescription>
                  {isAcceptTemplate
                    ? "Enter the project name to include in the email."
                    : "Enter recipient email(s), separated by commas."}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {isAcceptTemplate ? (
                  <div className="grid gap-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                    <Label htmlFor="emails">Recipient Emails</Label>
                    <Input
                      id="emails"
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)}
                      placeholder="example1@email.com, example2@email.com"
                    />
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Label htmlFor="emails">Recipient Emails</Label>
                    <Input
                      id="emails"
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)}
                      placeholder="example1@email.com, example2@email.com"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSend}>Send</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
export default COLUMNS;
