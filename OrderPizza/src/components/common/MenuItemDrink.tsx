import styled from 'styled-components';
import useAddToCart from '../../hooks/useAddToCart';
import { Button } from './../index';
import iconAdd from './../../assets/icons/add.svg';

type Drink = {
  name: string;
  price: number;
  productID: number;
  img: string;
};

type ComponentProps = {
  drink: Drink;
};

const Container = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.neutral[200]};
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  background-color: ${(props) => props.theme.colors.white};

  @media (min-width: 490px) and (max-width: 864px) {
    width: 186px;
  }

  @media (max-width: 490px) {
    width: 100%;
  }

  & > img {
    width: 125px;
    height: auto;
    align-self: center;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    row-gap: 8px;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  justify-content: flex-end;

  @media (max-width: 490px) {
    flex-direction: row;
    column-gap: 24px;
    justify-content: space-between;
  }

  div p.price {
    color: ${(props) => props.theme.colors.primary[700]};
    font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
    line-height: initial;
  }

  div p.size {
    color: ${(props) => props.theme.colors.neutral[700]};
    line-height: initial;
  }

  button {
    width: 100%;

    @media (max-width: 490px) {
      width: auto;
    }
  }
`;
const MenuItemDrink = ({ drink }: ComponentProps) => {
  const addToCart = useAddToCart();

  return (
    <Container>
      <img src={require(drink.img)} />
      <div>
        <h4>{drink.name}</h4>
        <Footer>
          <div>
            <p className="price">
              {drink.price} {'\u20AC'}
            </p>
            <p className="size">500 ml</p>
          </div>
          <Button
            buttonType="secondary"
            iconLeft={iconAdd}
            onClick={() => addToCart(drink.productID)}
          >
            Add to cart
          </Button>
        </Footer>
      </div>
    </Container>
  );
};

export default MenuItemDrink;
