import menuItems from '../../data/items.json';
import {
  PageContainer,
  SectionContainer,
  MenuItemPizza,
  MenuItemDrink,
} from './../index';
import styled from 'styled-components';

const Container = styled.div`
  width: 864px;
  margin: 128px 0;

  @media (max-width: 864px) {
    width: 100%;
    margin: 16px;
  }
`;

const WrapperPizzas = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

const WrapperDrinks = styled.div`
  display: flex;
  column-gap: 24px;
  row-gap: 24px;

  @media (max-width: 864px) {
    flex-wrap: wrap;
  }
`;

const Menu = () => {
  return (
    <Container>
      <PageContainer title="Menu">
        <SectionContainer title="Pizzas">
          <WrapperPizzas>
            {menuItems.pizzas.map((pizza) => (
              <MenuItemPizza key={pizza.productID} pizza={pizza} />
            ))}
          </WrapperPizzas>
        </SectionContainer>

        <SectionContainer title="Drinks">
          <WrapperDrinks>
            {menuItems.drinks.map((drink) => (
              <MenuItemDrink key={drink.productID} drink={drink} />
            ))}
          </WrapperDrinks>
        </SectionContainer>
      </PageContainer>
    </Container>
  );
};

export default Menu;
