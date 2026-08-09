import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getCurrentUser, logoutUser } from "@/services/authApi"
import type { AuthState } from "@/types/auth"

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isInitialized: false,

      setToken: (token: string | null) => {
        set({ token })
      },

      logout: async () => {
        try {
          await logoutUser()
        } catch (e) {
          console.error(e)
        }

        set({ token: null })
      },

      initAuth: async () => {
        const token = localStorage.getItem("token")

        if (!token) {
          set({ token: null, isInitialized: true })
          return
        }

        set({ token })

        try {
          await getCurrentUser()
          set({ isInitialized: true })
        } catch {
          set({ token: null, isInitialized: true })
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
)