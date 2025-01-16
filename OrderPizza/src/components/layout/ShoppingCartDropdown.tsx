import { useContext, forwardRef } from 'react';
import styled from 'styled-components';
import iconAdd from './../../assets/icons/add.svg';
import iconMinus from './../../assets/icons/minus.svg';
import { Button } from './../index';
import useShoppingCartQuantity from './../../hooks/useShoppingCartQuantity';
import { ShoppingCartContext } from './../../context/ShoppingCartContext';
import countPrice from './../../utils/countPrice';
import getMenuItem from '../../utils/getMenuItem';
import subtotalPrice from '../../utils/subtotalPrice';
import { useNavigate } from 'react-router-dom';
import closeIcon from './../../assets/close.svg';

type ComponentProps = {
  shoppingCart: boolean;
  setShoppingCart: (value: boolean) => void;
};

const Container = styled.div`
  padding: 24px;
  width: 451px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 0 0 10px 10px;
  border: 1px solid ${(props) => props.theme.colors.neutral[200]};
  position: absolute;
  top: 60px;
  right: 192px;
  box-shadow: ${(props) => props.theme.shadow};

  @media (min-width: 490px) and (max-width: 864px) {
    right: 80px;
  }

  @media (max-width: 490px) {
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
`;
const CloseButton = styled.button`
  background: none;
  display: none;

  @media (max-width: 490px) {
    display: initial;
    position: absolute;
    top: 24px;
    right: 24px;
  }
`;

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: 24px;
  display: none;
  @media (max-width: 490px) {
    display: initial;
  }
`;

const ShoppingCartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding: 0 16px 24px 16px;
  flex: 1;
`;

const ShoppingCartItem = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 490px) {
    flex-direction: column;
  }

  div.name {
    display: flex;
    column-gap: 16px;
    align-items: center;

    div {
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

  div.quantity-price {
    display: flex;
    justify-content: space-between;
    width: 150px;
    align-items: center;

    @media (max-width: 490px) {
      align-self: flex-end;
    }

    div.quantity {
      display: flex;
      align-items: center;
      width: 80px;
      justify-content: space-between;
    }
  }
`;

const Footer = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.neutral[200]};
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding-top: 24px;

  div.subtotal-price {
    margin: 8px 0 0 0;
    display: flex;
    justify-content: flex-end;
    column-gap: 16px;
    padding: 0 16px;
  }
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  p {
    font-size: ${(props) => props.theme.typography.fontSize['lg']};
    font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
    text-align: center;
  }
`;

const ShoppingCartDropdown = forwardRef<HTMLDivElement, ComponentProps>(
  ({ shoppingCart, setShoppingCart }: ComponentProps, ref) => {
    const { shoppingCartItems } = useContext(ShoppingCartContext);
    const changeQuantity = useShoppingCartQuantity();
    const navigate = useNavigate();

    return (
      <Container ref={ref}>
        <CloseButton onClick={() => setShoppingCart(!shoppingCart)}>
          <img src={closeIcon} alt="Close" />
        </CloseButton>
        <Logo>OrderPizza</Logo>
        <ShoppingCartItemsContainer>
          {shoppingCartItems.length === 0 ? (
            <Empty>
              <p>Your shopping cart is empty</p>
              <Button buttonType="secondary" onClick={() => navigate('/menu')}>
                Go to menu
              </Button>
            </Empty>
          ) : (
            shoppingCartItems.map((item) => (
              <ShoppingCartItem key={item.productID}>
                <div className="name">
                  <div>
                    <img
                      src={
                        getMenuItem(item.productID)?.img
                          ? getMenuItem(item.productID)?.img
                          : iconAdd
                      }
                      alt={getMenuItem(item.productID)?.name}
                    />
                  </div>

                  <p className="name">{getMenuItem(item.productID)?.name}</p>
                </div>
                <div className="quantity-price">
                  <div className="quantity">
                    <Button
                      buttonType="icon"
                      iconLeft={iconMinus}
                      onClick={() => changeQuantity(item, 'decrement')}
                    />
                    <p>{item.quantity}</p>
                    <Button
                      buttonType="icon"
                      iconLeft={iconAdd}
                      onClick={() => changeQuantity(item, 'increment')}
                    />
                  </div>
                  <p className="price">
                    {countPrice(item)}
                    {'\u20AC'}
                  </p>
                </div>
              </ShoppingCartItem>
            ))
          )}
        </ShoppingCartItemsContainer>

        {shoppingCartItems.length !== 0 && (
          <Footer>
            <div className="subtotal-price">
              <p>Subtotal price:</p>
              <p>
                {subtotalPrice(shoppingCartItems)} {'\u20AC'}
              </p>
            </div>

            <Button
              buttonType="secondary"
              style={{ width: '100%' }}
              onClick={() => {
                navigate('/order-summary');
                setShoppingCart(!setShoppingCart);
              }}
            >
              Order summary
            </Button>
          </Footer>
        )}
      </Container>
    );
  }
);

export default ShoppingCartDropdown;
