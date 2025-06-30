import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//create(persis((set) => {...}))
const useRegistration = create(
  persist(                                  
    (set) => ({
      isLoggedIn: false,
      isSignedUp: false,

      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      signup: () => set({ isSignedUp: true }),
    }),
    {
      name: 'registration-storage',  // Key name in localStorage
    }
  )
);

export default useRegistration;
