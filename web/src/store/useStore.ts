import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Goal, WeeklyPlan, DashboardData } from "../types";

interface AppState {
  // Autenticação
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Dados principais
  currentGoal: Goal | null;
  weeklyPlan: WeeklyPlan | null;
  dashboardData: DashboardData | null;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setCurrentGoal: (goal: Goal | null) => void;
  setWeeklyPlan: (plan: WeeklyPlan | null) => void;
  setDashboardData: (data: DashboardData | null) => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      token: null,
      isAuthenticated: false,
      currentGoal: null,
      weeklyPlan: null,
      dashboardData: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setCurrentGoal: (goal) => set({ currentGoal: goal }),
      setWeeklyPlan: (plan) => set({ weeklyPlan: plan }),
      setDashboardData: (data) => set({ dashboardData: data }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          currentGoal: null,
          weeklyPlan: null,
          dashboardData: null,
        }),
    }),
    {
      name: "estudos-app-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
