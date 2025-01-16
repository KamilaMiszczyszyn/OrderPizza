import { PageContainer } from "../index"
import styled from "styled-components"
import { useState, useEffect, useReducer } from "react"
import sortIcon from './../../assets/sort.svg'
import { Timestamp, collection, orderBy, query, onSnapshot, where } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { generateDate, generateHour } from "../../utils/convertTime"
import getMenuItem from "../../utils/getMenuItem"
import downIcon from "./../../assets/arrow-down.png"
import upIcon from "./../../assets/arrow-up.png"

type ActionReducer = {type: "recencyDESC" | "recencyASC" };

type ShoppingCartItem = {
    productID: number, 
    quantity: number,

}

type User = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  createdAt: Timestamp,
  userID: string,
  role: string,

}

type Order = {
    products: Array<ShoppingCartItem>,
    customerID: string,
    deliveryAddress: string,
    date: Timestamp,
    status: string, 
    orderID: string,
    price: number,
};



const Container = styled.div`
  width: 872px;
 height: 90vh;
`
const Content = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;


  div.options{
    display: flex;
    justify-content: space-between;

  }
  
  
`

const OrdersQuantity = styled.div`
  background-color: ${props=> props.theme.colors.neutral[50]};
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 8px 16px;
  border-radius:  10px;
`

const SortButton = styled.button`
  background-color: transparent;
  padding: 8px 16px;
  border-radius:  10px;
  border: 1px solid ${props=> props.theme.colors.neutral[200]};
  display: flex;
  align-items: center;
  column-gap: 8px;
  
`
const SortOption = styled.div`
  position: relative;
`
const Dropdown=styled.div`
  width: 300px;
  border-radius:  10px;
  border: 1px solid ${props=> props.theme.colors.neutral[200]};
  position: absolute;
  right: 0;
  top: 48px;
  background-color: ${props=> props.theme.colors.white};
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 16px 0;
  box-shadow: ${props=> props.theme.shadow};

`
const DropdownItem = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  text-align: left;

  &:hover{
    background-color: ${props=> props.theme.colors.neutral[50]};
  }


`



const Header=styled.div`
    background-color: ${props=> props.theme.colors.neutral[900]};
    border-radius: 10px 10px 0 0;
    display: grid;
    grid-template-columns: 1fr 100px 218px;
    column-gap: 32px;
    padding: 16px 40px 16px 24px;
`

const H3 = styled.h3`
    color: ${props=> props.theme.colors.neutral[50]};
    font-size: ${props=> props.theme.typography.fontSize["sm"]};
`


const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding: 0 16px 0 0;
  height: 55vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
        width: 6px; 
    }

  &::-webkit-scrollbar-track {
      background-color: ${props => props.theme.colors.neutral[50]}; 
      border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.colors.neutral[200]};
      border-radius: 10px; 
  }

  &::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.colors.neutral[700]}; 
  }
  
`

const ListItem=styled.div`
    border-radius: 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
  div.content { 
    display: grid;
    grid-template-columns: 1fr 100px 160px auto ;
    column-gap: 32px;
    align-items: center;
    padding: 16px 24px;

    div.items{
      display: flex;
      flex-direction: column;
      row-gap:  8px;

      div.item{
        display: flex;
        justify-content: space-between;

      }


    }

    div.date {
      display: flex;
      flex-direction: column;
      row-gap:  8px;


    }
    
  }

  button{
    background-color: transparent;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
      background-color: ${props => props.theme.colors.neutral[50]};
    }

    img{
      width: 16px;
      height:16px;
    }
  }
    

    div.details{
      background-color: ${props => props.theme.colors.neutral[50]};
      padding: 16px 24px;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      div{
        display: flex;
        align-items: flex-end;
        column-gap: 24px;
       
        h4 {
        color: ${props => props.theme.colors.neutral[700]};
        font-size: ${props=> props.theme.typography.fontSize["xs"]};
        font-weight: ${props=> props.theme.typography.fontWeight["regular"]}; 
        width: 120px;
      }

      p{
        font-size: ${props=> props.theme.typography.fontSize["xs"]};

      }

      }

      

    }
`


const QuantityContainer=styled.div`
background-color: ${props=> props.theme.colors.neutral[100]};
    border-radius: 4px;
    width: 24px;
    height: 24px; 
    display: flex;
    align-items: center;
    justify-content: center;
    
