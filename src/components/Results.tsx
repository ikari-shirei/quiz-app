import { useEffect, useState } from 'react'
import styled from 'styled-components'

function Results() {
  return (
    <ResultsContainer>
      <h2>Congrat</h2>
      <p>You have {'hey'} correct answers.</p>
      <p>You have {'hey'} wrong answers.</p>
      <p>You didn't answer {'hey'} questions.</p>
    </ResultsContainer>
  )
}

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Results
