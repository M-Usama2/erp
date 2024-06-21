import { userActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    userData: null,

}

const intial = {
    currentRole: null,
}

const initPermission = {
    currentPermission: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case userActionTypes.SET_CURRENT_USER_DATA:
            return {
                ...state,
                userData: action.payload
            };

        default:
            return state;
    }
}

export const roleReducer = (state = intial, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_ROLES:
            return {
                ...state,
                currentRole: action.payload
            };

        default:
            return state;
    }
}

export const permissionReducer = (state = initPermission, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_PERMISSIONS:
            return {
                ...state,
                currentPermission: action.payload
            };

        default:
            return state;
    }
}
