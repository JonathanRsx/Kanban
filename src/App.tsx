import "./App.css";
import Column from "./components/Column";
import { useBoardStore } from "./board-store";
import { Input } from "./components/ui/input";
import { AddColumn } from "./components/AddColumn";
import { ShareLink } from "./components/ShareLink";

function App() {
  const getQueryParam = () => {
    const pathname = window.location.href;
    console.log(pathname);
    const searchParams = new URL(pathname).searchParams;
    return searchParams.get("d");
  };

  const data = getQueryParam();
  if (data) {
    localStorage.setItem("board", JSON.parse(data));
    useBoardStore.setState({columnsData: JSON.parse(data)})
  }

  const {columnsData} = useBoardStore()

  const moveCard = useBoardStore((state) => state.moveTask);

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
      <header className="flex p-8 pb-0 gap-4">
        <Input
          type="text"
          className="border-none text-3xl font-bold"
          style={{ fontSize: "20px" }}
          placeholder="My kanban board"
          value={useBoardStore.getState().columnsData.title}
          onChange={(e) => handleChangeTitle(e.target.value)}
        />
        <AddColumn type="add"/>
        <ShareLink />
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
      </div>
    </div>
  );
}

export default App;
