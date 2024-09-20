import styled from "styled-components"
import leafIcon from "./../../assets/Leaf.svg"
import {Button} from "./../index"
import iconAdd from "./../../assets/icons/add.svg"
import useAddToCart from "../../hooks/useAddToCart"

const Container = styled.div`
    width: 100%;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
    display: flex;
    column-gap: 24px;
    background-color: ${props=> props.theme.colors.white};

    & > img {
            width: 200px;
            height: auto;
        }

    & > div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        
   
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    column-gap: 16px;
`

const Description = styled.p`
    color: ${props => props.theme.colors.neutral[700]};
`

const H3 = styled.h3`
    font-size: 2.4rem;
`
const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    column-gap: 24px;
    
    div p.price{
        color: ${props => props.theme.colors.primary[700]};
    }

    div p.size{
        color: ${props => props.theme.colors.neutral[700]};
    }
`

const VeganIcon = styled.div`
    padding: 2px 8px;
    background-color: #CAE6CC;
    border-radius: 150px;

    img{
        width: 12px;
        height: 12px;
    }

    span{
        margin-left: 2px;
        color: #175119;
        font-size: 1.4rem;
    }

    
`

const MenuItemPizza = ({pizza}) => {
    const addToCart = useAddToCart()

  return (
    <Container>
        <img src={require(pizza.img)}/>
        <div>
            <Header>
                <H3>{pizza.name}</H3>
                {pizza.vegan && <VeganIcon><img src={leafIcon}/><span>vegan</span></VeganIcon>}
            </Header>
            <Description>{pizza.ingredients.join(", ")}</Description>
            <Footer>
                <div>
                    <p className="price">{pizza.price}{'\u20AC'}</p>
                    <p className="size">32</p>
                </div>
                <Button type="secondary" iconLeft={iconAdd} onClick={() => addToCart(pizza.productID)}>Add to cart</Button>
            </Footer>
        </div>
    </Container>
  )
}

export default MenuItemPizza