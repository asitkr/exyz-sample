import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../utils/types';
import { clearAuthState, saveAuthState } from '../authStorage';

export interface AuthState {
  userId: string;
  username: string;
  email: string;
  role: UserRole;
  unit: string;
  rank?: string;
  designation?: string;
  serviceNumber?: string;
  phone?: string;
  clearanceLevel?: string;
  status: 'Active' | 'Pending';
  serviceYears: number;
  dateOfJoining?: string;
  dateOfSeniority?: string;
  dateOfRetirement?: string;
  token: string | null;
  isAuthChecking: boolean;
}

const initialState: AuthState = {
  userId: '',
  username: '',
  email: '',
  role: 'NORMAL_USER',
  unit: '',
  rank: '',
  designation: '',
  serviceNumber: '',
  phone: '',
  clearanceLevel: '',
  status: 'Pending',
  serviceYears: 0,
  dateOfJoining: '',
  dateOfSeniority: '',
  dateOfRetirement: '',
  token: null,
  isAuthChecking: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<Partial<AuthState> & { token: string }>
    ) {
      Object.assign(state, action.payload);
      state.isAuthChecking = false;

      saveAuthState(state);
    },

    logout(state) {
      Object.assign(state, initialState);
      state.isAuthChecking = false;

      clearAuthState();
    },

    setAuthChecking(state, action: PayloadAction<boolean>) {
      state.isAuthChecking = action.payload;
    },
  },
});

export const { setCredentials, logout, setAuthChecking } = authSlice.actions;
export default authSlice.reducer;
