import React from 'react'
import QuizList from './quizList'
import Head from "next/head";

const QuizHome = () => {
  return (
    <>
      {/* <html lang="en"></html> */}
      <Head>
        <title>Quiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {/* user Portion */}
      <QuizList />
  
    </>
  );
}

export default QuizHome