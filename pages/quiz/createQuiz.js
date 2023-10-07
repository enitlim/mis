import React,{useState} from 'react'
import { useSelector } from "react-redux";
import UnauthorizedPage from './components/unauthorizedPage';
import Typography from '@mui/material/Typography'
import MenuAppBar from '../CommonComponents/menuAppBar';
import CreateQuizOverview from './components/createQuizOverview';
import CreateQuizQuestion from './components/createQuizQuestion';
const CreateQuiz = () => {
  const [swipe, setSwipe] = useState(false)
  const [quizId, setQuizId] = useState(null)
  const [quizName, setQuizName] = useState(null);
  const swipeToQues=(quiz_id, quizName)=>{    
    setQuizId(quiz_id);
    setQuizName(quizName);
    setSwipe(true)
  }
    const userData=useSelector((state)=>state.user)
  if (!userData || userData.user.role!=="admin") {
    return <UnauthorizedPage />;
  }
  return (
    <>
      <MenuAppBar />
      {swipe && quizId !== null ? (
        <CreateQuizQuestion quiz_Id={quizId} quiz_Name={quizName}/>
      ) : (
        <CreateQuizOverview swipeQue={swipeToQues} />
      )}
    </>
  );
}

export default CreateQuiz