import { useContext } from 'react';

import { ShoppingCartContext } from './../context/ShoppingCartContext';

interface ShoppingCartItem {
  productID: number;
  quantity: number;
}

const useAddToCart = () => {
  const { shoppingCartItems, setShoppingCartItems } =
    useContext(ShoppingCartContext);

  const addToCart = (id: number) => {
    let editedShoppingCart = [];

    if (shoppingCartItems.length !== 0) {
      editedShoppingCart = shoppingCartItems.map((elem: ShoppingCartItem) => {
        if (elem.productID == id) {
          return {
            productID: id,
            quantity: elem.quantity + 1,
          };
        } else {
          return elem;
        }
      });

      if (
        !editedShoppingCart.some(
          (elem: ShoppingCartItem) => elem.productID === id
        )
      ) {
        editedShoppingCart.push({
          productID: id,
          quantity: 1,
        });
      }
    } else {
      const cartItem = { productID: id, quantity: 1 };

      editedShoppingCart.push(cartItem);
    }

    setShoppingCartItems(editedShoppingCart);
  };

  return addToCart;
};

export default useAddToCart;
