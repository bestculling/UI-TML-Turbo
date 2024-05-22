import { create } from "zustand";

export const useStore = create((set) => ({
  currentUser: null,
  show: false,
  conversations: [],
  setShow: () => set((state) => ({ show: !state.show })),
  signInSuccess: (data) => set((state) => ({ currentUser: data })),
  signout: () => set({ currentUser: null }),
  setConversations: (conversations) => set({ conversations }),
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

useStore.getState().initialize();