import { useState } from "react";
import "./App.css";
import Column from "./components/Column";
import type { ColumnProps } from "./model/column";
import { useBoardStore } from "./board-store";
import { moveCardToColumn } from "./lib/utils";

function App() {
  const { columnsData } = useBoardStore();
  const [data, setData] = useState<ColumnProps>(columnsData);

  const columns = Object.keys(columnsData) as string[];

  const draggingCard = useBoardStore((state) => state.draggingCard);

  const onDrop = (column: string, index: number) => {
    if (!draggingCard) return;

    const newCards = moveCardToColumn({
      cards: data,
      cardId: draggingCard,
      column,
      index,
    });

    setData(newCards);
  };

  return (
    <div className="w-full h-screen p-8 flex gap-4">
      {columns.map((column) => (
        <Column
          key={column}
          column={column}
          cards={columnsData[column]}
          onDrop={onDrop}
        />
      ))}
      {/* <CustomKanban/> */}
    </div>
  );
}

export default App;
