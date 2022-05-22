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
    const askPermission = window.confirm('Are you sure?')

    if (askPermission) {
      calculateResults()
      setIsQuizActive(false)

      // Clear options
      setAmount(10)
      setDifficulty('')
      setQuestionType('')
    }
  }

  return (
    <QuestionRouterContainer>
      <button
        onClick={goBackward}
        className={isBackButtonActive ? '' : 'passive'}
      >
        Back
      </button>
      <button
        onClick={goForward}
        className={isForwardButtonActive ? '' : 'passive'}
      >
        Forward
      </button>

      <button className="complete-button" onClick={completeQuiz}>
        Complete
      </button>
    </QuestionRouterContainer>
  )
}

const QuestionRouterContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    font-weight: bold;
    background-color: transparent;

    width: 120px;
    height: 40px;
    border: solid 2px black;
    margin: 16px;
    padding: 16px auto;
    cursor: pointer;
  }

  .complete-button {
    color: white;
    border: none;
    background-color: #15133c;
    transition: 0.2s;

    &:hover {
      transition: 0.2s;
      border: none;
      background-color: rgba(14, 174, 87, 1);
    }
  }

  .passive {
    opacity: 0.3;
  }
`

export default QuestionRouter
