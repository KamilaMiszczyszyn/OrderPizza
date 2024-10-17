import { useReducer, useEffect, useState } from 'react'
import styled from 'styled-components'
import { query, where, collection, onSnapshot, Timestamp, orderBy, updateDoc, doc} from "firebase/firestore";
import {db} from "./../firebase/firebase"
import { generateDate, generateHour } from '../utils/convertTime';
import getMenuItem from '../utils/getMenuItem';
import arrowDown from "./../assets/arrow-down.png"
import arrowUp from "./../assets/arrow-up.png"

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


type ActionReducer = {
  type: string
}

const Container = styled.div`
  width: 700px;
  margin-bottom: 100px;
`

const Nav = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  button{
    border-radius: 0; 
  }

  button.disabled{
      opacity: 0.8;

      &:hover{
        opacity: 0.6;
      }
    }

  
`

const Header = styled.div`
  div.sort_dropdown{
    display: flex;
    justify-content: flex-end;
    position: relative;

      button{
      background-color: transparent;
      color: ${props=> props.theme.colors.black};
      width: 180px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 20px;

      img{
        width: auto;
        height: 100%;
      } 
      }

      div{
        position: absolute;
        display: flex;
        z-index: 100;
        flex-direction: column;
        border-radius: 0 0 10px 10px;
        box-shadow: ${props=> props.theme.shadow};
        top: 35px;
        background-color: ${props=> props.theme.colors.white};
      }
  }

  div.headers{
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
  }
  

`

const OrderContainer=styled.div`
  display: grid;
  grid-template-areas: 
  "orderID orderStatus orderDate"
  "orderDetails orderDetails orderDetails";
  grid-template-columns: 2fr 1fr 1fr;
  padding: 15px;

  div.orderID{
    grid-area: orderID;

  }

  div.orderStatus{
    grid-area: orderStatus;
    
  }

  div.orderDate{
    grid-area: orderDate;
  }

  div.orderDetails{
    grid-area: orderDetails;
    display: flex;
    justify-content: flex-end;
    background-color: ${props=> props.theme.colors.black};
    height: 15px;

    button{
      background-color: transparent;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 20px;
      font-size: 1.0rem;
      padding: 0;

      img{
        width: auto;
        height: 100%;
      } 
    }

    
  }
  
`


const reducer = (state: string, action: ActionReducer) => {
  switch (action.type){
    case "ordered": 
      return "ordered"
    
    case "preparation": 
      return "preparation"
    
    case "delivery": 
      return "delivery"
    
    case "completed": 
      return "completed"

  default:
     return state
    
  }

}

const OrdersManagement = () => {
  const [state, dispatch] = useReducer(reducer, "ordered");

  const [orders,setOrders] = useState<Array<Order> | null>(null)
  const [sortOption, setSortOption] = useState<boolean>(false)
  const [orderByType, setOrderByType] = useState<string>("ASC")
  const [orderDetails, setOrderDetails]=useState<string | null>(null)
  const [statusDropdown, setStatusDropdown]=useState<string | null>(null)


  useEffect(()=>{
    const getOrders= async(state: string, orderType: string ) =>{
        try{
          const collectionRef = collection(db, 'orders');

          const q = orderType === "ASC" ? query(collectionRef,where("status", "==", state),orderBy("date")) : query(collectionRef,where("status", "==", state),orderBy("date", 'desc'))
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

    getOrders(state, orderByType)

  },[state, orderByType]
  )

  console.log(orders)
  console.log(state)

  const changeStatus = async (orderID: string, status: string) =>{
    const order={
      status: status,
      }

        try{
          const docRef = doc(db, "orders", orderID);
          await updateDoc(docRef, order)
        }catch(error){
          console.log(error)
        }

      

  }

  
 console.log(orderDetails)
  return (
    <Container>
      <Nav>
        <button onClick={()=>  dispatch({ type: "ordered"})}>Ordered</button>
        <button onClick={()=>  dispatch({ type: "preparation"})}>Preparation</button>
        <button onClick={()=>  dispatch({ type: "delivery"})}>Delivery</button>
        <button onClick={()=>  dispatch({ type: "completed"})}>Completed</button>
      </Nav>
      <Header>
        <div className="sort_dropdown">
          <button onClick={()=> sortOption ? setSortOption(false) : setSortOption(true)}>Order by <img src={`${sortOption ? arrowUp : arrowDown}`}/></button>
          {sortOption &&
            <div>
              <button onClick={()=> setOrderByType("ASC")}>Ascending</button>
              <button onClick={()=> setOrderByType("DESC")}>Descending</button>
            </div>
          }
        </div>     
        <div className="headers">
          <p>Order ID</p>
          <p>Order status</p>
          <p>Date</p>     
        </div>


      </Header>
      
      <div>
        {orders?.map((order)=>

        <OrderContainer>
          <p className="orderID">{order.orderID}</p>
          <div className="orderStatus">
            <button onClick={()=> statusDropdown === null ? setStatusDropdown(order.orderID) : setStatusDropdown(null)} >{order.status}</button>
            {statusDropdown === order.orderID && 
              <div>
                  <button onClick={()=>changeStatus(order.orderID, "ordered")}>ordered</button>
                  <button onClick={()=>changeStatus(order.orderID, "preparation")}>preparation</button>
                  <button onClick={()=>changeStatus(order.orderID, "delivery")}>delivery</button>
                  <button onClick={()=>changeStatus(order.orderID, "completed")}>completed</button>
              </div>}
          </div>  
          <div className="orderDate">
            <p>{generateDate(order.date.toDate())}</p>
            <p>{generateHour(order.date.toDate())}</p>
          </div>
          
          

            
    
          
          {orderDetails === order.orderID &&
          <div>
            <p>Customer ID: {order.customerID}</p>
            <p>Delivery address: {order.deliveryAddress}</p>
            <p>Phone: {order.phone}</p>
            <p>Products: 
              {order.products.map((item) =>
               <span key={item.productID}> {getMenuItem(item.productID)?.title} x {item.quantity},</span>)}
            </p>
            
          </div>
          }

          <div className="orderDetails">
            <button onClick={()=> orderDetails === null ? setOrderDetails(order.orderID) : setOrderDetails(null)}>details <img src={`${orderDetails ? arrowUp : arrowDown}`}/></button>
          </div>
        </OrderContainer>
        
        
        )}
      </div>



    </Container>
        

  )
}

export default OrdersManagement