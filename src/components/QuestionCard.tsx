import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface QuestionCardProps {
  currentQuestion: CurrentQuestion
  currentQuestionIndex: number
  questions: any[]
}

interface CurrentQuestion {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

interface selectedAnswersObj {
  correct_answer: string
  userAnswer: string
}

function QuestionCard({
  questions,
  currentQuestion,
  currentQuestionIndex,
}: QuestionCardProps) {
  const [allAnswers, setAllAnswers] = useState<any[]>([])
  const [userAnswers, setUserAnswers] = useState<selectedAnswersObj[]>([])

  function initiateUserAnswers() {
    if (questions) {
      setUserAnswers(
        questions.map((question: any) => {
          return { correct_answer: question.correct_answer, userAnswer: '' }
        })
      )
    }
  }

  useEffect(() => {
    initiateUserAnswers()
  }, [questions])

  function uniteAnswers() {
    const unitedAnswers = questions.map((question: any) => {
      if (question.type === 'multiple') {
        return [
          question.incorrect_answers[0],
          question.incorrect_answers[1],
          question.incorrect_answers[2],
          question.correct_answer,
        ]
      }
    })

    setAllAnswers(unitedAnswers)
  }

  function randomizeAnswers() {
    if (allAnswers !== []) {
      console.log(allAnswers, 'all anwswers')
      setAllAnswers((prev) =>
        prev.map((answers: any) => {
          if (answers) {
            return answers.sort(() => (Math.random() > 0.5 ? 1 : -1))
          }
        })
      )
    }
  }

  useEffect(() => {
    uniteAnswers()
    randomizeAnswers()
  }, [questions])

  useEffect(() => {
    console.log(allAnswers)
  }, [allAnswers])

  function checkAnswer(e: any) {
    const answerId = e.target.id
    const currentUserAnswer = userAnswers[currentQuestionIndex]['userAnswer']

    if (currentUserAnswer === '') {
      setUserAnswers((prev) => [
        ...prev,
        (prev[currentQuestionIndex]['userAnswer'] = answerId),
      ])
    }

    console.log(userAnswers)
  }

  return (
    currentQuestion && (
      <div className="QuestionCard">
        <CardContainer key={currentQuestion.question}>
          <Header>Question {currentQuestionIndex + 1}</Header>
          <Category>{currentQuestion.category}</Category>
          <Difficulty>{currentQuestion.difficulty}</Difficulty>

          <Question
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></Question>

          {currentQuestion.type === 'multiple' && (
            <Answers>
              {allAnswers[currentQuestionIndex] &&
                allAnswers[currentQuestionIndex].map((answer: string) => {
                  return (
                    <li
                      onClick={checkAnswer}
                      key={answer}
                      id={answer}
                      dangerouslySetInnerHTML={{ __html: answer }}
                      className={
                        userAnswers[currentQuestionIndex].correct_answer ===
                          userAnswers[currentQuestionIndex].userAnswer &&
                        answer ===
                          userAnswers[currentQuestionIndex].correct_answer
                          ? 'correctAnswer'
                          : userAnswers[currentQuestionIndex].userAnswer !==
                              '' &&
                            userAnswers[currentQuestionIndex].userAnswer ===
                              answer
                          ? 'incorrectAnswer'
                          : ''
                      }
                    ></li>
                  )
                })}
            </Answers>
          )}

          {currentQuestion.type === 'boolean' && (
            <Answers>
              <li onClick={checkAnswer} id="True" className={''}>
                True
              </li>
              <li onClick={checkAnswer} id="False" className={''}>
                False
              </li>
            </Answers>
          )}
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

const Header = styled.h1`
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  margin: 16px;
  margin-bottom: 0;
`

const Category = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  padding: 0;
  margin: 0;
  margin: 0 16px;
`

const Difficulty = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  padding: 0;
  margin: 0;
  margin: 0 16px;
  color: green;
`

const Question = styled.h3`
  font-size: 1.2rem;
  font-weight: normal;
  padding: 0;
  margin: 0;
  margin: 16px;
`

const Answers = styled.ul`
  font-size: 1rem;
  font-weight: normal;
  margin: 16px;
  padding: 0;

  li:first-child {
    margin-top: 0;
  }

  li {
    list-style: none;
    border: 2px solid black;
    padding: 16px;
    margin-top: 8px;
    cursor: pointer;
  }

  .correctAnswer {
    background-color: green;
    color: white;
  }

  .incorrectAnswer {
    background-color: red;
    color: white;
  }
`

export default QuestionCard
