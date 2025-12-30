import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavContext {
  workflow: string;
  subMenu?: string;
}

interface UiState {
  activeModuleId: string | null;
  navContext: NavContext | null;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
}

const initialState: UiState = {
  activeModuleId: null,
  navContext: null,
  sidebarCollapsed: true,
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveModule(
      state,
      action: PayloadAction<{
        moduleId: string | null;
        context?: NavContext | null;
      }>
    ) {
      state.activeModuleId = action.payload.moduleId;
      state.navContext = action.payload.context ?? null;
    },

    resetNavigation(state) {
      state.activeModuleId = null;
      state.navContext = null;
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
     setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },

    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },

    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },

    resetUI(state) {
      state.sidebarCollapsed = true;
      state.mobileMenuOpen = false;
    },
  },
});

export const { setActiveModule, resetNavigation, toggleSidebar, setSidebarCollapsed, toggleMobileMenu, closeMobileMenu, resetUI } = uiSlice.actions;
export default uiSlice.reducer;