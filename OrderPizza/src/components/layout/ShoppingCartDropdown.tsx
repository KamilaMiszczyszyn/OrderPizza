import { useContext } from "react"
import styled from "styled-components"
import iconAdd from "./../../assets/icons/add.svg"
import iconMinus from "./../../assets/icons/minus.svg"
import {Button} from "./../index"
import useShoppingCartQuantity from "./../../hooks/useShoppingCartQuantity"
import {ShoppingCartContext} from "./../../context/ShoppingCartContext"
import countPrice from "./../../utils/countPrice"
import getMenuItem from "../../utils/getMenuItem"
import subtotalPrice from "../../utils/subtotalPrice"
import { useNavigate} from 'react-router-dom';

const Container = styled.div`
    padding: 24px;
    width: 451px;
    background-color: ${props=> props.theme.colors.white};
    border-radius: 0 0 10px 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
    position: absolute;
    top: 60px;
    right: 192px;

    div.subtotal-price{
        margin: 8px 0 24px 0;
        display: flex;
        justify-content: flex-end;
        column-gap: 16px;
        padding: 0 16px;
    }

`
const ShoppingCartItemsContainer=styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding: 0  16px 24px 16px;
    border-bottom:  1px solid ${props=> props.theme.colors.neutral[200]};
    
`

const ShoppingCartItem=styled.div`
    display: flex;
    justify-content: space-between;

    div.name{
        display: flex;
        column-gap: 16px;
        align-items: center;

        div{
            width: 64px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
            img {
            height: 40px;          
            }
    }

    div.quantity-price{
        display: flex;
        justify-content: space-between;
        width: 150px;
        align-items: center;

        div.quantity{
            display: flex;
            align-items: center;
            width: 80px;
            justify-content: space-between;
        }

    }
    
`
const ShoppingCartDropdown = () => {
 const {shoppingCartItems} = useContext(ShoppingCartContext);
 const changeQuantity=useShoppingCartQuantity();
  const navigate = useNavigate();
 
  return (
    <Container>
            <ShoppingCartItemsContainer>
            {shoppingCartItems.map(item => 
            <ShoppingCartItem>
                <div className="name">
                    <div>
                        <img 
                        src={getMenuItem(item.productID)?.img ? getMenuItem(item.productID)?.img : iconAdd} 
                        alt={getMenuItem(item.productID)?.name} 
                    />
                    </div>
                    
                    <p className="name">{getMenuItem(item.productID)?.name}</p>
                </div>
                <div className="quantity-price">
                    <div className="quantity">
                        <Button buttonType="icon" iconLeft={iconMinus} onClick={()=>changeQuantity(item, "decrement")}/>
                        <p>{item.quantity}</p>
                        <Button buttonType="icon" iconLeft={iconAdd} onClick={()=>changeQuantity(item, "increment")}/> 
                    </div>
                    <p className="price">{countPrice(item)}{'\u20AC'}</p>
                </div>
            
            

            </ShoppingCartItem>
            )}
        </ShoppingCartItemsContainer>
        <div className="subtotal-price"><p>Subtotal price:</p><p>{subtotalPrice(shoppingCartItems)}  {'\u20AC'}</p></div>
        
        <Button style={{width: "100%"}} onClick={()=>navigate("/order-summary")}>Order summary</Button>
        
    </Container>
  )
}

export default ShoppingCartDropdown