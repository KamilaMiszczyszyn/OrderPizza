import menuItems from "./../data/items.json"
import {PageContainer, SectionContainer, MenuItemPizza, MenuItemDrink } from "./index"
import styled from "styled-components"

const WrapperPizzas = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 24px;
`

const WrapperDrinks = styled.div`
    display: flex;
    column-gap: 24px;
`

const Menu = () => {
    
  return (
    <PageContainer title="Menu">
        <SectionContainer title="Pizzas">
            <WrapperPizzas>
                {menuItems.pizzas.map((pizza) => <MenuItemPizza key={pizza.productID} pizza={pizza} />)}
            </WrapperPizzas>  
        </SectionContainer>

        <SectionContainer title="Drinks">
            <WrapperDrinks>
                {menuItems.drinks.map((drink) => <MenuItemDrink key={drink.productID} drink={drink} />)}
            </WrapperDrinks> 
        </SectionContainer>

    </PageContainer>
    
  )
}

export default Menu