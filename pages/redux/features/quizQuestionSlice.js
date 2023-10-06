import { createSlice } from "@reduxjs/toolkit";

const initialState={
    question:{}
}

const quizQuestionSlice=createSlice({
    name:"quizQuestion",
    initialState,
    reducers:{
        createQuiz:(state, action)=>{
            const { id, quiz_id,questions,option_a,option_b, option_c,option_d,option_a_correct, option_b_correct,option_c_correct,option_d_correct } = action.payload;
            const ansObj = {
              quiz_id,
              questions,
              option_a,
              option_b,
              option_c,
              option_d,
              option_a_correct,
              option_b_correct,
              option_c_correct,
              option_d_correct,
            };
            state.question[id] = ansObj;
            
        }
    }
})

export const {createQuiz}=quizQuestionSlice.actions
export default quizQuestionSlice.reducer
