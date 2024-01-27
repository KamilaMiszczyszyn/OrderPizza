import styled from "styled-components";
import leafImg from "./../assets/leaf.png";
import cart from "./../assets/cart.png"


type Pizza = {
    title: string;
    ingredients: Array<string>;
    vegan: boolean;
    price: number;
    productID: number;
    img: string;
}

type Drink = {
    title: string;
    price: number;
    productID: number;
}


const menuPizza: Array<Pizza> = [
{title: "Margherita",
    ingredients: ["tomato sauce", "mozzarella cheese", "basil"],
    vegan: true,
    price: 10,
    productID: 101,
    img: require("./../assets/pizza/101.png")},
{title: "Capricciosa",
    ingredients: ["tomato sauce", "mozzarella cheese", "mushrooms", "ham", "basil"],
    vegan: false,
    price: 12,
    productID: 102,
    img: require("./../assets/pizza/102.png")},
{title: "Tomato",
    ingredients: ["cheese sauce", "mozzarella cheese", "cherry tomatoes"],
    vegan: true,
    price: 12,
    productID: 103,
    img: require("./../assets/pizza/103.png")},
{title: "Mushroom",
    ingredients: ["tomato sauce", "mozzarella cheese", "mushrooms", "rocket" ],
    vegan: true,
    price: 12,
    productID: 104,
    img: require("./../assets/pizza/104.png")},
{title: "Hawaiian",
    ingredients: ["tomato sauce", "mozzarella cheese", "cherry tomatoes", "mushrooms", "olives", "pineapple", "corn", "chorizo"],
    vegan: false,
    price: 15,
    productID: 105,
    img: require("./../assets/pizza/105.png")},
{title: "Pepperoni",
    ingredients: ["tomato sauce", "mozzarella cheese", "pepperoni", "rocket"],
    vegan: false,
    price: 12,
    productID: 106,
    img: require("./../assets/pizza/106.png")},
]


const menuDrinks: Array<Drink> = [
    {title: "Water",
     price: 3,
     productID: 201 },
    {title: "Cola",
     price: 3,
     productID: 202 },
    {title: "Orange juice",
     price: 3,
     productID: 203 },
    {title: "Apple juice",
     price: 3,
     productID: 204 },
]



const Container = styled.div`
    max-width: 700px;
    margin-bottom: 100px;
`

const H1 = styled.h1`
    margin: 100px 0 20px 0; 
    color: ${props=> props.theme.colors.primary};
    font-size: 3.2rem;
`

const H2 = styled.h2`
    color: ${props=> props.theme.colors.primary};
    border-bottom: 1px solid ${props=> props.theme.colors.black}

`
const PizzaContainer = styled.div`
    display: grid;
    grid-template-areas:
    "title cart"
    "img ingredients";
    grid-template-columns: 50% 1fr;
    margin: 30px 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.05) 0%, rgba(0,82,255,0) 100%);

    h3{
        grid-area: title;
    }

    .cart{
        grid-area: cart;
        display: flex;
        column-gap: 10px;
        justify-content: flex-end;
        align-items: center;
    };

    >img{
        grid-area: img;
        width: 80%;
    }

    .ingredients{
        grid-area: ingredients;
        align-self: center;
    }
`

const DrinkContainer= styled.div`
    display:flex;
    justify-content: space-between;
    margin: 30px 0;

    .cart{
        display: flex;
        column-gap: 10px;
        justify-content: flex-end;
        align-items: center;
    }
`

const CartButton=styled.button`
    
    background-image: url(${cart});
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
    width: 20px;
    height: 20px;
    cursor: pointer;
`


const Menu = () => {


  return (
    <Container>
        <H1>Menu</H1>
        <H2>Pizza</H2>
        <p>32cm</p>
        {menuPizza.map((pizza) => 
        <PizzaContainer key={pizza.productID}>
            <h3>{pizza.title}</h3>
            <div className="cart">
                <p>{pizza.price}{'\u20AC'}</p>
                <CartButton/>
            </div>
            <img src={pizza.img}/>
            <div className="ingredients">
                <p>{pizza.ingredients.join(", ")}</p>
                <p>{pizza.vegan && <><img src={leafImg}/> Vegan</>}</p>
            </div>
        </PizzaContainer>
        )}
        
        <H2>Drinks</H2>
        {menuDrinks.map((drink) =>
        <DrinkContainer key={drink.productID}>
            <h3>{drink.title}</h3>
            <div className="cart">
                <p>{drink.price}{'\u20AC'}</p>
                <CartButton/>
            </div>
            

        </DrinkContainer>
        
        
        )}

    </Container>
    
  )
}

export default Menu