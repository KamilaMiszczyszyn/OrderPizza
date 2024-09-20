import styled from "styled-components"
import useAddToCart from "../../hooks/useAddToCart"
import {Button} from "./../index"
import iconAdd from "./../../assets/icons/add.svg"

const Container = styled.div`
    max-width: 186px;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    background-color: ${props=> props.theme.colors.white};

    & > img {
        width: 125px;
        height: auto;
        align-self: center;
        }

    & > div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        row-gap: 8px;
    }
    
`

const H3 = styled.h3`
    font-size: 2.4rem;
`

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    
    div p.price{
        color: ${props => props.theme.colors.primary[700]};
    }

    div p.size{
        color: ${props => props.theme.colors.neutral[700]};
    }
`
const MenuItemDrink = ({drink}) => {
    const addToCart = useAddToCart()


  return (
    <Container>
        <img src={require(drink.img)}/>
        <div>
            <H3>{drink.name}</H3>
            <Footer>
                <div>
                    <p className="price">{drink.price}{'\u20AC'}</p>
                    <p className="size">32</p>
                </div>
                <Button type="secondary" iconLeft={iconAdd} onClick={() => addToCart(drink.productID)}>Add to cart</Button>
            </Footer>
        </div>
        
    </Container>
  )
}

export default MenuItemDrink