import styled from 'styled-components'

function Results({ results }: any) {
  return (
    <ResultsContainer>
      <div>
        <h2>Results</h2>
      </div>
      <div>
        <p>{results.correctCount}</p>
        <p>correct answers.</p>
      </div>
      <div>
        <p>{results.incorrectCount}</p>
        <p>wrong answers.</p>
      </div>
      <div>
        <p>{results.emptyCount}</p>
        <p>empty questions.</p>
      </div>
    </ResultsContainer>
  )
}

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 16px;

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.685);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  h2 {
    text-align: left;
  }

  p {
    font-size: 1.2rem;
    margin: 16px 32px;
    font-weight: bold;
    color: white;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  div:nth-child(1) {
    padding-left: 32px;
    width: 100%;
    height: 100%;
  }

  div:nth-child(2) {
    background-color: rgba(14, 174, 87, 1);
    width: 100%;
    height: 100%;
  }

  div:nth-child(3) {
    background-color: #ec1c1c;
    width: 100%;
    height: 100%;
  }

  div:nth-child(4) {
    background-color: #15133c;
    width: 100%;
    height: 100%;
    border-radius: 0 0 16px 16px;
  }
`

export default Results
