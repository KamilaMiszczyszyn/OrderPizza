import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from './../index'
import styled from 'styled-components'


const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas: 
    "nav"
    "main"
    "footer";
`

const NavContainer=styled.div`
  grid-area: nav;
`

const Main=styled.div`
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FooterContainer=styled.div`
  grid-area: footer
`

const Layout = () => {
  return (
    <Container>
      <NavContainer>
        <Navbar />
      </NavContainer>
      
      <Main >
        <Outlet />
      </Main>

      <FooterContainer>
       <Footer />
      </FooterContainer>
    </Container>
    
  )
}

export default Layout