import { create } from "zustand";

export const useAccountStore = create((set) => ({
  token: null,
  accountData: null,
  setToken: (token) => set({ token }),
  setAccountData: (data) => set({ accountData: data }),
  resetStore: () => set({ token: null, accountData: null }),
}));
