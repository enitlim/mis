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
        clearAnswer:(state, action)=>{
            const {quesId }=action.payload;
            const newAns={...state.answers}
            delete newAns[quesId];
            state.answers=newAns;
        },
        reviewAnswer:(state, action)=>{
            const { quesId, answerKey, marks, option } = action.payload;
            const ansObj = { quesId, answerKey, marks, option };
            state.answers[quesId]=ansObj
        }
    }
});

export const { updateMarks, clearAnswer, reviewAnswer } = quizSlice.actions;
export default quizSlice.reducer;