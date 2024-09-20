import styled from "styled-components"
import SectionHeader from "./SectionHeader"

const Container = styled.section`
    padding: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    
`

const SectionContainer = ({title, children}) => {
  return (
    <Container>
        <SectionHeader>{title}</SectionHeader>
        <div>{children}</div>
    </Container>
  )
}

export default SectionContainer