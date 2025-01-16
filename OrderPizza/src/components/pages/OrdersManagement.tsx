import { useReducer, useEffect, useState } from 'react'
import styled from 'styled-components'
import { query, collection, onSnapshot, Timestamp, orderBy, updateDoc, doc, where} from "firebase/firestore";
import {db} from "./../../firebase/firebase"
import { generateDate, generateHour } from './../../utils/convertTime'
import getMenuItem from '../../utils/getMenuItem';
import downIcon from "./../../assets/arrow-down.png"
import upIcon from "./../../assets/arrow-up.png"
import { PageContainer } from './../index'
import sortIcon from './../../assets/sort.svg'

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

type User = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  createdAt: Timestamp,
  userID: string,
  role: string,

}

type ActionReducer = {
  type: "ordered" | "preparation" | "delivery" | "completed"
}

type ActionReducerSort = {type: "recencyDESC" | "recencyASC" };

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
    justify-content: flex-end;

  }

  div.list-container{
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding: 0 16px 0 0;
  height: 50vh;
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

  }
  
  
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


const Nav = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  
`

const NavButton = styled.button<{ 
  $ordered?: boolean; 
  $preparation?: boolean; 
  $delivery?: boolean; 
  $completed?: boolean; 
}>`
  background-color: ${props => 
    (props.$ordered || 
     props.$preparation || 
     props.$delivery || 
     props.$completed) 
      ? props.theme.colors.neutral[900] 
      : "transparent"}; 

  color: ${props => 
    (props.$ordered || 
     props.$preparation || 
     props.$delivery || 
     props.$completed) 
      ? props.theme.colors.neutral[50] 
      : props.theme.colors.neutral[700] }; 

      border-radius: ${props => 
    (props.$ordered || 
     props.$preparation || 
     props.$delivery || 
     props.$completed) 
      ? "10px 10px 0 0"
      : "none" }; 

    padding: 16px;
    display: flex;
    column-gap: 8px;
    align-items: center;
    justify-content: center;
`;



const Header = styled.div<{ $ordered?: boolean; $completed?: boolean; }>`
    display: grid;
    grid-template-columns: 1fr 100px 150px 222px ;
    padding: 16px 24px;
    column-gap: 24px;
    background-color: ${props=> props.theme.colors.neutral[900]};
    border-radius: ${props => {
    if (props.$ordered) return "0 10px 0 0";   
    if (props.$completed) return "10px 0 0 0";   
    return "10px 10px 0 0";
  }};
`

const H3 = styled.h3`
    color: ${props=> props.theme.colors.neutral[50]};
    font-size: ${props=> props.theme.typography.fontSize["sm"]};
