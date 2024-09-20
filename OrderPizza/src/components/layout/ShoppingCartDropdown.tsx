import styled from "styled-components"
import iconAdd from "./../../assets/icons/add.svg"
import iconMinus from "./../../assets/icons/minus.svg"
import {Button} from "./../index"
import useAddToCart from "../../hooks/useAddToCart"

const Container = styled.div`
    width: 180px;
    background-color: ${props=> props.theme.colors.white};
    border-radius: 0 0 10px 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};

`
const ShoppingCartItemsContainer=styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding: 0  16px 24px 16px;
    border-bottom:  1px solid ${props=> props.theme.colors.neutral[200]};
    
`
const ShoppingCartDropdown = () => {
 const addToCart = useAddToCart();
 
  return (
    <Container>
        <ShoppingCartItemsContainer>

            <p className="name"></p>
            <div className="quantity">
                <Button type="icon" iconLeft={iconMinus} onClick={() => addToCart(drink.productID)}/>
                <p></p>
                <Button type="icon" iconLeft={iconAdd} onClick={() => addToCart(drink.productID)}/>
            </div>
            <p className="price"></p>



        </ShoppingCartItemsContainer>
        
    </Container>
  )
}

export default ShoppingCartDropdown