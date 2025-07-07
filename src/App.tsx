import "./App.css";
import Column from "./components/Column";
import { useBoardStore } from "./board-store";
import { Input } from "./components/ui/input";

function App() {
  const { columnsData } = useBoardStore();
  const moveCard = useBoardStore((state) => state.moveCard);

  const columns = Object.keys(columnsData.columns) as string[];

  const draggingCard = useBoardStore((state) => state.draggingCard);

  const onDrop = (column: string, index: number) => {
    if (!draggingCard) return;

    moveCard(columnsData.columns, draggingCard, column, index);
  };

  const handleChangeTitle = (title: string) => {
    useBoardStore.getState().updateTitle(title);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="flex p-8 pb-0">
        <Input
          type="text"
          className="border-none text-3xl"
          placeholder="My kanban board"
          value={useBoardStore.getState().columnsData.title}
          onChange={(e) => handleChangeTitle(e.target.value)}
        ></Input>
      </header>
      <div className="p-8 flex gap-4 overflow-x-auto flex-auto">
        {columns.map((column) => (
          <Column
            key={column}
            column={column}
            cards={columnsData.columns[column]}
            onDrop={onDrop}
          />
        ))}
        {/* <CustomKanban/> */}
      </div>
    </div>
  );
}

export default App;
