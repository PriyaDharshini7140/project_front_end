import { combineReducers, applyMiddleware, createStore } from "redux";
import UserReducer from "./UserReducer";
import thunk from "redux-thunk";
import PostReducer from './PostReducer'
const RootReducer = combineReducers({
  user: UserReducer,
  post:PostReducer
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(RootReducer);