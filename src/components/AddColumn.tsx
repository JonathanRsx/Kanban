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
import { Edit } from "lucide-react";

export function AddColumn({
  type = "add",
  current,
}: {
  type: "add" | "edit";
  current?: string;
}) {
  const [open, setIsOpen] = useState(false);
  const [column, setColumn] = useState(current);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (current === column) {
      setIsOpen(false);
      setMessage("");
      return
    }
    const columns = Object.keys(
      useBoardStore.getState().columnsData.columns
    ) as string[];
    if (!column) setMessage("Enter a name");
    else if (columns.find((c) => c === column)) {
      setMessage("Column allready exist");
    } else {
      if (type === "add") {
        useBoardStore.getState().addColumn(column);
      } else if (current) {
        useBoardStore.getState().updateColumn(current, column);
      }
      setColumn("");
      setMessage("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {type === "add" ? (
          <Button variant="outline">Add column</Button>
        ) : (
          <Button variant="ghost" className="justify-start font-normal">
            <Edit />
            Edit
          </Button>
        )}
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
