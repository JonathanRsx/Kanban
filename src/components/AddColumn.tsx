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
import { useBoardStore } from "@/board-store";
import { useState } from "react";

export function AddColumn() {
  const [open, setIsOpen] = useState(false);
  const [column, setColumn] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const columns = Object.keys(
      useBoardStore.getState().columnsData.columns
    ) as string[];
    if (!column) setMessage("Enter a name");
    else if (columns.find((c) => c === column)) {
      setMessage("Column allready exist");
    } else {
      useBoardStore.getState().addColumn(column);
      setColumn("");
      setMessage("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add column</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add column</DialogTitle>
          <DialogDescription>Add your new task here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={column}
            onChange={(e) => setColumn(e.target.value)}
          />
          {message && <p className="text-sm text-destructive">{message}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
