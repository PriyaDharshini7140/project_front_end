import { combineReducers, applyMiddleware, createStore } from "redux";
import UserReducer from "./UserReducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
  user: UserReducer
  
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(RootReducer);