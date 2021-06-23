import { combineReducers, applyMiddleware, createStore } from "redux";
import UserReducer from "./UserReducer";
import thunk from "redux-thunk";
import PostReducer from './PostReducer'

import verificationReducer from './verificationReducer'
const RootReducer = combineReducers({
  user: UserReducer,
  post:PostReducer,
  
  verification : verificationReducer
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(RootReducer);