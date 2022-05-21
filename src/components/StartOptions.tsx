import styled from 'styled-components'
import Select from 'react-select'
import { useEffect, useState } from 'react'

interface OptionsProps {
  questions: any[]
  setIsQuizActive: any
  setCurrentQuestionIndex: any
  getData: any
  amount: number
  setAmount: any
  category: number
  setCategory: any
  difficulty: string
  setDifficulty: any
  questionType: string
  setQuestionType: any
}

function Options({
  questions,
  setIsQuizActive,
  setCurrentQuestionIndex,
  getData,
  amount,
  setAmount,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  questionType,
  setQuestionType,
}: OptionsProps) {
  function handleAmountChange(e: any) {
    console.log(e.target.value, 'target value')
    if (Number(e.target.value) < 10) {
      setAmount(10)
    } else if (Number(e.target.value) > 50) {
      setAmount(50)
    } else {
      setAmount(Number(e.target.value))
    }
  }

  function handleCategoryOptions(e: any) {
    if (e.value === 'any') {
      setCategory('')
    } else {
      setCategory(e.value)
    }
  }

  function handleDifficultyOptions(e: any) {
    if (e.value === 'any') {
      setDifficulty('')
    } else {
      setDifficulty(e.value)
    }
  }

  function handleTypeOptions(e: any) {
    if (e.value === 'any') {
      setQuestionType('')
    } else {
      setQuestionType(e.value)
    }
  }

  const categoryOptions = []

  const difficultyOptions = [
    { value: 'any', label: 'Any' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ]

  const typeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'multiple', label: 'Multiple' },
    { value: 'boolean', label: 'Boolean' },
  ]

  function startQuiz(e: any) {
    e.preventDefault()

    localStorage.removeItem('questions')
    getData()
    setCurrentQuestionIndex(0)
    setIsQuizActive(true)
  }

  useEffect(() => {}, [questions])

  return (
    <OptionsContainer>
      <FormContainer>
        <AmountContainer>
          <label htmlFor="questionAmount">
            <h2>Amount</h2>
            <input
              type="number"
              id="questionAmount"
              name="questionAmount"
              min="10"
              max="50"
              onChange={handleAmountChange}
              placeholder="Between 10 - 50"
            ></input>
          </label>
        </AmountContainer>

        {/*     <CategoryContainer>
          <h2>Category</h2>
          <Select
            onChange={handleCategoryOptions}
            options={typeOptions}
            placeholder={'Any'}
          />
        </CategoryContainer> */}

        <DifficultyContainer>
          <h2>Difficulty: </h2>
          <Select
            onChange={handleDifficultyOptions}
            options={difficultyOptions}
            placeholder={'Any'}
          />
        </DifficultyContainer>
        <TypeContainer>
          <h2>Type: </h2>
          <Select
            onChange={handleTypeOptions}
            options={typeOptions}
            placeholder={'Any'}
          />
        </TypeContainer>

        <input type="submit" value="Start Quiz" onClick={startQuiz} />
      </FormContainer>
    </OptionsContainer>
  )
}

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`

const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;

  input {
    display: flex;
    width: 100%;
    height: 38px;

    font-size: 1rem;

    padding: 0;
    border: 1px solid #00000034;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DifficultyContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default Options