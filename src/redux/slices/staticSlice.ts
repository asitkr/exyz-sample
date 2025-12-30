// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { INITIAL_USERS, MENUS_LOGISTICS, MENUS_PERSONNEL, MENUS_FACILITIES, MENUS_CYBER, MENUS_FLEET, MODULE_CONFIGS } from '../../utils/constants';
// import { MenuItem, UserRole } from '../../utils/types';

// // Optional: filterMenus utility (assumes you already have it)
// export const filterMenus = (menus: MenuItem[], role: UserRole, userId: string): MenuItem[] => {
//   return menus
//     .filter(menu => {
//       if (menu.roleAccess && !menu.roleAccess.includes(role)) return false;
//       if (menu.allowedUsers && !menu.allowedUsers.includes(userId)) return false;
//       return true;
//     })
//     .map(menu => ({
//       ...menu,
//       subItems: menu.subItems ? filterMenus(menu.subItems, role, userId) : [],
//     }));
// };

// interface StaticState {
//   allUsers: typeof INITIAL_USERS;
//   logisticsMenus: typeof MENUS_LOGISTICS;
//   modules: typeof MODULE_CONFIGS;
//   filteredMenus: MenuItem[];
// }

// const initialState: StaticState = {
//   allUsers: INITIAL_USERS,
//   logisticsMenus: MENUS_LOGISTICS,
//   modules: MODULE_CONFIGS,
//   filteredMenus: []
// };

// const staticSlice = createSlice({
//   name: 'static',
//   initialState,
//   reducers: {},
// });

// // Selector to get filtered menus for a module
// const staticSlice = createSlice({
//   name: 'static',
//   initialState,
//   reducers: {
//     // New action to select filtered menus
//     selectMenusForModule(
//       state,
//       action: PayloadAction<{ moduleId: string; role: UserRole; userId: string }>
//     ) {
//       const { moduleId, role, userId } = action.payload;

//       let rawMenus: MenuItem[] = [];
//       switch(moduleId) {
//         case 'logistics':
//           rawMenus = MENUS_LOGISTICS;
//           break;
//         case 'personnel':
//           rawMenus = MENUS_PERSONNEL;
//           break;
//         case 'facilities':
//           rawMenus = MENUS_FACILITIES;
//           break;
//         case 'cyber':
//           rawMenus = MENUS_CYBER;
//           break;
//         case 'fleet':
//           rawMenus = MENUS_FLEET;
//           break;
//         default:
//           rawMenus = MENUS_LOGISTICS;
//           break;
//       }

//       state.filteredMenus = filterMenus(rawMenus, role, userId);
//     },
//   },
// });

// export const { selectMenusForModule } = staticSlice.actions;
// export default staticSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_USERS, MENUS_LOGISTICS, MENUS_PERSONNEL, MENUS_FACILITIES, MENUS_CYBER, MENUS_FLEET, MODULE_CONFIGS } from '../../utils/constants';
import { MenuItem, UserRole } from '../../utils/types';

// Utility to filter menus based on role and userId
export const filterMenus = (menus: MenuItem[], role: UserRole, userId: string): MenuItem[] => {
  return menus
    .filter(menu => {
      if (menu.roleAccess && !menu.roleAccess.includes(role)) return false;
      if (menu.allowedUsers && !menu.allowedUsers.includes(userId)) return false;
      return true;
    })
    .map(menu => ({
      ...menu,
      subItems: menu.subItems ? filterMenus(menu.subItems, role, userId) : [],
    }));
};

interface StaticState {
  allUsers: typeof INITIAL_USERS;
  logisticsMenus: typeof MENUS_LOGISTICS;
  modules: typeof MODULE_CONFIGS;
  filteredMenus: MenuItem[]; // <-- new state to store filtered menus
}

const initialState: StaticState = {
  allUsers: INITIAL_USERS,
  logisticsMenus: MENUS_LOGISTICS,
  modules: MODULE_CONFIGS,
  filteredMenus: [], // initialize empty
};

const staticSlice = createSlice({
  name: 'static',
  initialState,
  reducers: {
    // New action to select filtered menus
    selectMenusForModule(
      state,
      action: PayloadAction<{ moduleId: string; role: UserRole; userId: string }>
    ) {
      const { moduleId, role, userId } = action.payload;

      let rawMenus: MenuItem[] = [];
      switch(moduleId) {
        case 'logistics':
          rawMenus = MENUS_LOGISTICS;
          break;
        case 'personnel':
          rawMenus = MENUS_PERSONNEL;
          break;
        case 'facilities':
          rawMenus = MENUS_FACILITIES;
          break;
        case 'cyber':
          rawMenus = MENUS_CYBER;
          break;
        case 'fleet':
          rawMenus = MENUS_FLEET;
          break;
        default:
          rawMenus = MENUS_LOGISTICS;
          break;
      }

      state.filteredMenus = filterMenus(rawMenus, role, userId);
    },
  },
});

export const { selectMenusForModule } = staticSlice.actions;
export default staticSlice.reducer;
