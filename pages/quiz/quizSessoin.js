import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Question from "./components/questionMain";
import QuestionOverview from "./components/questionOverview";
import axios from "axios";
import QuestionReview from "./components/questionReview";
import { AES, enc } from "crypto-js";

import Button from '@mui/material/Button'
// require("dotenv").config();

const QuizSessoin = () => {
  
     const decryptData = (data) => {
      try {
       const decodedStr = decodeURIComponent(data);
       const decryptedData = AES.decrypt(
         decodedStr,
         process.env.URLSECRETKEY
       ).toString(enc.Utf8);
       console.log("Decrypted Data: ",decryptedData);
         return decryptedData
    
  } catch (error) {
    console.error("Decryption error:", error);
    return "Decryption Error";
  }
}
  const route = useRouter();
  const { idt, namet, total_timet, pass_markt, parat } = route.query;

  const [queIndex, setqueIndex] = useState(1);
  const [Questions, setQuestions] = useState([]);
  const id = decryptData(idt);
  const total_time = total_timet?decryptData(total_timet.toString()):"";
  const para = decryptData(parat);
console.log(id,
para);
  const questionFun = (indData) => {
    setqueIndex(indData);
  };


  useEffect(() => {
    if (typeof id != "undefined") {
      const getQuiz = async () => {
        try {
          const queData = await axios.get(
            `http://localhost:8000/api/quiz/${id}`
          );
          setQuestions(queData["data"]["quiz"]);
        } catch (error) {
          if (error.response && error.response.status === 422) {
            console.log(
              "Request failed due to validation error:",
              error.response.data
            );
          } else {
            console.log("An error occurred:", error.message);
          }
        }
      };
      getQuiz();
    }
  }, [idt]);
  // console.log(Questions.length);
  // console.log(Questions);
  return (
    <>
     
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {Questions.length > 0 ? (
          <>
            {/* <p>Show</p> */}

            {para === "review" ? (
              <>
                <QuestionReview
                  queIndex={queIndex}
                  Questions={Questions}
                  queId={id}
                />{" "}
              </>
            ) : (
              <>
                <Question queIndex={queIndex} Questions={Questions} />
              </>
            )}
            <QuestionOverview
              triggerFun={questionFun}
              Questions={Questions}
              quizId={id}
              para={para}
              examTime={total_time}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default QuizSessoin;
