import "./App.css";
import Column from "./components/Column";
import { useBoardStore } from "./board-store";


function App() {
  const { columnsData } = useBoardStore();
  const moveCard = useBoardStore((state) => state.moveCard);

  const columns = Object.keys(columnsData) as string[];

  const draggingCard = useBoardStore((state) => state.draggingCard);

  const onDrop = (column: string, index: number) => {
    if (!draggingCard) return;

    moveCard(columnsData, draggingCard, column, index);
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
