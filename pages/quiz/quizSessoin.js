import React,{useState} from 'react'
import Question from './components/questionMain'
import QuestionOverview from './components/questionOverview'
import QuestionStatus from './components/questionStatus';

const QuizSessoin = () => {
  const [queIndex, setqueIndex] = useState(1)
  const questionFun=(indData) => {
    setqueIndex(indData);
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Question queIndex={queIndex} />
        {/* <QuestionStatus/> */}
        <QuestionOverview triggerFun={questionFun} />
      </div>
    </>
  );
}

export default QuizSessoin