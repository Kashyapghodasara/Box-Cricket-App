import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePaymentDetailStore = create(
    /* persist( */
        (set) => ({
            paymentDetails: {
                Fullname: '',
                Email: '',
                City: '',
                State: '',
                Zipcode: '',
                paymentMethode: '',
                UPIid: '',
                Transactionid: '',
                Amount: '',
                Remark: '',
                acHolderName: '',
                bankName: '',
                IFSC: '',
                acNumber: '',
                User: [],
            },

            setPaymentDetails: (detail) => set({ paymentDetails: detail }),

            clearPaymentDetails: () =>
                set({
                    paymentDetails: {
                        Fullname: '',
                        Email: '',
                        City: '',
                        State: '',
                        Zipcode: '',
                        paymentMethode: '',
                        UPIid: '',
                        Transactionid: '',
                        Amount: '',
                        Remark: '',
                        acHolderName: '',
                        bankName: '',
                        IFSC: '',
                        acNumber: '',
                        User: [],
                    },
                }),
        }),
        {
            name: 'payment-details-storage', // 🧠 Key used in localStorage
            getStorage: () => localStorage,  // Optional (defaults to localStorage)
        }
    )
/* ); */

export default usePaymentDetailStore;
