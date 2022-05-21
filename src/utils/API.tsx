import axios from 'axios'

async function getQuestions(
  amount: number,
  category: number,
  difficulty: string,
  questionType: string
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
      console.log(response.data.results, 'API CALL saved to local storage')
      localStorage.setItem('questions', JSON.stringify(response.data.results))
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getQuestions
