import { create } from "zustand";

const usePaymentDetailsStore = create((set) => ({
    paymentDetails: {
        Fullname: "",
        Email: "",
        City: "",
        State: "",
        Zipcode: "",
        paymentMethode: "",
        UPIid: "",
        Transactionid: "",
        Amount: "",
        Remark: "",
        acHolderName: "",
        bankName: "",
        IFSC: "",
        acNumber: "",
        User: [],
    },

    setPaymentDetails: (detail) => set({ paymentDetails: detail }),

    clearPaymentDetails: () =>
        set({
            paymentDetails: {
                Fullname: "",
                Email: "",
                City: "",
                State: "",
                Zipcode: "",
                paymentMethode: "",
                UPIid: "",
                Transactionid: "",
                Amount: "",
                Remark: "",
                acHolderName: "",
                bankName: "",
                IFSC: "",
                acNumber: "",
                User: [],
            },
        }),
}));

export default usePaymentDetailsStore;
