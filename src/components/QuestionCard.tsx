import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface QuestionCardProps {
  currentQuestion: any
}

function QuestionCard({ currentQuestion }: QuestionCardProps) {
  const [allAnswers, setAllAnswers] = useState<string[]>([])

  function uniteAnswers() {
    if (currentQuestion && currentQuestion.type === 'multiple') {
      setAllAnswers([
        currentQuestion.incorrect_answers[0],
        currentQuestion.incorrect_answers[1],
        currentQuestion.incorrect_answers[2],
        currentQuestion.correct_answer,
      ])
    }
  }

  useEffect(() => {
    uniteAnswers()
  }, [currentQuestion])

  function randomizeAnswers() {
    setAllAnswers((prevAnswers) =>
      prevAnswers.sort(() => (Math.random() > 0.5 ? 1 : -1))
    )
  }

  useEffect(() => {
    if (allAnswers !== []) {
      randomizeAnswers()
    }
  }, [allAnswers])

  return (
    currentQuestion && (
      <div className="QuestionCard">
        <CardContainer key={currentQuestion.question}>
          <p>{currentQuestion.category}</p>

          <p>{currentQuestion.difficulty}</p>

          {currentQuestion.type === 'multiple' && (
            <ul>
              {allAnswers.map((answer: string) => {
                return <li key={answer}>{answer}</li>
              })}
            </ul>
          )}

          {currentQuestion.type === 'boolean' && (
            <ul>
              <li>True</li>
              <li>False</li>
            </ul>
          )}

          <p>{currentQuestion.category}</p>
          <p>{currentQuestion.type}</p>
        </CardContainer>
      </div>
    )
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid black;
  margin: 16px;
`

export default QuestionCard
