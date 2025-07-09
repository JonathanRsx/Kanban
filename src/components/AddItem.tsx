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
import { Textarea } from "./ui/textarea";
import { useBoardStore } from "@/board-store";
import { Edit } from "lucide-react";
import { useState } from "react";

export function AddItem({
  type,
  column,
  id,
  title,
  description,
}: {
  type: "Add" | "Edit";
  column: string;
  id?: number;
  title?: string;
  description?: string;
}) {
  const [open, setIsOpen] = useState(false);

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    console.log("card", id, title, description);
    if (id) {
      useBoardStore.getState().updateTask(column, {
        id,
        title,
        description,
      });
    } else {
      useBoardStore.getState().addTask(column, {
        id: Date.now(),
        title,
        description,
      });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {type === "Add" ? (
          <Button
            variant="ghost"
            className="text-muted-foreground font-normal w-20"
          >
            Add items
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="p-1">
            <Edit size={16} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type} Task</DialogTitle>
          <DialogDescription>Add your new task here</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-3">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={title} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={description}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
