import styled from "styled-components"
import { useContext } from "react"
import plus from "./../assets/plus.png"
import minus from "./../assets/minus.png"
import {ShoppingCartContext} from "./../context/ShoppingCartContext"
import {useNavigate} from "react-router-dom"

type ShoppingCartItem = {
    productID: number, 
    quantity: number,

}

type MenuItems = {
    title: string;
    price: number;
    productID: number;
}

const menuItems: Array<MenuItems> = [
    {title: "Margherita",
    price: 10,
    productID: 101,},
    {title: "Capricciosa",
    price: 12,
    productID: 102,},
    {title: "Tomato",
    price: 12,
    productID: 103,},
    {title: "Mushroom",
    price: 12,
    productID: 104,},
    {title: "Hawaiian",  
    price: 15,
    productID: 105,},
    {title: "Pepperoni",  
    price: 12,
    productID: 106,},
    {title: "Water",
     price: 3,
     productID: 201},
    {title: "Cola",
     price: 3,
     productID: 202},
    {title: "Orange juice",
     price: 3,
     productID: 203 },
    {title: "Apple juice",
     price: 3,
     productID: 204},
]

const DarkContainer=styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 700px;
  background-color: ${props=> props.theme.colors.white};
  border-radius: 10px;
  padding: 20px;
  position: relative;

  
`

const H2 = styled.h2`
    color: ${props=> props.theme.colors.primary};
    border-bottom: 1px solid ${props=> props.theme.colors.black};
    margin: 10px 0;

`

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  

  div:last-child{
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 30px;
  }

  div.quantity{
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`

const SummaryContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${props=> props.theme.colors.black};
  padding: 10px 0;
`

const ButtonQuantity = styled.button<{$plus?: boolean}>`
  border-radius: 50%;
  padding: 0;
  width: 30px;
  height: 30px;
  background-image: url(${props => props.$plus ? plus : minus});
  background-size: cover;
`

const ShoppingCart = ({setShoppingCart}) => {
  const {shoppingCartItems, setShoppingCartItems} = useContext(ShoppingCartContext)
  const navigate = useNavigate()
  


  const getMenuItem = (id: number) => {
    return menuItems.find((item) => item.productID === id)
  }

  const countPrice = (price: number | undefined, quantity: number | undefined) => {
    if(price && quantity){
      return price * quantity
    }
    
  }

  const countTotalPrice = () =>{
    let total = 0
      total = shoppingCartItems.reduce((accumulator, currentValue) => {
      const quantity = currentValue.quantity;
      const filteredMenuItems = menuItems.find((elem) => elem.productID === currentValue.productID)
      const price = filteredMenuItems?.price;
      let value
      if(price && quantity){
         value = quantity * price
       }else{value=0}  
      return accumulator + value
    },
    0)

    return total

  }

  const changeQuantity = (cartItem: ShoppingCartItem, option: string  )=>{
 
    let newShoppingCart: Array<ShoppingCartItem> = []
      if(option === "increment"){
        newShoppingCart = shoppingCartItems?.map((item) => item.productID === cartItem.productID ? {...item, quantity: item.quantity + 1 } : item);
      }
      if(option === "decrement"){
        const shoppingCartMapped = shoppingCartItems?.map((item) => item.productID === cartItem.productID ? {...item, quantity: item.quantity - 1 } : item);
        newShoppingCart = shoppingCartMapped.filter((item) => item.quantity !== 0)
      }   
    setShoppingCartItems(newShoppingCart)
    
  }

  return (
    <DarkContainer>
      <Container>
        <button className="close" onClick={()=>setShoppingCart(false)}/>
        <H2>Shopping Cart</H2>
      {shoppingCartItems.length !== 0 ? shoppingCartItems.map((item)=>
        <ItemContainer key={item.productID}>
          <div>
            <p>{getMenuItem(item.productID)?.title}</p>
          </div>

          <div>
            <div className="quantity">
              <ButtonQuantity onClick={()=>changeQuantity(item, "decrement")}/>
              <p>{item.quantity}</p>
              <ButtonQuantity $plus onClick={()=>changeQuantity(item, "increment")}/> 
            </div>
            <p>{countPrice(getMenuItem(item.productID)?.price, item.quantity)}{'\u20AC'}</p>
          </div>
        </ItemContainer>
      ): <p>The shopping cart is empty!</p>}
      <SummaryContainer>
        <p>Total price: <span>{countTotalPrice()}</span> {'\u20AC'}</p>
      </SummaryContainer>
      {shoppingCartItems.length !== 0 && <button onClick={()=>{navigate("/order-summary"); setShoppingCart(false)}}>Order summary</button>}
      </Container>

    </DarkContainer>
    
  )
}

export default ShoppingCart