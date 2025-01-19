import styled from 'styled-components';
import leafIcon from './../../assets/Leaf.svg';
import { Button } from './../index';
import iconAdd from './../../assets/icons/add.svg';
import useAddToCart from '../../hooks/useAddToCart';

type Pizza = {
  name: string;
  ingredients: Array<string>;
  vegan: boolean;
  price: number;
  productID: number;
  img: string;
};

type ComponentProps = {
  pizza: Pizza;
};

const Container = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.neutral[200]};
  display: flex;
  column-gap: 24px;
  background-color: ${(props) => props.theme.colors.white};

  & > img {
    width: 200px;
    height: auto;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 490px) {
      row-gap: 8px;
    }
  }

  @media (max-width: 490px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.neutral[700]};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 24px;

  @media (max-width: 490px) {
    justify-content: space-between;
  }

  div p.price {
    font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
    line-height: initial;
  }

  div p.size {
    color: ${(props) => props.theme.colors.neutral[700]};
    line-height: initial;
  }
`;

const VeganIcon = styled.div`
  padding: 2px 8px;
  background-color: #cae6cc;
  border-radius: 150px;
  display: flex;
  row-gap: 4px;
  align-items: center;

  img {
    width: 12px;
    height: 12px;
  }

  span {
    margin-left: 2px;
    color: #175119;
    font-size: 1.4rem;
  }
`;

const MenuItemPizza = ({ pizza }: ComponentProps) => {
  const addToCart = useAddToCart();

  return (
    <Container>
      <img src={require(pizza.img)} />
      <div>
        <Header>
          <h4>{pizza.name}</h4>
          {pizza.vegan && (
            <VeganIcon>
              <img src={leafIcon} />
              <span>vegan</span>
            </VeganIcon>
          )}
        </Header>
        <Description>{pizza.ingredients.join(', ')}</Description>
        <Footer>
          <div>
            <p className="price">
              {pizza.price} {'\u20AC'}
            </p>
            <p className="size">{'\u00D8'} 32</p>
          </div>
          <Button
            buttonType="secondary"
            iconLeft={iconAdd}
            onClick={() => addToCart(pizza.productID)}
          >
            Add to cart
          </Button>
        </Footer>
      </div>
    </Container>
  );
};

export default MenuItemPizza;
