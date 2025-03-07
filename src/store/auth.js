import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          if (response.status === 200) {
            const data = await response.json();
            set({
              token: data.accessToken,
            });
          } else {
            const error = await response.json();
            set({
              error: error.message,
            });
          }
        } catch (error) {
          console.error("Login failed:", error);
          set({
            error,
          });
          throw error;
        } finally {
          set({ loading: false });
        }
      },
      logout: () =>
        set({
          token: null,
        }),
    }),
    {
      name: "auth-store",
    }
  )
);
