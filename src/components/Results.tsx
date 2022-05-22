import { useEffect, useState } from 'react'
import styled from 'styled-components'

function Results({ results }: any) {
  console.log(results, 'result compon')

  return (
    <ResultsContainer>
      <h2>Congrat</h2>
      <p>You have {results.correctCount} correct answers.</p>
      <p>You have {results.incorrectCount} wrong answers.</p>
      <p>You didn't answer {results.emptyCount} questions.</p>
    </ResultsContainer>
  )
}

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Results
