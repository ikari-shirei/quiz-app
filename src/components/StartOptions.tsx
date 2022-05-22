import styled from 'styled-components'
import Select from 'react-select'
import { useEffect } from 'react'

interface OptionsProps {
  questions: any[]
  setIsQuizActive: any
  setCurrentQuestionIndex: any
  getData: any
  setAmount: any
  setCategory: any
  setDifficulty: any
  setQuestionType: any
  setResults: any
}

function Options({
  questions,
  setIsQuizActive,
  setCurrentQuestionIndex,
  getData,
  setAmount,
  setCategory,
  setDifficulty,
  setQuestionType,
  setResults,
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
    { value: 'boolean', label: 'True False' },
  ]

  function startQuiz(e: any) {
    e.preventDefault()

    getData()
    setResults(null)
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
              defaultValue={10}
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
          <h2>Difficulty</h2>
          <Select
            onChange={handleDifficultyOptions}
            options={difficultyOptions}
            placeholder={'Any'}
          />
        </DifficultyContainer>
        <TypeContainer>
          <h2>Type</h2>
          <Select
            onChange={handleTypeOptions}
            options={typeOptions}
            placeholder={'Any'}
          />
        </TypeContainer>

        <StartButtonInput
          type="submit"
          value="Start Quiz"
          onClick={startQuiz}
        />
      </FormContainer>
    </OptionsContainer>
  )
}

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #15133c;
  padding: 16px;
  margin: 16px;

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.685);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  h2 {
    font-size: 1rem;
    margin-top: 24px;
    margin-bottom: 8px;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 0;
    margin: 0;

    overflow: hidden;
    box-sizing: border-box;
  }

  input {
    display: flex;
    width: 100%;
    height: 38px;
    font-size: 1rem;
    padding-left: 16px;
    border: none;
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

const StartButtonInput = styled.input`
  margin: 32px 0;

  border: none;
  background-color: #15133c;
  color: white;
  font-weight: bold;

  width: 100%;
  height: 38px;

  transition: 0.2s;
  transition-timing-function: ease-out;
  cursor: pointer;

  &:hover {
    transition: 0.2s;
    border: none;
    background-color: rgba(14, 174, 87, 1);
  }
`

export default Options
