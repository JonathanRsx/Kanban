import { create } from "zustand";
import type { ColumnProps } from "./model/column";
import type { CardProps } from "./model/card";
import { moveCardToColumn } from "./lib/utils";

interface DataProps {
  title: string;
  columns: ColumnProps;
}

type BoardStore = {
  draggingCard: string | null;
  setDraggingCard: (cardId: string | null) => void;
  columnsData: DataProps;
  updateTitle: (newtitle: string) => void;
  addTask: (columnId: string, card: CardProps) => void;
  updateTask: (columnId: string, updatedCard: CardProps) => void;
  deleteTask: (column: string, cardId: number) => void;
  moveTask: (
    cards: ColumnProps,
    cardId: string,
    column: string,
    index: number
  ) => void;
  addColumn: (name: string) => void;
  updateColumn: (oldName: string, name: string) => void;
  deleteColumn: (name: string) => void;
};

const defaultData: DataProps = {
  title: "My kanban board",
  columns: {
    "To Do": [],
    "In Progress": [],
    Done: [],
  },
};

const getInitialData = (): DataProps => {
  try {
    // Tenter de récupérer les données du localStorage
    const storedData = localStorage.getItem("board");

    // Si des données existent, les retourner, sinon utiliser les données par défaut
    return storedData ? JSON.parse(storedData) : defaultData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return defaultData;
  }
};

export const useBoardStore = create<BoardStore>((set) => ({
  columnsData: getInitialData(),

  updateTitle: (newtitle: string) => {
    set((state) => {
      const newState = { ...state.columnsData, title: newtitle };
      localStorage.setItem("board", JSON.stringify(newState));
      return {
        columnsData: newState,
      };
    });
  },

  draggingCard: null,
  setDraggingCard: (cardId: string | null) => set({ draggingCard: cardId }),

  addTask: (columnId, card) =>
    set((state) => {
      if (!state.columnsData.columns[columnId]) {
        return state;
      }

      const updatedColumnCards = [...state.columnsData.columns[columnId], card];

      const newState = {
        ...state.columnsData,
        columns: {
          ...state.columnsData.columns,
          [columnId]: updatedColumnCards,
        },
      };

      localStorage.setItem("board", JSON.stringify(newState));
      return {
        columnsData: newState,
      };
    }),

  updateTask: (columnId, updatedCard) =>
    set((state) => {
      console.log("u", updatedCard, columnId);
      if (!state.columnsData.columns[columnId]) {
        return state;
      }

      const updatedColumnCards = state.columnsData.columns[columnId].map(
        (card) => (card.id === updatedCard.id ? updatedCard : card)
      );
      const newState = {
        ...state.columnsData,
        columns: {
          ...state.columnsData.columns,
          [columnId]: updatedColumnCards,
        },
      };

      localStorage.setItem("board", JSON.stringify(newState));
      return {
        columnsData: newState,
      };
    }),

  deleteTask: (column: string, cardId: number) =>
    set((state) => {
      const tasks = state.columnsData.columns[column].filter(
        (t) => t.id !== cardId
      );
      const newState = {
        ...state.columnsData,
        columns: {
          ...state.columnsData.columns,
          [column]: tasks,
        },
      };
      localStorage.setItem("board", JSON.stringify(newState));
      return {
        columnsData: newState,
      };
    }),

  moveTask: (
    cards: ColumnProps,
    cardId: string,
    column: string,
    index: number
  ) =>
    set((state) => {
      const newState = {
        ...state.columnsData,
        columns: moveCardToColumn({
          cards,
          cardId,
          column,
          index,
        }),
      };
      localStorage.setItem("board", JSON.stringify(newState));
      return { columnsData: newState };
    }),
  addColumn: (name: string) =>
    set((state) => {
      const newState = {
        ...state.columnsData,
        columns: { ...state.columnsData.columns, [name]: [] },
      };
      localStorage.setItem("board", JSON.stringify(newState));
      return {
        columnsData: newState,
      };
    }),
  deleteColumn: (name: string) =>
    set((state) => {
      const newColumns = { ...state.columnsData.columns };
      delete newColumns[name];
      const newState = {
        ...state.columnsData,
        columns: newColumns,
      };
      localStorage.setItem("board", JSON.stringify(newState));
      return {
        columnsData: newState,
      };
    }),
  updateColumn: (oldName: string, name: string) =>
    set((state) => {
      const { [oldName]: value, ...rest } = state.columnsData.columns;
      const newState = {
        ...state.columnsData,
        columns: { ...rest, [name]: value },
      };
      localStorage.setItem("board", JSON.stringify(newState));
      return {
        columnsData: newState,
      };
    }),
}));
