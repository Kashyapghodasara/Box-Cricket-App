import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserIdStore = create(
    persist(
        (set) => ({
            loggedInUserId: "",

            setUserId: (id) => set({ loggedInUserId: id }),
            clearUserId: () => set({ loggedInUserId: "" }),
        }),
        {
            name: "user-id-storage",
            getStorage: () => localStorage,
        }
    )
);

export default useUserIdStore;
