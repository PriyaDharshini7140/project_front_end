import { combineReducers, applyMiddleware, createStore } from "redux";
import UserReducer from "./UserReducer";
import thunk from "redux-thunk";
import PostReducer from './PostReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


 
import verificationReducer from './verificationReducer'
const RootReducer = combineReducers({
  user: UserReducer,
  post:PostReducer,
  
  verification : verificationReducer
});




const persistConfig = {
  key: 'root',
  storage,
}
 
const pReducer = persistReducer(persistConfig, RootReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };