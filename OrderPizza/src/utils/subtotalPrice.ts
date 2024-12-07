import menuItems from "./../data/items.json"
  
  
  interface Item {
    productID: number,
    quantity: 2
  }
  
  const subtotalPrice = (items: Array<Item>) =>{
    let total = 0
      total = items.reduce((accumulator, currentValue) => {
      const quantity = currentValue.quantity;
      const filteredMenuItems = menuItems.pizzas.find((elem) => elem.productID === currentValue.productID) ||  menuItems.drinks.find((elem) => elem.productID === currentValue.productID)
      const price = filteredMenuItems?.price;
      let value
      if(price && quantity){
         value = quantity * price
       }else{value=0}  
      return accumulator + value
    },
    0)

    return total

  }

  export default subtotalPrice