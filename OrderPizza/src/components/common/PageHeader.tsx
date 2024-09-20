import styled from "styled-components"

const H1 = styled.h1`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.neutral[900]};
    font-size: 4.0rem;
    padding: 16px;
`
const PageHeader = ({children}) => {
  return (
    <H1>{children}</H1>
  )
}

export default PageHeader