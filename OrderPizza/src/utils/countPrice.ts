import getMenuItem from "./getMenuItem"

type ShoppingCartItem = {
    productID: number, 
    quantity: number,
}

const countPrice = (item: ShoppingCartItem) => {
    const price: number | undefined =getMenuItem(item.productID)?.price
    const quantity: number | undefined= item.quantity
    if(price && quantity){
      return price * quantity
    }
    
  }

  export default countPrice