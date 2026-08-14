import { create } from "zustand"
import {
  getCurrentUser,
  logoutUser,
} from "@/services/authApi"
import type { AuthState } from "@/types/auth"

export const useAuthStore = create<AuthState>(
  (set) => ({
    token: null,

    isInitialized: false,

    setToken: (token) => {
      if (token) {
        localStorage.setItem(
          "token",
          token
        )
      } else {
        localStorage.removeItem(
          "token"
        )
      }

      set({ token })
    },

    logout: async () => {
      try {
        await logoutUser()
      } catch (error) {
        console.error(error)
      }

      localStorage.removeItem("token")

      set({
        token: null,
        isInitialized: true,
      })
    },

    initAuth: async () => {
      const token =
        localStorage.getItem("token")

      if (!token) {
        set({
          token: null,
          isInitialized: true,
        })

        return
      }

      set({ token })

      try {
        await getCurrentUser()

        set({
          isInitialized: true,
        })
      } catch {
        localStorage.removeItem("token")

        set({
          token: null,
          isInitialized: true,
        })
      }
    },
  })
)