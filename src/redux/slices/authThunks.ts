// authThunks.ts
import { INITIAL_USERS } from '../../utils/constants';
import { UserRole } from '../../utils/types';
import { AppDispatch } from '../store';
import { setCredentials, logout } from './authSlice';

export const restoreAuth = () => (dispatch: AppDispatch) => {
  const token = localStorage.getItem('auth_token');
  const storedUsername = localStorage.getItem('auth_user');

  if (!token || !storedUsername) {
    dispatch(logout());
    return;
  }

  try {
    const decoded = atob(token);
    if (!decoded.includes(storedUsername)) {
      dispatch(logout());
      return;
    }

    // Check in allUsers mock (like processUserLogin)
    const foundUser = INITIAL_USERS.find(
      u => u.username.toLowerCase() === storedUsername.toLowerCase()
    );

    let role: UserRole = 'NORMAL_USER';
    let userId = '999';

    if (foundUser) {
      role = foundUser.role;
      userId = foundUser.id;
    } else {
      const u = storedUsername.toLowerCase();
      if (u.includes('super')) role = 'SUPER_ADMIN';
      else if (u.includes('proc')) role = 'PROCUREMENT_ADMIN';
      else if (u.includes('unit')) role = 'UNIT_ADMIN';
    }

    dispatch(
      setCredentials({
        username: storedUsername,
        userId,
        role,
        token,
        status: 'Active',
        serviceYears: 0,
      })
    );
  } catch (err) {
    dispatch(logout());
  }
};
