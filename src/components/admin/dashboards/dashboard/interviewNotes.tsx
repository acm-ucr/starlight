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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface InterviewNotesTypes {
  uid: number;
  currentNotes: string;
  status: string;
  track: string
}

const InterviewNotes = ({ uid, currentNotes, status, track }: InterviewNotesTypes) => {
  const [notes, setNotes] = useState(currentNotes ?? "");
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/${track}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objects: [{ uid, interviewNotes: notes }],
          status: status,
        }),
      });
      if (res.ok) {
        console.log("good");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-2">

    <p>{notes}</p>
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSaveChanges}>
          <DialogHeader>
            <DialogTitle>Edit Interview Notes</DialogTitle>
            <DialogDescription>
              update interview notes here, press save changes when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline" >Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default InterviewNotes;
