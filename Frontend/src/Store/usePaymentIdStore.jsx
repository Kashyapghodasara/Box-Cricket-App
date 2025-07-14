import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePaymentIdStore = create(
    persist(
        (set) => ({
            paymentId: "",

            setPaymentId: (id) => set({ paymentId: id }),
            clearPaymentId: () => set({ paymentId: "" }),
        }),
        {
            name: "payment-id-storage",
            getStorage: () => localStorage,
        }
    )
);

export default usePaymentIdStore;