`
const numberOfOrders = (orders: Array<Order> | null) => {
  if(orders){
        return orders.length
  }
  return 0
}

const getFullname = (id: string, users: Array<User> | null): string => {
  if(users){
    const user = users.find((user) => user.userID === id); 
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
  } 
   return "No user";
}

const getPhoneNumber = (id: string, users: Array<User> | null): string => {
  if(users){
    const user = users.find((user) => user.userID === id); 
    if (user) {
      console.log(user.phone)
      return user.phone ? `${user.phone.slice(0, 3)} ${user.phone.slice(3, 6)} ${user.phone.slice(6)}` : "-"
    }
  } 
   return "-";
}


const reducer = (state: string, action: ActionReducer) => {
  switch (action.type){
    
    case "recencyDESC": 
      return "recencyDESC"
    
    case "recencyASC": 
      return "recencyASC"

  default:
     return state
    
  }
}

export const OrdersHistory = () => {
  const [state, dispatch] = useReducer(reducer, "recencyASC");
  const [sortOption, setSortOption] = useState<boolean>(false);
  const [orders, setOrders] = useState<Array<Order> | null>(null)
  const [details, setDetails] = useState<null | string>(null)

  const [users, setUsers] = useState<Array<User> | null>(null)

  useEffect(() => {
              const getOrders= () =>{
                  try{
                      const collectionRef = collection(db, 'orders');
                      let q = query(collectionRef, where("status", "==", "completed"), orderBy("date"));

                      if (state === "recencyASC") {
                        q = query(collectionRef, where("status", "==", "completed"), orderBy("date","desc"));
                      }

                      if (state === "recencyDESC") {
                        q = query(collectionRef, where("status", "==", "completed"), orderBy("date"));
                      }

                      
                      const unsubscribe =  onSnapshot( q, (querySnapshot) => {
                      
                      const orders= querySnapshot.docs.map((doc) => (
                          {
                              products: doc.data().products,
                              customerID: doc.data().customerID,
                              deliveryAddress: doc.data().deliveryAddress,
                              date: doc.data().date,
                              status: doc.data().status,
                              orderID: doc.id,
                              price: doc.data().price,
                              }))

                              setOrders(orders as Array<Order>);
                            
                          })
              
                          
                          return () => unsubscribe;
              
              
                          }catch (error) {
                          console.log(error)
                          }
            }
          
              getOrders()
          
            }, [state])


            useEffect(() => {
            const getUsers= () =>{
                try{
                    const collectionRef = collection(db, 'users');
                    
                    const unsubscribe =  onSnapshot( collectionRef, (querySnapshot) => {
                    
                    const users= querySnapshot.docs.map((doc) => (
                        {
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        email: doc.data().email,
                        phone: doc.data().phone,
                        createdAt: doc.data().createdAt,
                        userID: doc.id,
                        role: doc.data().role
                  
                        }))

                        const filteredUsers = users.filter((user) => user.role !== "admin") 
                        setUsers(filteredUsers);
                        })
            
                        
                        return () => unsubscribe;
            
            
                        }catch (error) {
                        console.log(error)
                        }
          }
        
            getUsers()
        
          }, [])
  
          console.log(orders)

  return (
    <Container>
      <PageContainer title="Orders history" small>
        <Content>
          <div className="options">
        <OrdersQuantity>
          {`${numberOfOrders(orders)} orders`}

        </OrdersQuantity>
        <SortOption>
          <SortButton onClick={()=>setSortOption(!sortOption)}>Sort<img src={sortIcon} alt=''/></SortButton>
          {sortOption && 
            <Dropdown>
              <DropdownItem onClick={()=>  dispatch({ type: "recencyDESC"})}>By recency (Oldest to newest)</DropdownItem>
              <DropdownItem onClick={()=>  dispatch({ type: "recencyASC"})}>By recency (Newest to oldest)</DropdownItem>
            </Dropdown>
            }
        </SortOption>
        

      </div>
        <Header>
            <H3>Order ID</H3>
            <H3>Date</H3>
            <H3>Items</H3>
        </Header>
        <ListContainer>
          {orders?.map(order => 
          <ListItem key={order.orderID}>
            <div className="content">
              <p className="orderID">{order.orderID}</p>
              <div className="date">
                  {order.date ?
                  <>
                  <p>{generateDate(order.date.toDate())} </p>
                  <p>{generateHour(order.date.toDate())}</p></> : <p>None</p>
                  }

                </div>    
                <div className="items">
                  {order.products?.map((item) =>
                    <div className="item"  key={item.productID}><p>{getMenuItem(item.productID)?.name}</p> <QuantityContainer>{item.quantity}</QuantityContainer></div>)}
                </div>
                
                <button onClick={() => setDetails(details === order.orderID ? null : order.orderID)}>{details === order.orderID ? <img src={upIcon} alt=''/> : <img src={downIcon} alt=''/>}</button>  
            </div>
            {details === order.orderID && 
            <div className="details">
              <div><h4>Customer</h4><p>{getFullname(order.customerID, users)}</p></div>
              <div><h4>Phone number</h4><p>{getPhoneNumber(order.customerID, users)}</p></div>
              <div><h4>Delivery address</h4><p>{order.deliveryAddress}</p></div>
              <div><h4>Total price</h4><p>{order.price} {'\u20AC'}</p></div>



            </div>}

                
            </ListItem>


          )}

        </ListContainer>
        </Content>
    </PageContainer>

        
      

    </Container>
  )
}

