import { useEffect, useState } from 'react'
import styled from 'styled-components'
import QuestionCard from './components/QuestionCard'
import getQuestions from './utils/API'
import QuestionRouter from './components/QuestionRouter'

function App() {
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

  function getData() {
    const localStorageQuestions: string | null =
      localStorage.getItem('questions')

    if (localStorageQuestions) {
      setQuestions(JSON.parse(localStorageQuestions))
    } else {
      getQuestions()
    }

    if (localStorageQuestions) {
      console.log(JSON.parse(localStorageQuestions))
    }
  }

  useEffect((): any => {
    getData()
  }, [])

  return (
    <AppDiv className="App">
      <QuestionRouter
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
      <QuestionCard
        questions={questions}
        currentQuestion={questions[currentQuestionIndex]}
        currentQuestionIndex={currentQuestionIndex}
      />
    </AppDiv>
  )
}

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default App
