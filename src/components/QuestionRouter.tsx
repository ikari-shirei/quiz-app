import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface QuestionRouterProps {
  currentQuestionIndex: number
  setCurrentQuestionIndex: any
  questions: any
}

function QuestionRouter({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questions,
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

      {!isForwardButtonActive && <button>Complete Quiz</button>}
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

  .active {
  }

  .passive {
    opacity: 0.3;
  }
`

export default QuestionRouter
