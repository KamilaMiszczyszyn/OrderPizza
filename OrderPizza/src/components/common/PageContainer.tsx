import styled from "styled-components"
import {PageHeader} from "./../index"


interface ComponentProps {
  title?: string,
  children: React.ReactNode,
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 48px;
    width: 100%;
    
`
const PageContainer = ({title, children}: ComponentProps) => {
  return (
    <Container>
        <PageHeader>{title}</PageHeader>
        <div>{children}</div>
    </Container>
  )
}

export default PageContainer