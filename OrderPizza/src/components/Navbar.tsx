import { NavLink } from "react-router-dom"
import { useState } from "react"
import {auth} from "./../firebase/firebase"
import { signOut } from "firebase/auth"
import styled from 'styled-components'

const Nav = styled.nav`
  height: 100%;
  background-color: ${props=> props.theme.colors.primary};
  color: ${props=> props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`

const BrandName = styled.h1`
  color: ${props=> props.theme.colors.white};
`

const NavList= styled.ul`
  display: flex;
  gap: 20px;

  li {
    list-style-type: none;
  }
`
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${props=> props.theme.colors.white};
`

const DropdownMenu = styled.div`
  position: relative;
  top: 0;
  left:0;
`


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu]=useState<boolean>(false)

  const logout = async () => {
    try{
      await signOut(auth);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <Nav>
      <div >
        <BrandName>OrderPizza</BrandName>
          <NavList>
            <li><StyledNavLink to='/'>Menu</StyledNavLink></li>
            <li><StyledNavLink to='/'>Promotions</StyledNavLink></li>
            <li><StyledNavLink to='/'>Contact</StyledNavLink></li>
          </NavList>
      </div>

      <div>
        <p> Hello, name!</p>
        <button onClick={()=> dropdownMenu ? setDropdownMenu(false) : setDropdownMenu(true)}>MORE</button>
      </div>   
    </Nav>
    {dropdownMenu && 
      <DropdownMenu>
        <ul>
          
        </ul>
        <button onClick={logout}>Log out</button>
      </DropdownMenu>}
    </>
  
  )
}

export default Navbar