import { AuthState } from "./slices/authSlice";

const AUTH_KEY = 'auth';

export const loadAuthState = (): AuthState | undefined => {
  try {
    const serialized = localStorage.getItem(AUTH_KEY);
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

export const saveAuthState = (state: AuthState) => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  } catch {}
};

export const clearAuthState = () => {
  localStorage.removeItem(AUTH_KEY);
};