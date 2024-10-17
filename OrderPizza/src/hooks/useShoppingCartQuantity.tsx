import { useContext } from "react";
import {ShoppingCartContext} from "./../context/ShoppingCartContext"

type ShoppingCartItem = {
    productID: number, 
    quantity: number,

}

const useShoppingCartQuantity = () => {
    const {shoppingCartItems, setShoppingCartItems} = useContext(ShoppingCartContext)

    const changeQuantity = (cartItem: ShoppingCartItem, option: string  )=>{
 
    let newShoppingCart: Array<ShoppingCartItem> = []
      if(option === "increment"){
        newShoppingCart = shoppingCartItems?.map((item) => item.productID === cartItem.productID ? {...item, quantity: item.quantity + 1 } : item);
      }
      if(option === "decrement"){
        const shoppingCartMapped = shoppingCartItems?.map((item) => item.productID === cartItem.productID ? {...item, quantity: item.quantity - 1 } : item);
        newShoppingCart = shoppingCartMapped.filter((item) => item.quantity !== 0)
      }   
    setShoppingCartItems(newShoppingCart)
    
  }

  return changeQuantity
}

export default useShoppingCartQuantity





