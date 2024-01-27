import { NavLink } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import {auth} from "./../firebase/firebase"
import { signOut } from "firebase/auth"
import {doc, getDoc} from 'firebase/firestore'
import styled from 'styled-components'
import { AuthContext } from "../context/AuthContext"
import { db } from "./../firebase/firebase"

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
  const currentUser = useContext(AuthContext)
  const [dropdownMenu, setDropdownMenu]=useState<boolean>(false)
  const[name, setName] = useState<string | null>(null)

  const logout = async () => {
    try{
      await signOut(auth);
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() =>{

    const getData = async(user: string | null)=> {
      if(user){
        try{
          const docRef = doc(db, "users", user);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userPersonalData = docSnap.data();
            setName(userPersonalData.firstName)
             } else {
                 console.log("No such document!");
            } 
        }catch (error) {
            console.log(error)
            }}

    }

    getData(currentUser)
    



  }, [currentUser])




  return (
    <>
    <Nav>
      <div >
        <BrandName>OrderPizza</BrandName>
          <NavList>
            <li><StyledNavLink to='/menu'>Menu</StyledNavLink></li>
            <li><StyledNavLink to='/'>Promotions</StyledNavLink></li>
            <li><StyledNavLink to='/'>Contact</StyledNavLink></li>
          </NavList>
      </div>

      <div>
        <p>Hello, {name}!</p>
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