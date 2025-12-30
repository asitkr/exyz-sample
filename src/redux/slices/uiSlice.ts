import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavContext {
  workflow: string;
  subMenu?: string;
  childMenu?: string;
}

interface UiState {
  activeModuleId: string | null;
  navContext: NavContext | null;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  isCmdPaletteOpen: boolean;
}

const initialState: UiState = {
  activeModuleId: null,
  navContext: { workflow: 'home', subMenu: '', childMenu: '' },
  sidebarCollapsed: true,
  mobileMenuOpen: true,
  isCmdPaletteOpen: false,
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
      state.navContext = action.payload.context ?? { workflow: 'home', subMenu: '', childMenu: '' };
    },
    resetActiveModuleId(state) {
      state.activeModuleId = null;
    },
    resetNavigation(state) {
      state.activeModuleId = null;
      state.navContext = { workflow: 'home', subMenu: '', childMenu: '' };
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
      state.navContext = { workflow: 'home', subMenu: '', childMenu: '' };
    },
    setCmdPaletteOpen(state, action: PayloadAction<boolean>) {
      state.isCmdPaletteOpen = action.payload;
    },
    handleSelectModule(
      state,
      action: PayloadAction<{ moduleId: string; workflow: string; subMenu?: string }>
    ) {
      state.activeModuleId = action.payload.moduleId;
      state.navContext = {
        workflow: action.payload.workflow,
        subMenu: action.payload.subMenu,
      };
    },
    handleNavigate(
      state,
      action: PayloadAction<{ workflow?: string; subMenu?: string; childMenu?: string }>
    ) {
      state.navContext = {
        workflow: action.payload.workflow ?? state.navContext?.workflow ?? 'home',
        subMenu: action.payload.subMenu ?? state.navContext?.subMenu ?? '',
        childMenu: action.payload.childMenu ?? state.navContext?.childMenu ?? '',
      };
    }
  },
});

export const {
  setActiveModule,
  resetNavigation,
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileMenu,
  closeMobileMenu,
  resetUI,
  setCmdPaletteOpen,
  handleSelectModule,
  resetActiveModuleId,
  handleNavigate
} = uiSlice.actions;
export default uiSlice.reducer;