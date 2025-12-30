import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_USERS, MENUS_LOGISTICS, MODULE_CONFIGS } from '../../utils/constants';

const staticSlice = createSlice({
  name: 'static',
  initialState: {
    allUsers: INITIAL_USERS,
    logisticsMenus: MENUS_LOGISTICS,
    modules: MODULE_CONFIGS
  },
  reducers: {},
});

export default staticSlice.reducer;