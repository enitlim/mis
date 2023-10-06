import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Question from "./components/questionMain";
import QuestionOverview from "./components/questionOverview";
import axios from "axios";
import QuestionReview from "./components/questionReview";
const QuizSessoin = () => {
  const route = useRouter();
  const { id, name, total_time, pass_mark, para } = route.query;

  const [queIndex, setqueIndex] = useState(1);
  const [Questions, setQuestions] = useState([]);
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
  }, [id]);
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
