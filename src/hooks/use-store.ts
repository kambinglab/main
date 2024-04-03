import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  query: string;
  setQuery: (query: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      query: "",
      setQuery: (query) => set({ query }),
    }),
    {
      name: "__store",
    }
  )
);
