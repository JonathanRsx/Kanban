import { useState } from "react";
import { Button } from "./ui/button";
import type { ColumnProps } from "@/model/column";

export default function AddItem({
  column,
  setData,
}: {
  column: string;
  setData: React.Dispatch<React.SetStateAction<ColumnProps[]>>;
}) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex">
      {adding ? (
        <div></div>
      ) : (
        <Button onClick={() => setAdding(true)}>Add</Button>
      )}
    </div>
  );
}
