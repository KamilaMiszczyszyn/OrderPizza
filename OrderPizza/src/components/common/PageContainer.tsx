import styled from "styled-components"
import PageHeader from "./PageHeader"

const Container = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 48px;
    width: 864px;
    
`
const PageContainer = ({title, children}) => {
  return (
    <Container>
        <PageHeader>{title}</PageHeader>
        <div>{children}</div>
    </Container>
  )
}

export default PageContainer