import axios from 'axios'

async function getQuestions(
  amount: number,
  category: number,
  difficulty: string,
  questionType: string,
  setQuestions: any
) {
  const api = `https://opentdb.com/api.php?amount=${amount}${
    category !== 0 ? `&category=` + category : ''
  }${difficulty && `&difficulty=` + difficulty}${
    questionType && `&type=` + questionType
  }`

  console.log(api)

  axios
    .get(api)
    .then((response) => {
      setQuestions(response.data.results)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getQuestions
