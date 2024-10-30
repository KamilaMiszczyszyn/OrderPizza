import styled from "styled-components"

const H2 = styled.h2`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.neutral[900]};
    font-size: 4.0rem;
    padding: 16px;
`
const PageHeader = ({children}) => {
  return (
    <H2>{children}</H2>
  )
}

export default PageHeader