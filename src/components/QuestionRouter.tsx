import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface QuestionRouterProps {
  currentQuestionIndex: number
  setCurrentQuestionIndex: any
  questions: any
  setIsQuizActive: any
  setAmount: any
  setDifficulty: any
  setQuestionType: any
  userAnswers: any[]
  setResults: any
}

function QuestionRouter({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questions,
  setIsQuizActive,
  setAmount,
  setDifficulty,
  setQuestionType,
  userAnswers,
  setResults,
}: QuestionRouterProps) {
  const [isBackButtonActive, setIsBackButtonActive] = useState<boolean>(false)
  const [isForwardButtonActive, setIsForwardButtonActive] =
    useState<boolean>(true)

  function goBackward() {
    if (currentQuestionIndex >= 1) {
      setCurrentQuestionIndex((prev: any) => prev - 1)
    }
  }

  function goForward() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: any) => prev + 1)
    }
  }

  // Is backward button active
  useEffect(() => {
    if (currentQuestionIndex >= 1) {
      setIsBackButtonActive(true)
    } else {
      setIsBackButtonActive(false)
    }
  }, [currentQuestionIndex])

  // Is forward button active
  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsForwardButtonActive(false)
    } else {
      setIsForwardButtonActive(true)
    }
  }, [currentQuestionIndex])

  function calculateResults() {
    let correct: number = 0
    let incorrect: number = 0
    let empty: number = 0

    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i].correct_answer === userAnswers[i].userAnswer) {
        correct = correct + 1
      }

      // Incorrect
      if (
        userAnswers[i].correct_answer !== userAnswers[i].userAnswer &&
        userAnswers[i].userAnswer !== ''
      ) {
        incorrect += 1
      }

      // Empty
      if (userAnswers[i].userAnswer === '') {
        empty += 1
      }
    }

    setResults({
      correctCount: correct,
      incorrectCount: incorrect,
      emptyCount: empty,
    })
  }

  function completeQuiz() {
    calculateResults()
    setIsQuizActive(false)

    // Clear options
    setAmount(10)
    setDifficulty('')
    setQuestionType('')
  }

  return (
    <QuestionRouterContainer>
      <button
        onClick={goBackward}
        className={isBackButtonActive ? 'active' : 'passive'}
      >
        Back
      </button>
      <button
        onClick={goForward}
        className={isForwardButtonActive ? 'active' : 'passive'}
      >
        Forward
      </button>

      {!isForwardButtonActive && (
        <button onClick={completeQuiz}>Complete Quiz</button>
      )}
    </QuestionRouterContainer>
  )
}

const QuestionRouterContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    font-weight: bold;
    background-color: transparent;

    width: 100px;
    height: 35px;
    border: solid 2px black;
    margin: 16px;
    cursor: pointer;
  }

  .passive {
    opacity: 0.3;
  }
`

export default QuestionRouter
