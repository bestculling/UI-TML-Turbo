import { create } from "zustand";

export const useStore = create((set) => ({
  currentUser: null,
  show: false,
  pin: null,
  setShow: () => set((state) => ({ show: !state.show })),
  setPIN: (newPin) => set((state) => ({ pin: newPin })),
  signInSuccess: (data) => set((state) => ({ currentUser: data })),
  signout: () => set({ currentUser: null }), 
  initialize: () => {
    const storedState = JSON.parse(localStorage.getItem("appState"))
    if (storedState) {
      set(storedState)
    }
  }
}));

useStore.subscribe((state) => {
  localStorage.setItem("appState", JSON.stringify(state));
})

// เรียกใช้ตอนเริ่มต้นแอปพลิเคชัน
useStore.getState().initialize();