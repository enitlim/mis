import { configureStore } from "@reduxjs/toolkit"
import quizReducer from "../features/quizSlice"
import userReducer from "../features/loginSlice"
import quizQuestionReducer from "../features/quizQuestionSlice"
export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer,
    quizQuestion: quizQuestionReducer,
  },
});