import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { query, where, collection, onSnapshot, Timestamp } from "firebase/firestore";
import {db} from "./../firebase/firebase"
import styled from "styled-components";
import deliveryIcon from "./../assets/deliveryicon.png"



type ShoppingCartItem = {
    productID: number, 
    quantity: number,

}

type Order = {
    products: Array<ShoppingCartItem>,
    customerID: string,
    deliveryAddress: string,
    phone: string,
    date: Timestamp,
    status: string, 
    orderID: string,
    price: string,
}

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

const Container = styled.div`
    width: 700px;
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
const OrderTruckerContainer = styled.div`
    margin: 30px 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.05) 0%, rgba(0,82,255,0) 100%);
    display: grid;
    grid-template-areas: 
    "header header"
    "img trucker"
    "details details";
    row-gap: 20px;
    grid-template-columns: 30% 1fr;


    

    div.order_header{
        grid-area: header;
        display: flex;
        column-gap: 20px;

    }

    img {
        grid-area: img;
        width: 100%;
        height: auto;
    }

    div.order_trucker{
        grid-area: trucker;
        align-self: center;
        justify-self: center;
        display: flex;

        div{
            display: grid;
            grid-template-areas: 
            "point load"
            "status .";
            row-gap: 10px;

            span{
                grid-area: status;
                justify-self: center;
            }


            div.order_point{
                grid-area: point;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background-color: ${props=> props.theme.colors.black};
                justify-self: center; 
            }
            
            div.order_load{
                grid-area: load;
                display: flex;
                justify-content: center;
                align-items: center;
                column-gap: 7px; 

                div{
                    background-color: grey;
                    border-radius: 50%;
                    height: 7px;
                    width: 7px;
                }
            
            } 
        }

        div.active{

            div.order_point{
                background-color: ${props=> props.theme.colors.primary};
            }
            
            div.order_load{
                div{
                    background-color: ${props=> props.theme.colors.primary};
                }
            } 
        }

        div.pending{
            div.order_load{
                div{
                    animation: dot ease-in-out 1s infinite;
                    background-color: ${props=> props.theme.colors.primary};
                }

                div:nth-of-type(2) {
                animation-delay: 0.2s;
                }

                div:nth-of-type(3) {
                animation-delay: 0.3s;
                }

                @keyframes dot {
                    0% { background-color: grey; transform: scale(1); }
                    50% { background-color: ${props=> props.theme.colors.primary}; transform: scale(1.3); }
                    100% { background-color: grey; transform: scale(1); }
                }
            } 

        }

    }

    button{
        grid-area: details;
    }


`


const Table = styled.table`
 width: 100%;
 margin: 20px 0;

 tr{
    text-align: center;
    
 }
 th {
    font-size: 1.8rem;
    padding: 10px;
 }

 td{
    padding: 10px;
 }

 th:first-child{
    text-align: left;
 }

 tr td:first-child{
    text-align: left;
 }

`


const Orders = () => {
    const currentUser = useContext(AuthContext)
    const [orders, setOrders] = useState<Array<Order> | null>(null)
    const [orderDetails, setOrderDetails] = useState<string | null>(null)

 useEffect(() => {
    const getOrders= async(user: string | null) =>{
        try{
          const collectionRef = collection(db, 'orders');
          const q = query(collectionRef, where("customerID", "==", user))
          const unsubscribe = await onSnapshot(q, querySnapshot => {
          
          const orders = querySnapshot.docs.map((doc) => (
            {
            products: doc.data().products,
            customerID: doc.data().customerID,
            deliveryAddress: doc.data().deliveryAddress,
            phone: doc.data().phone,
            date: doc.data().date,
            status: doc.data().status,
            orderID: doc.id,
            price: doc.price,
            }))
            setOrders(orders);
            })

            
            return () => unsubscribe;


            }catch (error) {
            console.log(error)
            }
  }

    getOrders(currentUser)

  }, [currentUser])


  const generateDate= (date: Date) => {
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth()+1;
    const year: string | number = date.getFullYear();

    if(month<10){month='0'+ month}
    if(day<10){day='0'+ day}

    return day + "-" + month + "-" + year
  }

  const generateHour= (date: Date) => {
    let hour : string | number = date.getHours();
    let minutes : string | number = date.getMinutes();

    if(hour<10){hour='0'+ hour}
    if(minutes<10){minutes='0'+ minutes}

    return hour + `:` + minutes 
  }

    const getMenuItem = (id: number) => {
    return menuItems.find((item) => item.productID === id)
  }

  return (
    <Container>
        <H1>Orders</H1>
        <H2>Delivery Trucker</H2>
        {orders && orders.map((order, index) =>
            order.status !== "completed" &&
            <div key={order.orderID}>
            
            <OrderTruckerContainer>
                <div className="order_header">
                    <p>#{index+1}</p>
                    <p>{generateDate(order.date.toDate())}</p>
                    <p>{generateHour(order.date.toDate())}</p>
                </div>
                <img src={deliveryIcon}/>
                <div className="order_trucker">
                    <div className={`${order.status === "ordered" || order.status === "preparation" || order.status === "delivery" ? "active" : undefined} ${order.status === "ordered" && "pending"}`}>
                        <div className="order_point"></div>
                        <span>Order placed</span>
                        <div className="order_load"><div></div><div></div><div></div></div>
                    </div>         
                    <div className={`${order.status === "preparation" || order.status === "delivery" ? "active" : undefined} ${order.status === "preparation" && "pending"}`}>
                        <div className="order_point"></div>
                        <span>In the kitchen</span>
                        <div className="order_load"><div></div><div></div><div></div></div>
                    </div>
                    <div className={`${order.status === "delivery" ? "active" : undefined} ${order.status === "delivery" && "pending"}`}>
                        <div className="order_point"></div>
                        <span>On the way</span>
                        <div className="order_load"><div></div><div></div><div></div></div>
                    </div>  
                    <div >
                        <div className="order_point"></div>
                        <span>Delivered</span>
                    </div>        
                </div>
                <button onClick={()=> orderDetails === null ? setOrderDetails(order.orderID) : setOrderDetails(null)}>Details</button>
            </OrderTruckerContainer>
            {orderDetails === order.orderID && 
                <Table key={order.orderID}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Products</th>
                        <th>Total price</th>
                    </tr>     
                    </thead>
                    <tbody >
                    <tr>
                        <td>{order.orderID}</td>             
                        <td>
                        <table>
                            <tbody>
                            {order.products.map((item) =>
                            <tr key={item.productID}><td>{getMenuItem(item.productID)?.title} x {item.quantity}</td></tr>)}
                            </tbody>
                        </table>
                        </td>
                        <td>{order.price}{'\u20AC'}</td>
                    </tr>    
                    </tbody>
                </Table>
                }
            </div>
            )}
        

        <H2>History</H2>
        <Table>
            <thead>
            <tr>
             <th>ID</th>
                <th>Date</th>
                <th>Products</th>
                <th>Total price</th>
                <th>Status</th>
            </tr>
               
            </thead>
            {orders && orders.map((order) =>
                order.status === "completed" && 
                <tr key={order.orderID}>
                    <td>{order.orderID}</td>
                    <td>{generateDate(order.date.toDate())}</td>
                    <td>
                        <table>
                            <tbody>
                            {order.products.map((item) =>
                            <tr key={item.productID}><td>{getMenuItem(item.productID)?.title} x {item.quantity}</td></tr>)}
                            </tbody>

                        </table>
                    </td>
                    <td>{order.price}{'\u20AC'}</td>
                    <td>{order?.status}</td>
                </tr>)}
        </Table>
    </Container>
  )
}

export default Orders
