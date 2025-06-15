import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ToastSettingsState {
  enabled: boolean;
  toggleEnabled: () => void;
}

export const useToastSettingsStore = create(
  persist<ToastSettingsState>(
    (set) => ({
      enabled: true,
      toggleEnabled: () =>
        set((state) => ({ enabled: !state.enabled })),
    }),
    {
      name: "toast-settings", // stored in localStorage
    }
  )
);
