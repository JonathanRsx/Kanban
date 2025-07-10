import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useBoardStore } from "@/board-store";
import { Trash } from "lucide-react";

export function DeleteItem({
  cardId,
  column,
  type = "card",
}: {
  cardId?: number;
  column: string;
  type?: "card" | "column";
}) {
  const handleDelete = () => {
    if (type === "card" && cardId) {
      useBoardStore.getState().deleteTask(column, cardId);
    }
    if (type === "column") {
      useBoardStore.getState().deleteColumn(column);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {type === "card" ? (
          <Button variant="ghost" size="icon">
            <Trash />
          </Button>
        ) : (
          <Button variant="ghost" className="justify-start font-normal">
            <Trash />
            Delete
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
