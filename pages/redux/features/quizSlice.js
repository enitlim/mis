import { createSlice } from "@reduxjs/toolkit";

const initialState={
    answers:{}
}

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateMarks: (state, action) => {
      const { quesId, answerKey, marks, option } = action.payload;
      const ansObj = { quesId, answerKey, marks, option };
      state.answers[quesId] = ansObj;
    },
    reviewAnswer: (state, action) => {
      const { quesId, answerKey, marks, option } = action.payload;
      const ansObj = { quesId, answerKey, marks, option };
      state.answers[quesId] = ansObj;
    },
    quizComplete: (state, action) => {
      state.answers = {};
    },
    // InsertQuiz:(state,action)=>{
    //     let firstArr={};
    //     for (let index = 0; index < action.payload.length; index++) {
    //        let ind=index+1;
    //         firstArr[ind] = {
    //           quesId: ind,
    //           answerKey: "",
    //           marks: 0,
    //           option: "notviewed",
    //         };
    //     }
    //     state.answers=firstArr
    // }
     InsertQuiz: (state, action) => {
      const numQuestions = action.payload.length;

      // Using Array.from to create a new array and then reduce it to an object
      const newAnswers = Array.from({ length: numQuestions }, (_, index) => {
        const quesId = index + 1;
        return {
          [quesId]: {
            quesId,
            answerKey: "",
            marks: 0,
            option: "notviewed",
          },
        };
      }).reduce((acc, obj) => ({ ...acc, ...obj }), {});

      state.answers = newAnswers;
    },
  },
  
});

export const { updateMarks, reviewAnswer, quizComplete, InsertQuiz } = quizSlice.actions;
export default quizSlice.reducer;