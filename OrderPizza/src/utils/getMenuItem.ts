import menuItems from "./../data/items.json"


const getMenuItem = (id: number) => {
    return menuItems.pizzas.find((item) => item.productID === id) || menuItems.drinks.find((item) => item.productID === id)
  }

export default getMenuItem