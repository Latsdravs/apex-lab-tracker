// src/lib/store.ts
import { create } from 'zustand'

type UserRole = 'Admin' | 'Researcher'

interface UserState {
  name: string
  role: UserRole
  // Gelecekte login/logout fonksiyonlari eklenebilir
}

//sahte bir kullanici tanimi
export const useUserStore = create<UserState>(() => ({
  name: 'Alper Kömürcü',
  role: 'Admin',
}))
