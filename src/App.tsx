import { useEffect, useState } from 'react'
import styled from 'styled-components'
import QuestionCard from './components/QuestionCard'
import getQuestions from './utils/API'
import QuestionRouter from './components/QuestionRouter'
import Results from './components/Results'
import StartOptions from './components/StartOptions'

function App() {
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

  const [results, setResults] = useState<{
    correctCount: number
    incorrectCount: number
    emptyCount: number
  } | null>(null)

  const [amount, setAmount] = useState<number>(10)
  const [category, setCategory] = useState<number>(0)
  const [difficulty, setDifficulty] = useState<string>('')
  const [questionType, setQuestionType] = useState<string>('')

  function getData() {
    const localStorageQuestions: string | null =
      localStorage.getItem('questions')

    getQuestions(amount, category, difficulty, questionType)

    if (localStorageQuestions) {
      setQuestions(JSON.parse(localStorageQuestions))
    }

    if (localStorageQuestions) {
      console.log(JSON.parse(localStorageQuestions))
    }
  }

  function getLocalStorageQuestions() {
    const localStorageQuestions: string | null =
      localStorage.getItem('questions')

    if (localStorageQuestions) {
      setQuestions(JSON.parse(localStorageQuestions))
    }
  }

  useEffect((): any => {
    getLocalStorageQuestions()
  }, [localStorage.getItem('questions')])

  return (
    <AppContainer className="App">
      {isQuizActive ? (
        <div>
          <QuestionRouter
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setIsQuizActive={setIsQuizActive}
          />
          <QuestionCard
            questions={questions}
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            setResults={setResults}
            getLocalStorageQuestions={getLocalStorageQuestions}
          />
        </div>
      ) : (
        <div>
          <StartOptions
            questions={questions}
            setIsQuizActive={setIsQuizActive}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            getData={getData}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            questionType={questionType}
            setQuestionType={setQuestionType}
          />
          {!isQuizActive && results ? <Results /> : ''}
        </div>
      )}
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;
`

export default App
