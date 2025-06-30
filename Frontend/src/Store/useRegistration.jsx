import { create } from 'zustand';

const useRegistration = create((set) => ({
  isLoggedIn: false,
  isSignedUp: false,

  // Action to set isLoggedIn true
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  signup: () => set({ isSignedUp: true }),
}));

export default useRegistration;


// State change when i refreshed so fix it in future