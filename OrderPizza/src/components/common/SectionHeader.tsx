import styled from "styled-components"

const H2 = styled.h2`
    width: 100%;
    font-size: 3.2rem;
    padding: 8px;
`
const SectionHeader = ({children}) => {
  return (
    <H2>{children}</H2>
  )
}

export default SectionHeader