import { createSlice } from "@reduxjs/toolkit";

const initialState={
    answers:{}
}

const quizSlice = createSlice({
    name : 'quiz',
    initialState,
    reducers:{
        updateMarks:(state, action)=>{
            const { quesId, answerKey, marks, option } = action.payload;
            const ansObj = { quesId, answerKey, marks, option };
                 state.answers[quesId] = ansObj;

            
        },
        reviewAnswer:(state, action)=>{
            const { quesId, answerKey, marks, option } = action.payload;
            const ansObj = { quesId, answerKey, marks, option };
            state.answers[quesId]=ansObj
        },
        quizComplete:(state, action)=>{
            state.answers={}
        },
    }
});

export const { updateMarks, reviewAnswer, quizComplete } = quizSlice.actions;
export default quizSlice.reducer;