`
const OrdersQuantity = styled.div`
  background-color: ${props=> props.theme.colors.primary[500]}; 
  border-radius: 50%;
  font-size: 1.0rem;
  color: ${props=> props.theme.colors.neutral[50]};
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`


const ListItem=styled.div`
    border-radius: 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
  div.content { 
    display: grid;
    grid-template-columns: 1fr 100px 150px 150px auto ;
    column-gap: 24px;
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

  button.details{
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
    
  div.order-status{
    position: relative;
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
const StatusButton = styled.button`
  border-radius: 10px;
  border: 1px solid ${props=> props.theme.colors.neutral[200]};
  background-color: transparent;
  width: 150px;
  font-size: ${props=> props.theme.typography.fontSize["xs"]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  font-weight: ${props=> props.theme.typography.fontWeight["regular"]}; 

  img{
      width: 16px;
      height:16px;
    }

  &:hover{
    background-color: ${props=> props.theme.colors.neutral[50]};
  }
`
const StatusDropdown = styled.div`
width: 150px;
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
  z-index: 1;
  box-shadow: ${props=> props.theme.shadow};


`

const StatusDropdownItem = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  text-align: left;
  font-size: ${props=> props.theme.typography.fontSize["xs"]};
   font-weight: ${props=> props.theme.typography.fontWeight["regular"]}; 

  &:hover{
    background-color: ${props=> props.theme.colors.neutral[50]};
  }


`

const Empty = styled.p`
    font-size: ${props=> props.theme.typography.fontSize["lg"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
    text-align: center;

`


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

const reducerSort = (stateSort: string, actionSort: ActionReducerSort) => {
  switch (actionSort.type){
    
    case "recencyDESC": 
      return "recencyDESC"
    
    case "recencyASC": 
      return "recencyASC"

  default:
     return stateSort
    
  }
}



const OrdersManagement = () => {

  const [state, dispatch] = useReducer(reducer, "ordered");

  const [orders,setOrders] = useState<Array<Order> | null>(null)
  const [sortOption, setSortOption] = useState<boolean>(false)
  const [stateSort, dispatchSort] = useReducer(reducerSort, "recencyASC");
   const [details, setDetails] = useState<null | string>(null)
  const [statusDropdown, setStatusDropdown]=useState<string | null>(null)
   const [users, setUsers] = useState<Array<User> | null>(null)
   const [ordersQuantity, setOrdersQuantity]=useState<{ordered:number, preparation: number, delivery: number, completed: number}>({ordered:0, preparation: 0, delivery: 0, completed: 0})


  useEffect(() => {
  const getOrders = () => {
    try {
      const today: Date = new Date();
            
      const startOfDay: Date = new Date(today); 
      startOfDay.setHours(0, 0, 0, 0);   

      const endOfDay: Date = new Date(today);  
      endOfDay.setHours(23, 59, 59, 999);

      const startOfDayTimestamp: Timestamp = Timestamp.fromDate(startOfDay);
      const endOfDayTimestamp: Timestamp = Timestamp.fromDate(endOfDay);

      const collectionRef = collection(db, "orders");
      let q = query(
      collectionRef,
      where("date", ">=", startOfDayTimestamp),
      where("date", "<=", endOfDayTimestamp),
      orderBy("date")
    );
      if (stateSort === "recencyASC") {
        q = query(collectionRef, where("date", ">=", startOfDayTimestamp),
      where("date", "<=", endOfDayTimestamp),orderBy("date","desc"));
      }

      if (stateSort === "recencyDESC") {
        q = query(collectionRef, where("date", ">=", startOfDayTimestamp),
      where("date", "<=", endOfDayTimestamp),orderBy("date"));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const orders = querySnapshot.docs.map((doc) => ({
          products: doc.data().products,
          customerID: doc.data().customerID,
          deliveryAddress: doc.data().deliveryAddress,
          date: doc.data().date,
          status: doc.data().status,
          orderID: doc.id,
          price: doc.data().price,
        }));

        
        setOrders(orders as Array<Order>);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  };

  getOrders();
}, [stateSort]);


              useEffect(() => {
  const getOrdersQuantity = (orders: Array<Order> | null) => {
    if (orders && orders.length > 0) {
      const quantity = {
        ordered: orders.filter((order) => order.status === "ordered").length,
        preparation: orders.filter((order) => order.status === "preparation").length,
        delivery: orders.filter((order) => order.status === "delivery").length,
        completed: orders.filter((order) => order.status === "completed").length,
      };
      setOrdersQuantity(quantity);
    } else {
    
      setOrdersQuantity({
        ordered: 0,
        preparation: 0,
        delivery: 0,
        completed: 0,
      });
    }
  };

  if (orders) { 
    getOrdersQuantity(orders);
  }
}, [orders]);
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

  

  
  return (
    <Container>
      <PageContainer title="Orders Management" small>
        <Content>
          <div className="options">
        <SortOption>
          <SortButton onClick={()=>setSortOption(!sortOption)}>Sort<img src={sortIcon} alt=''/></SortButton>
          {sortOption && 
            <Dropdown>
              <DropdownItem onClick={()=>  dispatchSort({ type: "recencyDESC"})}>By recency (Oldest to newest)</DropdownItem>
              <DropdownItem onClick={()=>  dispatchSort({ type: "recencyASC"})}>By recency (Newest to oldest)</DropdownItem>
            </Dropdown>
            }
        </SortOption>
        

      </div>
      <div className='header'>
         <Nav>
            <NavButton $ordered={state === "ordered"} onClick={()=>  dispatch({ type: "ordered"})}>Ordered <OrdersQuantity>{ordersQuantity.ordered}</OrdersQuantity></NavButton>
            <NavButton $preparation={state === "preparation"} onClick={()=>  dispatch({ type: "preparation"})}>Preparation <OrdersQuantity>{ordersQuantity.preparation}</OrdersQuantity></NavButton>
            <NavButton $delivery={state === "delivery"} onClick={()=>  dispatch({ type: "delivery"})}>Delivery <OrdersQuantity>{ordersQuantity.delivery}</OrdersQuantity></NavButton>
            <NavButton $completed={state === "completed"} onClick={()=>  dispatch({ type: "completed"})}>Completed <OrdersQuantity>{ordersQuantity.completed}</OrdersQuantity></NavButton>
          </Nav>
      <Header $ordered={state === "ordered"} $completed={state === "completed"}>
          <H3>Order ID</H3>
          <H3>Date</H3> 
          <H3>Items</H3>
          <H3>Order status</H3>
             
      </Header>

      </div>
         
      
      <div className='list-container'>
        {orders?.filter(order => order.status === state).length ===  0 && <Empty>{`No orders with ${state} status found`}</Empty>}
        {orders?.filter(order => order.status === state).map((order)=>

        <ListItem key={order.orderID}>
          <div className='content'>
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
                <div className="order-status">
            <StatusButton onClick={()=> statusDropdown === null ? setStatusDropdown(order.orderID) : setStatusDropdown(null)} >{order.status} {statusDropdown === order.orderID ? <img src={upIcon} alt=''/> : <img src={downIcon} alt=''/>}</StatusButton>
            {statusDropdown === order.orderID && 
              <StatusDropdown>
                  <StatusDropdownItem onClick={()=> {changeStatus(order.orderID, "ordered");setStatusDropdown(null)}}>ordered</StatusDropdownItem>
                  <StatusDropdownItem onClick={()=>{changeStatus(order.orderID, "preparation"); setStatusDropdown(null)}}>preparation</StatusDropdownItem>
                  <StatusDropdownItem onClick={()=>{changeStatus(order.orderID, "delivery");setStatusDropdown(null)}}>delivery</StatusDropdownItem>
                  <StatusDropdownItem onClick={()=>{changeStatus(order.orderID, "completed");setStatusDropdown(null)}}>completed</StatusDropdownItem>
              </StatusDropdown>}
          </div>  
                <button className='details' onClick={() => setDetails(details === order.orderID ? null : order.orderID)}>{details === order.orderID ? <img src={upIcon} alt=''/> : <img src={downIcon} alt=''/>}</button> 

          </div>
      
            
    
          
          {details === order.orderID &&
          <div className='details'>
            <div><h4>Customer</h4><p>{getFullname(order.customerID, users)}</p></div>
            <div><h4>Phone number</h4><p>{getPhoneNumber(order.customerID, users)}</p></div>
            <div><h4>Delivery address</h4><p>{order.deliveryAddress}</p></div>
            <div><h4>Total price</h4><p>{order.price} {'\u20AC'}</p></div>
            
          </div>
          }

          {orders?.filter(order => order.status === state).length ===  0 && <Empty>{`No orders with ${state} status found`}</Empty>}
        </ListItem>
        
        
        )}
      </div>
      

        </Content>
        

      </PageContainer>
      



    </Container>
        

  )
}

export default OrdersManagement