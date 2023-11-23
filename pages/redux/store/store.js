import { combineReducers, configureStore } from "@reduxjs/toolkit"
//importing the Slics
import quizReducer from "../features/quizSlice"
import userReducer from "../features/loginSlice"
import quizQuestionReducer from "../features/quizQuestionSlice"
//importing the redux persist
import storage from 'redux-persist/lib/storage'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  quiz: quizReducer,
  user: userReducer,
  quizQuestion: quizQuestionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor=persistStore(store)