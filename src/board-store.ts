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
  moveCard: (
    cards: ColumnProps,
    cardId: string,
    column: string,
    index: number
  ) => void;
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

      console.log("u", updatedColumnCards);
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

  moveCard: (
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
}));
