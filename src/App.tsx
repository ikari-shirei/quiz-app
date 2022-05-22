import { useState } from 'react'
import styled from 'styled-components'
import QuestionCard from './components/QuestionCard'
import getQuestions from './utils/API'
import QuestionRouter from './components/QuestionRouter'
import Results from './components/Results'
import StartOptions from './components/StartOptions'

interface selectedAnswersObj {
  correct_answer: string
  userAnswer: string
}

function App() {
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

  const [userAnswers, setUserAnswers] = useState<selectedAnswersObj[]>([])
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
    setQuestions([])
    getQuestions(amount, category, difficulty, questionType, setQuestions)
  }

  return (
    <AppContainer className="App">
      {isQuizActive ? (
        <div>
          <QuestionRouter
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setIsQuizActive={setIsQuizActive}
            setAmount={setAmount}
            setDifficulty={setDifficulty}
            setQuestionType={setQuestionType}
            userAnswers={userAnswers}
            setResults={setResults}
          />
          <QuestionCard
            questions={questions}
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
        </div>
      ) : (
        <div>
          <StartOptions
            questions={questions}
            setIsQuizActive={setIsQuizActive}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            getData={getData}
            setAmount={setAmount}
            setCategory={setCategory}
            setDifficulty={setDifficulty}
            setQuestionType={setQuestionType}
            setResults={setResults}
          />
          {/* Show results */}
          {!isQuizActive && results ? <Results results={results} /> : ''}
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
