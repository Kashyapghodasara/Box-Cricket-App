import { create } from 'zustand';

const useRegistration = create((set) => ({
  isLoggedIn: false,   // Initial state

  // Action to set isLoggedIn true
  login: () => set({ isLoggedIn: true }),

  // Action to set isLoggedIn false
  logout: () => set({ isLoggedIn: false })
}));

export default useRegistration;
