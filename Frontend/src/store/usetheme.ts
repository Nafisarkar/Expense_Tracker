import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  theme: string;
}

interface Action {
  setTheme: (theme: string) => void;
}

const useThemeStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        theme: "dark", // default
        setTheme: (selectedTheme: string) => {
          set({ theme: selectedTheme });
          document.documentElement.setAttribute("data-theme", selectedTheme);
        },
      }),
      {
        name: "theme", // localStorage key
        partialize: (state) => ({ theme: state.theme }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            document.documentElement.setAttribute("data-theme", state.theme);
          }
        },
      }
    )
  )
);

export default useThemeStore;
