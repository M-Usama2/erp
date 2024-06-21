import { userActionTypes } from './user.types';
export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});

export const setCurrentUserData = user => ({
    type: userActionTypes.SET_CURRENT_USER_DATA,
    payload: user
});

export const setCurrentRoles = role => ({
    type: userActionTypes.SET_CURRENT_ROLES,
    payload: role
});

export const setCurrentPermissions = permission => ({
    type: userActionTypes.SET_CURRENT_PERMISSIONS,
    payload: permission
});

