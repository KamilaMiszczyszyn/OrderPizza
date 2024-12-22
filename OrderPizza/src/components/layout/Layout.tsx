import { Outlet } from 'react-router-dom'
import { Navbar, Footer} from './../index'
import styled from 'styled-components'
import {NavbarAdmin} from "./index"
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas: 
    "nav"
    "main"
    "footer";
`

const ContainerAdmin = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 300px 1fr;
  grid-template-areas: 
    "navAdmin mainAdmin"
`

const NavContainer=styled.div`
  grid-area: nav;
  
`
const NavContainerAdmin=styled.div`
  grid-area: navAdmin;
`
const Main=styled.div`
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainAdmin=styled.div`
  grid-area: mainAdmin;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FooterContainer=styled.div`
  grid-area: footer
`

const Layout = () => {
 
  const { role } = useContext(AuthContext); // Pobierz rolę użytkownika
  const location = useLocation();

  // Sprawdzamy, czy jesteśmy na stronie admina
  const isAdminPage = location.pathname.startsWith('/orders-management') || location.pathname.startsWith('/orders-history') 
  
  // Sprawdzamy, czy użytkownik jest adminem (np. z roli)
  const isAdmin = role === 'admin';

  console.log(isAdmin)
  console.log(isAdminPage)

  



  return (
    <>
    { isAdmin && isAdminPage ? (
      <ContainerAdmin>
        <NavContainerAdmin>
         <NavbarAdmin/>
        </NavContainerAdmin>
        <MainAdmin>
          <Outlet/>
        </MainAdmin>
      </ContainerAdmin>
    ) : (
      <Container>
        <NavContainer>
          <Navbar />
        </NavContainer>

        <Main>
          <Outlet/>
        </Main>

        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Container>
    )}
    </>
    
  )
}

export default Layout

