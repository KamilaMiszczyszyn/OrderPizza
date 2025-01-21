import menuItems from './../data/items.json';

interface Item {
  productID: number;
  quantity: number;
  price?: number;
}

const totalPrice = (items: Array<Item> | null, promotion: string | null) => {
  let total: number = 0;

  if (items) {
    const shoppingCartWithPrices: Array<Item> = items.map((item) => {
      const filteredItems =
        menuItems.pizzas.find((elem) => elem.productID === item.productID) ||
        menuItems.drinks.find((elem) => elem.productID === item.productID);
      const price = filteredItems?.price;
      return { ...item, price };
    });

    let shoppingCart: Array<Item> = shoppingCartWithPrices;

    const pizzaCart = shoppingCart.filter((item) =>
      menuItems.pizzas.some((p) => p.productID === item.productID)
    );

    const numberOfPizza = pizzaCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    if (promotion === 'B2G1' && numberOfPizza === 3) {
      const sortedPizzas = [...pizzaCart].sort(
        (a, b) => (a.price || 0) - (b.price || 0)
      );

      if (sortedPizzas[0].quantity > 1) {
        sortedPizzas[0].quantity -= 1;
      } else {
        sortedPizzas.shift();
      }

      console.log(sortedPizzas);

      shoppingCart = [
        ...sortedPizzas,
        ...shoppingCart.filter(
          (item) =>
            !menuItems.pizzas.some((p) => p.productID === item.productID)
        ),
      ];

      console.log(shoppingCart);
    }

    total = shoppingCart.reduce((accumulator, currentValue) => {
      const quantity = currentValue.quantity;
      const price = currentValue.price;
      let value;
      if (price && quantity) {
        value = quantity * price;
      } else {
        value = 0;
      }
      return accumulator + value;
    }, 0);

    if (promotion === 'PROMO20') {
      return total * 0.8;
    }

    if (promotion === 'PROMO30') {
      return total * 0.7;
    }

    if (promotion === 'PROMO40') {
      return total * 0.6;
    }

    return total;
  }
};

export default totalPrice;
