import axios from 'axios'

const api: any = process.env.REACT_APP_API_KEY

async function getQuestions() {
  axios
    .get(api)
    .then((response) => {
      console.log(response.data.results, 'API CALL')
      localStorage.setItem('questions', JSON.stringify(response.data.results))
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getQuestions
