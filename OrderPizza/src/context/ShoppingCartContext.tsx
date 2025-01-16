import { createContext, ReactElement, useState, useEffect } from 'react';

type ShoppingCartItem = {
  productID: number;
  quantity: number;
};

type ShoppingCartProviderProps = {
  children: ReactElement;
};

type DefaultContextValue = {
  setShoppingCartItems: (shoppingCartItems: Array<ShoppingCartItem>) => void;
  shoppingCartItems: Array<ShoppingCartItem>;
};

const defaultContextValue: DefaultContextValue = {
  setShoppingCartItems: () => {},
  shoppingCartItems: [],
};

export const ShoppingCartContext =
  createContext<DefaultContextValue>(defaultContextValue);

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [shoppingCartItems, setShoppingCartItems] = useState<
    Array<ShoppingCartItem>
  >(() => {
    const storage = localStorage.getItem('shoppingCart');
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
  });

  useEffect(() => {
    if (shoppingCartItems) {
      shoppingCartItems.length === 0
        ? localStorage.removeItem('shoppingCart')
        : localStorage.setItem(
            'shoppingCart',
            JSON.stringify(shoppingCartItems)
          );
    }
  }, [shoppingCartItems]);

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCartItems, setShoppingCartItems }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
