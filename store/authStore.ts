import {create} from "zustand";
import type { AuthState } from "@/types/auth";
import {getCurrentUser} from "@/services/authApi"
import { logoutUser } from "@/services/authApi";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isInitialized: false,

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    set({ token });
  },

logout: async () => {
  try {
    await logoutUser(); 
  } catch (e) {
    console.error(e);
  }

  localStorage.removeItem("token");
  set({ token: null });
},

  initAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ token: null, isInitialized: true });
      return;
    }

    try {
      await getCurrentUser();
      set({ token, isInitialized: true });
    } catch {
      localStorage.removeItem("token");
      set({ token: null, isInitialized: true });
    }
  },
}));