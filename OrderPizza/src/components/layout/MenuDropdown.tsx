
import styled from 'styled-components'
import closeIcon from "./../../assets/close.svg"
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { signOut } from "firebase/auth"
import {auth} from "./../../firebase/firebase"
import {Button} from "./../index"


const Container=styled.div`
position: absolute;
  top: 60px;
  right:24px;
  box-shadow: ${props=> props.theme.shadow};
  width: 300px;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid ${props=> props.theme.colors.neutral[200]};
  background-color: ${props=> props.theme.colors.white};

   @media (max-width: 490px) {
    border-radius: 0;
      top: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
      justify-content: flex-start;
      align-items: flex-start;
     
    }
  

  ul{
    list-style: none;
    width: 100%;
    border-bottom: 1px solid ${props=> props.theme.colors.neutral[200]};
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    li {
    padding: 8px 0;

    a {
      text-decoration: none;
      display: block;
      padding: 8px 16px;

    &:hover {
        background-color: ${props => props.theme.colors.neutral[50]};
        border-radius: 10px;
      }
    }
    
  }


  }

  ul.nav{
    display: none;

    @media (max-width: 490px) {
      display: initial;
     
    }


  }

`

const CloseButton=styled.button`
background: none;
display: none;

@media (max-width: 490px) {
        display: initial;
        position: absolute;
        top: 24px;
        right: 24px;
        }
`
const Logo = styled.h1`
  color: ${props => props.theme.colors.neutral[900]};
  margin-bottom: 24px;
  display: none;
   @media (max-width: 490px) {
        display: initial;
        
        }


`;

 const logout = async () => {
    try{
      await signOut(auth);
    }catch(error){
      console.log(error)
    }
  }

const MenuDropdown = ({dropdownMenu, setDropdownMenu}) => {
     const navigate = useNavigate();
     const currentUser = useContext(AuthContext)
  return (
    <Container>
              <CloseButton onClick={() => setDropdownMenu(!dropdownMenu)}><img src={closeIcon} alt="Close"/></CloseButton>
              <Logo>OrderPizza</Logo>
              <ul className="nav">
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/promotions">Promotions</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
              <ul>
                <li><Link to="/personal-data">Personal data</Link></li>
                <li><Link to="/orders">Orders</Link></li>
              </ul>
              
          {currentUser ? 
              <Button style={{ width: "100%" }} buttonType="secondary" onClick={logout}>Log out</Button>
              :
              <div className="logged-out">
                <Button buttonType="primary" style={{width: "100%"}} onClick={() => navigate("./login")}>Log in</Button>
            </div>

          }
            </Container>
  )
}

export default MenuDropdown