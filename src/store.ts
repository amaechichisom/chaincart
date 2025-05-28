import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'; 
import cartReducer from './features/cartSlice'; 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { baseDomain } from './api/BaseDomain';
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";

export const persistConfig = {
  key: "root",
  storage,
  version: 1,
  migrate: (state:any) => {
    return Promise.resolve(state);
  },
  blacklist: [baseDomain.reducerPath],
};


const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [baseDomain.reducerPath]: baseDomain.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(baseDomain.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
