import { NavLink, Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import {auth} from "./../firebase/firebase"
import { signOut } from "firebase/auth"
import {doc, getDoc} from 'firebase/firestore'
import styled from 'styled-components'
import { AuthContext } from "../context/AuthContext"
import { db } from "./../firebase/firebase"
import cart from "./../assets/shopping-cart.svg"
import {ShoppingCartDropdown, Button } from "./index"
import {ShoppingCartContext} from "./../context/ShoppingCartContext"
import userIcon from "./../assets/user-small-white.svg"
import arrowIcon from "./../assets/arrow-down-white.svg"
import arrowBackIcon from "./../assets/arrow-back.svg"



const Nav = styled.nav`
  height: 100%;
  background-color: ${props=> props.theme.colors.black};
  color: ${props=> props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  padding: 8px 24px;
  position: relative;
  

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`

const NavBack=styled.nav`
  padding: 8px 24px;
  height: 100%;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  column-gap: 24px;
  border-bottom: 1px solid ${props=> props.theme.colors.neutral[200]};

  button{
    background: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    &:hover{
      background-color: ${props=> props.theme.colors.neutral[50]};
    }

    img{ 
    width: 16px;
    height: 16px;
  }
  }

  

  
`


const Logo = styled.h1<{ $black?: boolean }>`
  color: ${props => props.$black ? props.theme.colors.black : props.theme.colors.white};
`;

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
  padding: 8px 16px;

    &:hover{
      background-color: ${props=> props.theme.colors.neutral[800]};
      border-radius: 10px;

    }

    &.active{
      border-bottom: 2px solid ${props=> props.theme.colors.neutral[50]} ;
      
    }

     &.active:hover {
    background-color: ${props => props.theme.colors.neutral[800]};
    border-radius: 10px 10px 0 0; 
  }
    


`

const DropdownMenu = styled.div`
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
  background-color: ${props=> props.theme.colors.white};;

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

  

  button {
    width: 100%;
  }
`


const CartButton=styled.div`
  position: relative;

  div{
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background-color: ${props=> props.theme.colors.primary[500]};
    position: absolute;
    top: -10px;
    right: -10px;
  }
  
  button{
    background-image: url(${cart});
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
    width: 24px;
    height: 24px;
    padding: 0px;
  }
 
`


const Navbar = () => {
  const currentUser = useContext(AuthContext)
  const {shoppingCartItems} = useContext(ShoppingCartContext)

  const [dropdownMenu, setDropdownMenu]=useState<boolean>(false)
  const [name, setName] = useState<string | null>(null)
  const [shoppingCart, setShoppingCart] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

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

    const logout = async () => {
    try{
      await signOut(auth);
    }catch(error){
      console.log(error)
    }
  }

  const countTotalQuantity = () =>{
      const totalQuantity = shoppingCartItems.reduce((accumulator, currentValue) => {
      const quantity = currentValue.quantity;
      return accumulator + quantity
    },
    0)
    return totalQuantity
  }


  return (
  <>
    {location.pathname === "/order-summary" || location.pathname === "/login" ? (
      <NavBack>
        <button onClick={()=> navigate(-1)}>
          <img src={arrowBackIcon} alt="Back" />
        </button>
        <Logo $black>OrderPizza</Logo>
      </NavBack>
    ) : (
      <>
        <Nav>
          <div>
            <Logo>OrderPizza</Logo>
            <NavList>
              <li><StyledNavLink to='/menu'>Menu</StyledNavLink></li>
              <li><StyledNavLink to='/'>Promotions</StyledNavLink></li>
              <li><StyledNavLink to='/contact'>Contact</StyledNavLink></li>
            </NavList>
          </div>

          {currentUser ? (
            <div>
              <p>Hi, {name}!</p>

              <CartButton>
                <div>{countTotalQuantity()}</div>
                <button onClick={() => setShoppingCart(!shoppingCart)}></button>
              </CartButton>

              <Button 
                buttonType="textWhite" 
                iconLeft={userIcon} 
                iconRight={arrowIcon} 
                onClick={() => setDropdownMenu(!dropdownMenu)}
              >
                My account
              </Button>
            </div>
          ) : (
            <Button buttonType="primary" onClick={() => navigate("./login")}>Log in</Button>
          )}

          {dropdownMenu && (
            <DropdownMenu>
              <ul>
                <li><Link to="/personal-data">Personal data</Link></li>
                <li><Link to="/orders">Orders</Link></li>
              </ul>
              <Button style={{ width: "100%" }} buttonType="secondary" onClick={logout}>Log out</Button>
            </DropdownMenu>
          )}
        </Nav>

        {shoppingCart && <ShoppingCartDropdown />}
      </>
    )}
  </>
);}

export default Navbar