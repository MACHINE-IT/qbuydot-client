import { configureStore, createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/';
import rootReducer from './reducers';

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const serializableMiddleware = createSerializableStateInvariantMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serializableMiddleware),
});

export const persistor = persistStore(store)