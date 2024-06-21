import {createSelector} from "reselect";

const selectUser = state => state.user;

const selectRole = state => state.role;

const selectPermission = state => state.permission;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

export const selectCurrentRole = createSelector(
    [selectRole],
    (role) => role.currentRole
)

export const selectCurrentPermission = createSelector(
    [selectPermission],
    (permission) => permission.currentPermission
)
