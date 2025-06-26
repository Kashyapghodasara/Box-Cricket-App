import { create } from "zustand"
import { persist } from "zustand/middleware"

const useBoxDetailStore = create(
    /* persist( */
        (set) => ({
            boxDetails: {
                Boxid: "",
                Date: "",
                Start_time: "",
                End_time: "",
                Price: "",
                Size: "",
                Duration: "",
                Payment_status: "",
                User: [],
            },

            setBoxDetails: (detail) => set({ boxDetails: detail }),

            clearBoxDetails: () => set({
                boxDetails: {
                    Boxid: "",
                    Date: "",
                    Start_time: "",
                    End_time: "",
                    Price: "",
                    Size: "",
                    Payment_status: "",
                    User: [],
                },
            })

        }),
        {
            name: 'box-details-storage', // 🧠 Key used in localStorage
            getStorage: () => localStorage,  // Optional (defaults to localStorage)
        }
    )
    /* )); */

export default useBoxDetailStore