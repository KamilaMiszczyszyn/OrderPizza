import { useFormik } from 'formik'
import * as Yup from 'yup';
import {db} from "./../firebase/firebase"
import { doc, getDoc, addDoc, updateDoc, collection, Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from 'styled-components';
import {ShoppingCartContext} from "./../context/ShoppingCartContext"
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';

type UserData = {
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: number,
  address?: string,
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

const TotalPrice = styled.p`
    border-top: 1px solid ${props=> props.theme.colors.black};
    text-align: right;

`

const OrderSummary = () => {
    const currentUser = useContext(AuthContext)
    const [userData, setUserData] = useState<UserData | null>(null)
    const {shoppingCartItems, setShoppingCartItems} = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const formik = useFormik({
    initialValues: {
      phone: userData?.phone || "",
      address: userData?.address || "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object(
      {
        phone: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
    }),

    onSubmit:  async (values) => {
    
      const phone = values.phone;
      const address = values.address;

      const user={ 
              phone,
              address,         
      }

      if(currentUser){
        try{
          const docRef = doc(db, "users", currentUser);
          await updateDoc(docRef, user)
        }catch(error){
          console.log(error)
        }

      }
    } 
    }
  )

  useEffect(() => {
    const getPersonalData= async(user: string | null)=>{
      if(user){
        try{
          const docRef = doc(db, "users", user);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userPersonalData = docSnap.data();
            setUserData(userPersonalData)
             } else {
                 console.log("No such document!");
            } 
        }catch (error) {
            console.log(error)
            }}
  }

    getPersonalData(currentUser)

  }, [currentUser])

    const getMenuItem = (id: number) => {
    return menuItems.find((item) => item.productID === id)
  }

  const countPrice = (price: number | undefined, quantity: number | undefined) => {
    if(price && quantity){
      return price * quantity
    }
    
  }

  const countTotalPrice = () =>{
    let total = 0
      total = shoppingCartItems.reduce((accumulator, currentValue) => {
      const quantity = currentValue.quantity;
      const filteredMenuItems = menuItems.find((elem) => elem.productID === currentValue.productID)
      const price = filteredMenuItems?.price;
      let value
      if(price && quantity){
         value = quantity * price
       }else{value=0}  
      return accumulator + value
    },
    0)

    return total

  }

  const createOrder = async() =>{

    const order = {
        products: shoppingCartItems,
        customerID: currentUser,
        deliveryAddress: formik.values.address,
        phone: formik.values.phone,
        date: Timestamp.fromDate(new Date()),
        status: "ordered", 
        price: countTotalPrice(),
    }


     try{
        await addDoc(collection(db, "orders"), order);
        setShoppingCartItems([])
        navigate("/")

     }catch(error){
        toast.error("Create order failed");
        console.log(error)
        }

     }


  return (
    <Container>
        <H1>Order summary</H1>
        <H2>Personal information</H2>
        <p>If you want to change personal infromation go to settings</p>
        <p>First name</p>
        <p>{userData?.firstName}</p>  
        <p>Last name</p>
        <p>{userData?.lastName}</p>     
        <p>Email</p>
        <p>{userData?.email}</p>    

        <H2>Delivery information</H2>

        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="phone">Phone number</label>
            <input id="phone" type="string" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}/>
            {formik.touched.phone && formik.errors.phone ? <p>{formik.errors.phone}</p> : null}

            <label htmlFor="address">Address</label>
            <input id="address" type="text" name="address" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address}/>
            {formik.touched.address && formik.errors.address ? <p>{formik.errors.address}</p> : null}

            <button type="submit">Save delivery information in your profile </button>        
        </form>

        <H2>Shopping Cart</H2>

        <Table>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            {shoppingCartItems.map((item) =>
                <tr key={item.productID}>
                    <td>{getMenuItem(item.productID)?.title}</td>
                    <td>{getMenuItem(item.productID)?.price}{'\u20AC'}</td>
                    <td>{item.quantity}</td>
                    <td>{countPrice(getMenuItem(item.productID)?.price, item.quantity)}{'\u20AC'}</td>
                </tr>)}
        </Table>
        <TotalPrice>Total price: <span>{countTotalPrice()}</span> {'\u20AC'}</TotalPrice>

        <button onClick={() => createOrder()}>Order now</button>

        </Container>
  )
}

export default OrderSummary