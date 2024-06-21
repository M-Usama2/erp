import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { userReducer, roleReducer, permissionReducer } from "./user/user.reducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'role', 'permission']
}

const rootReducer = combineReducers({
    user: userReducer,
    role: roleReducer,
    permission: permissionReducer,
});

export default persistReducer(persistConfig, rootReducer);