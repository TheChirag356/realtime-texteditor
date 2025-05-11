import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface UserState {
    username: string | undefined;
    color: string | undefined;
    language: string | undefined;
    hydrated: boolean;

    setUsername: (username: string) => void;
    setColor: (color: string) => void;
    setLanguage: (language: string) => void;
    setHydrated: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        immer((set) => ({
            username: undefined,
            color: undefined,
            language: undefined,
            hydrated: false,

            setUsername: (username) => set((state) => void (state.username = username)),
            setColor: (color) => set((state) => void (state.color = color)),
            setLanguage: (language) => set((state) => void (state.language = language)),
            setHydrated: () => set((state) => void (state.hydrated = true)),
        })),
        {
            name: "user", // localStorage key
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error) {
                        state?.setHydrated();
                    }
                };
            },
        }
    )
);
