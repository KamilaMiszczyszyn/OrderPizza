import styled from "styled-components"

const H3 = styled.h3`
    width: 100%;
    font-size: 3.2rem;
`
const SectionHeader = ({children}) => {
  return (
    <H3>{children}</H3>
  )
}

export default SectionHeader