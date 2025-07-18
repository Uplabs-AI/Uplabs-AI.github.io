import { create } from "zustand"

interface CreditState {
  credits: number
  setCredits: (n: number) => void
  addCredits: (delta: number) => void
}

// Store global para manejar el saldo de créditos del usuario.
// Por defecto iniciamos con 20 créditos; en producción este valor
// vendrá de la API después del login.
export const useCreditStore = create<CreditState>((set) => ({
  credits: 20,
  setCredits: (n) => set({ credits: Math.max(n, 0) }),
  addCredits: (d) => set((state) => ({ credits: Math.max(state.credits + d, 0) })),
})) 