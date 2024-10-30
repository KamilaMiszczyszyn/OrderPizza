import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { query, where, collection, onSnapshot, Timestamp } from "firebase/firestore";
import {db} from "./../firebase/firebase"
import styled from "styled-components";
import deliveryIcon from "./../assets/deliveryicon.png"
import { generateDate, generateHour } from "../utils/convertTime";
import getMenuItem from "../utils/getMenuItem";
import {PageContainer, SectionContainer, DeliveryTrucker} from "./index"



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
    price: number,
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

// const Container = styled.div`
//     width: 700px;
//     margin-bottom: 100px;
// `

// const H1 = styled.h1`
//     margin: 100px 0 20px 0; 
//     color: ${props=> props.theme.colors.primary};
//     font-size: 3.2rem;
// `

// const H2 = styled.h2`
//     color: ${props=> props.theme.colors.primary};
//     border-bottom: 1px solid ${props=> props.theme.colors.black}
// `
// const OrderTruckerContainer = styled.div`
//     margin: 30px 0;
//     background: linear-gradient(0deg, rgba(0,0,0,0.05) 0%, rgba(0,82,255,0) 100%);
//     display: grid;
//     grid-template-areas: 
//     "header header"
//     "img trucker"
//     "details details";
//     row-gap: 20px;
//     grid-template-columns: 30% 1fr;


    

//     div.order_header{
//         grid-area: header;
//         display: flex;
//         column-gap: 20px;

//     }

//     img {
//         grid-area: img;
//         width: 100%;
//         height: auto;
//     }

    

//     button{
//         grid-area: details;
//     }


// `


const Table = styled.table`
 width: 100%;
 border-collapse: collapse;


 th {
    background-color: ${props=> props.theme.colors.neutral[900]};
    color: ${props=> props.theme.colors.white};
    font-size: 1.8rem;
    padding: 16px 0 16px 0;
    text-align: left;
    padding: 0 12px;

    &:first-child {
    padding: 16px 12px 16px 24px;
    border-radius: 10px 0 0 0 ;
    }

    &:last-child {
    padding: 16px 24px 16px 12px;
    border-radius: 0 10px 0 0 ;
    }
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

 tbody td{
    border-bottom: 1px solid ${props=> props.theme.colors.neutral[900]};
    text-align:left; 
    vertical-align:top;
    padding: 16px 12px;

    &:first-child{
        padding: 16px 16px 12px 24px;

    }

    &:last-child{
        padding: 16px 24px 16px 12px;

    }
 }

 table{
    width: 100%;
 }

 div.date{
    display: flex;
    flex-direction: column;
    row-gap: 8px;
     flex: 1;
 }

 tbody.items{
    td{
        display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: none;
    padding: 0px;
    

     div{
    background-color: ${props=> props.theme.colors.neutral[100]};
    border-radius: 4px;
    width: 24px;
    height: 24px; 
    display: flex;
    align-items: center;
    justify-content: center;

 }

    }
    
 }





`


const Orders = () => {
    const currentUser = useContext(AuthContext)
    const [orders, setOrders] = useState<Array<Order> | null>(null)

 useEffect(() => {
    const getOrders= (user: string | null) =>{
        try{
          const collectionRef = collection(db, 'orders');
          const q = query(collectionRef, where("customerID", "==", user))
          const unsubscribe =  onSnapshot(q, querySnapshot => {
          
          const orders = querySnapshot.docs.map((doc) => (
            {
            products: doc.data().products,
            customerID: doc.data().customerID,
            deliveryAddress: doc.data().deliveryAddress,
            date: doc.data().date,
            status: doc.data().status,
            orderID: doc.id,
            price: doc.data().price,
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


  return (
    <PageContainer title="Orders">
        <SectionContainer title="Delivery trucker">
            {orders?.map(order => order.status !==  "completed" &&
            <DeliveryTrucker key={order.orderID} order={order}/>
            )}
        </SectionContainer>

        <SectionContainer title="Transaction history">
            <Table>
            <thead>
            <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Price</th>
            </tr>
               
            </thead>
            <tbody>
                {orders && orders.map((order) =>
                order.status === "completed" && 
                <tr key={order.orderID}>
                    <td>{order.orderID}</td>
                    <td><div className="date"><p>{generateDate(order.date.toDate())}</p><p>{generateHour(order.date.toDate())}</p></div></td>
                    <td>
                        <table>
                            <tbody className="items">
                            {order.products.map((item) =>
                            <tr  key={item.productID}><td><p>{getMenuItem(item.productID)?.name}</p> <div>{item.quantity}</div></td></tr>)}
                            </tbody>

                        </table>
                    </td>
                    <td>{order.price}{'\u20AC'}</td>
                </tr>)}

            </tbody>
            
        </Table>
        </SectionContainer>
    </PageContainer>
  )
}

export default Orders
