import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavContext {
  workflow: string;
  subMenu?: string;
}

interface UiState {
  activeModuleId: string | null;
  navContext: NavContext | null;
}

const initialState: UiState = {
  activeModuleId: null,
  navContext: null,
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
  },
});

export const { setActiveModule, resetNavigation } = uiSlice.actions;
export default uiSlice.reducer;