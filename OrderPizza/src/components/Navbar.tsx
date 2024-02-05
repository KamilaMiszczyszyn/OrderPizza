import { NavLink } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import {auth} from "./../firebase/firebase"
import { signOut } from "firebase/auth"
import {doc, getDoc} from 'firebase/firestore'
import styled from 'styled-components'
import { AuthContext } from "../context/AuthContext"
import { db } from "./../firebase/firebase"
import cart from "./../assets/cart-white.png"
import { ShoppingCart } from "./index"
import {ShoppingCartContext} from "./../context/ShoppingCartContext"



const Nav = styled.nav`
  height: 100%;
  background-color: ${props=> props.theme.colors.black};
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


const CartButton=styled.div`
  position: relative;

  div{
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background-color: ${props=> props.theme.colors.primary};
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
    width: 20px;
    height: 20px;
    padding: 0px;
  }
 
`


const Navbar = () => {
  const currentUser = useContext(AuthContext)
  const {shoppingCartItems} = useContext(ShoppingCartContext)

  const [dropdownMenu, setDropdownMenu]=useState<boolean>(false)
  const [name, setName] = useState<string | null>(null)
  const [shoppingCart, setShoppingCart] = useState<boolean>(false);



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
        
        <CartButton>
          <div>{countTotalQuantity()}</div>

          <button onClick={() => shoppingCart ? setShoppingCart(false) : setShoppingCart(true)} />

        </CartButton>
        
        <button onClick={()=> dropdownMenu ? setDropdownMenu(false) : setDropdownMenu(true)}>MORE</button>
      </div>   
    </Nav>
    {dropdownMenu && 
      <DropdownMenu> 
        <ul>
          
        </ul>
        <button onClick={logout}>Log out</button>
      </DropdownMenu>}
      {shoppingCart && <ShoppingCart setShoppingCart={setShoppingCart} />}
    </>
  
  )
}

export default Navbar