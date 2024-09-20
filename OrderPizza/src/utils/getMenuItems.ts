type MenuItems = {
    title: string;
    price: number;
    productID: number;
}

const menuItems: Array<MenuItems> = [
    {title: "Margherita",
    price: 10,
    productID: 101,},
    {title: "Capricciosa",
    price: 12,
    productID: 102,},
    {title: "Tomato",
    price: 12,
    productID: 103,},
    {title: "Mushroom",
    price: 12,
    productID: 104,},
    {title: "Hawaiian",  
    price: 15,
    productID: 105,},
    {title: "Pepperoni",  
    price: 12,
    productID: 106,},
    {title: "Water",
     price: 3,
     productID: 201},
    {title: "Cola",
     price: 3,
     productID: 202},
    {title: "Orange juice",
     price: 3,
     productID: 203 },
    {title: "Apple juice",
     price: 3,
     productID: 204},
]


const getMenuItem = (id: number) => {
    return menuItems.find((item) => item.productID === id)
  }

export default getMenuItem