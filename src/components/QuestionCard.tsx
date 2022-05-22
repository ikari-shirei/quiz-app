import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface selectedAnswersObj {
  correct_answer: string
  userAnswer: string
}

interface QuestionCardProps {
  currentQuestion: CurrentQuestion
  currentQuestionIndex: number
  questions: any[]
  setResults: any
  userAnswers: selectedAnswersObj[]
  setUserAnswers: any
}

interface CurrentQuestion {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

function QuestionCard({
  questions,
  currentQuestion,
  currentQuestionIndex,
  setResults,
  userAnswers,
  setUserAnswers,
}: QuestionCardProps) {
  const [allAnswers, setAllAnswers] = useState<any[]>([])

  function initiateUserAnswers() {
    setUserAnswers(
      questions.map((question: any) => {
        return { correct_answer: question.correct_answer, userAnswer: '' }
      })
    )
  }

  useEffect(() => {
    initiateUserAnswers()
  }, [questions])

  // Concatenate wrong answers and correct answer
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

  // Save user's answer
  function saveAnswer(e: any) {
    const answerId = e.target.id
    const currentUserAnswer = userAnswers[currentQuestionIndex]['userAnswer']
    const currentCorrectAnswer =
      userAnswers[currentQuestionIndex]['correct_answer']

    // If user answered question, the answer cannot be changed
    if (currentUserAnswer === '') {
      setUserAnswers((prev: selectedAnswersObj[]) => {
        const newAnswers = prev.map((x) => {
          return prev[currentQuestionIndex] === x
            ? { ...x, userAnswer: answerId }
            : x
        })

        return newAnswers
      })
    }
  }

  function applyClassBoolean(answer: string) {
    let selectedClassName: string = ''

    let userAnswer: string
    let correctAnswer: string

    if (userAnswers.length !== 0 && userAnswers) {
      userAnswer = userAnswers[currentQuestionIndex]['userAnswer']
      correctAnswer = userAnswers[currentQuestionIndex]['correct_answer']

      // Correct answer, it is applied in any scenario
      if (answer === correctAnswer && userAnswer !== '') {
        selectedClassName = 'correctAnswer'
      }

      // If user answered correct, other choice wouldn't get highlighted
      if (answer !== correctAnswer && userAnswer !== '') {
        selectedClassName = ''
      }

      // Wrong answer
      if (answer !== correctAnswer && userAnswer === answer) {
        selectedClassName = 'incorrectAnswer'
      }
    }

    return selectedClassName
  }

  function applyClassMultiple(answer: string) {
    let selectedClassName: string = ''

    let userAnswer: string
    let correctAnswer: string

    if (userAnswers.length !== 0 && userAnswers) {
      userAnswer = userAnswers[currentQuestionIndex]['userAnswer']
      correctAnswer = userAnswers[currentQuestionIndex]['correct_answer']

      // Correct answer
      if (userAnswer === correctAnswer && answer === correctAnswer) {
        selectedClassName = 'correctAnswer'
      }

      // If user answer wrong, show correct answer anyway
      if (userAnswer !== '' && answer === correctAnswer) {
        selectedClassName = 'correctAnswer'
      }

      // Incorrect answer
      if (userAnswer !== correctAnswer && answer === userAnswer) {
        selectedClassName = 'incorrectAnswer'
      }
    }

    return selectedClassName
  }

  function applyClassDifficulty(difficulty: string) {
    let selectedClassName: string = ''

    if (difficulty === 'easy') {
      selectedClassName = 'green'
    }

    if (difficulty === 'medium') {
      selectedClassName = 'orange'
    }

    if (difficulty === 'hard') {
      selectedClassName = 'red'
    }

    return selectedClassName
  }

  return (
    currentQuestion && (
      <div className="QuestionCard">
        <CardContainer key={currentQuestion.question}>
          <Header>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Header>
          <Category>{currentQuestion.category}</Category>
          <Difficulty>
            <span className={applyClassDifficulty(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </span>
          </Difficulty>

          <Question
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></Question>

          {/* Multiple answers */}
          {currentQuestion.type === 'multiple' && (
            <Answers>
              {allAnswers[currentQuestionIndex] &&
                allAnswers[currentQuestionIndex].map((answer: string) => {
                  return (
                    <li
                      onClick={saveAnswer}
                      key={answer}
                      id={answer}
                      dangerouslySetInnerHTML={{ __html: answer }}
                      className={applyClassMultiple(answer)}
                    ></li>
                  )
                })}
            </Answers>
          )}

          {/* Boolean answers */}
          {currentQuestion.type === 'boolean' && (
            <Answers>
              <li
                onClick={saveAnswer}
                id="True"
                className={applyClassBoolean('True')}
              >
                True
              </li>
              <li
                onClick={saveAnswer}
                id="False"
                className={applyClassBoolean('False')}
              >
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

  .green {
    color: green;
  }

  .orange {
    color: orange;
  }

  .red {
    color: red;
  }
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
