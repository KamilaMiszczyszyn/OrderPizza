import {db} from "./../../firebase/firebase"
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState, useReducer } from "react";
import { AuthContext } from "../../context/AuthContext";
import styled from 'styled-components';
import {ShoppingCartContext} from "./../../context/ShoppingCartContext"
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import {PageContainer, SectionContainer, Button, Input, SectionHeader} from "./../index"
import useShoppingCartQuantity from '../../hooks/useShoppingCartQuantity';
import getMenuItem from '../../utils/getMenuItem';
import iconAdd from "./../../assets/add-white.svg"
import iconMinus from "./../../assets/minus-white.svg"
import iconPin from "./../../assets/pin-red.svg"
import iconEdit from "./../../assets/edit-white.svg"
import iconPayPal from "./../../assets/PayPal.png"
import iconMastercard from "./../../assets/mastercard.png"
import iconVisa from "./../../assets/visa.png"
import subtotalPrice from "./../../utils/subtotalPrice"

import { useFormik } from 'formik'
import * as Yup from 'yup';

type UserData = {
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: number,
  address?: string,
}

const Container=styled.div`
width: 864px;
margin: 128px 0;

@media (max-width: 864px) {
    width: 100%;
    margin: 16px;   
    }
`

const StepContainer= styled.div<{ $active?: boolean; }>`
  display: flex;
  column-gap: 24px;
  margin-bottom: 56px;

  >div.step-number{
    margin-top: 16px;

    @media (max-width: 490px) {
    display: none;
  }

  }

  >div.step-details{
    border-radius: 10px;
    border: ${props => props.$active ? "none" : `1px solid ${props.theme.colors.neutral[200]}`};
    flex: 1;

    @media (max-width: 490px) {
    border: none;
  }
  }
`

const StepHeader = styled.div`

@media (max-width: 490px) {
  display: flex;
  align-items: center;
  column-gap: 24px;
  }


  div.step-number {
    display: none;

    @media (max-width: 490px) {
    display: initial;
  }

  

}


`

const StepNumber= styled.div<{ $active?: boolean; }>`
    background-color: ${props=> props.$active ? props.theme.colors.primary[500] : props.theme.colors.neutral[100] };
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props=> props.$active ? props.theme.colors.neutral[50] : props.theme.colors.neutral[700] };
    font-size: ${props=> props.theme.typography.fontSize["xl"]};

    @media (max-width: 490px) {
    width: 40px;
    height: 40px;
    font-size: ${props=> props.theme.typography.fontSize["lg"]};
  }
`


const ShoppingCartItemContainer = styled.div`
display: flex;
justify-content: space-between;
padding: 16px 24px;

@media (max-width: 490px) {
    flex-direction: column;
  }


div.name{
  display: flex;
  column-gap: 16px;
  align-items: center;

  div{
    width: 80px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  img {
  height: 45px;
  
}

}
div.price{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;

  @media (max-width: 490px) {
    align-self: flex-end;
  }


  & > p {
  margin-left: auto; 
}

  
}

div.quantity{
  display: flex;
  align-items: center;
  width: 80px;
  justify-content: space-between;

}


  
`
const ShoppingCartItems=styled.div<{ $active?: boolean; }>`
border-bottom: ${props => props.$active ? `1px solid ${props.theme.colors.neutral[200]}` : "none"};
`

const PriceSummary=styled.div`

div.subtotal-price, div.delivery-price, div.total-price{
  display: flex;
  justify-content: flex-end;
  column-gap: 16px;
  padding: 0 24px;

  p:nth-child(2){
    width: 80px;
    text-align: end;
  }

}

div.total-price{

}
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  

  input{
    width: auto;
  }

  label{
    margin:0;
    
  }
`

const InputRadio= styled.div`
  display: flex;
  column-gap: 16px;
  padding: 16px;
  align-items: center;
  height: 75px;

  input:checked InputRadio{
    border: 1px solid ${props => props.theme.colors.neutral[200]};

  }

  div.cardLogo{
    display: flex;
    column-gap: 16px;

  }
`
const SectionFooter=styled.div`
  display: flex;
  justify-content: flex-end;


`
  
  



const PageFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 16px;

  @media (max-width: 490px) {
    flex-direction: column-reverse;
    justify-content: flex-end;

    button{
      width: 100%;
    }
  }


`

const HeaderEdit=styled.div`
  display: flex;
  justify-content: space-between;
`

type ReducerState = {
  step1: boolean;
  step2: "true" | "false" | "disabled";
  step3: "true" | "false" | "disabled";
};

type ActionReducer = {
  type: string;
  payload?: string;
};

const initialState = {
  step1: "true",
  step2: "disabled",
  step3: "disabled",

};

const reducer = (state: ReducerState, action: ActionReducer) => {
  switch (action.type) {
    case "TOGGLE_STEP1":
      return { ...state, step1: !state.step1 };

    case "SET_STEP2":
      return { ...state, step2: action.payload }; 

    case "SET_STEP3":
      return { ...state, step3: action.payload }; 

    default:
      return state;
  }
};


const OrderSummary = () => {
    const {uid} = useContext(AuthContext)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [activeButtonPayment, setActiveButtonPayment] = useState<boolean>(false)
    const {shoppingCartItems, setShoppingCartItems} = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const changeQuantity=useShoppingCartQuantity()

    const [state, dispatch] = useReducer(reducer, initialState);

    const [order, setOrder] = useState({})

     const formik = useFormik({
    initialValues: {
      option: '',  // wartość początkowa dla radio
      customAddress: '',  // wartość początkowa dla input text
    },
    validationSchema: Yup.object({
      option: Yup.string().required('Wybór opcji jest wymagany'),
      customAddress: Yup.string().when('option', {
        is: 'custom', // Używamy prostego warunku sprawdzającego, czy opcja to 'custom'
        then: (schema) => schema
          .required('Adres zamieszkania jest wymagany')  // Wymagane, jeśli wybrano 'custom'
          .matches(/\d+/, 'Address must contain a house number'),  // Walidacja, że musi być liczba
        otherwise: (schema) => schema.notRequired(),  // W innych przypadkach nie jest wymagane
      }),
    }),

    onSubmit: (values) => {

      const deliveryAddress= formik.values.option === "custom" ? formik.values.customAddress : formik.values.option

      const updateOrder = {
        ...order,
        deliveryAddress: deliveryAddress,  
      }

      console.log(updateOrder)
      dispatch({ type: "SET_STEP2", payload: "false" });

       if(state.step3 === "disabled"){
        dispatch({ type: "SET_STEP3", payload: "true" });
      } 

      setOrder(updateOrder)
      },
  });

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

    getPersonalData(uid)

  }, [uid])



  const countPrice = (price: number | undefined, quantity: number | undefined) => {
    if(price && quantity){
      return price * quantity
    }
    
  }


  const createOrder = async(order) =>{

    const orderData = {
        products: shoppingCartItems,
        customerID: uid,
        deliveryAddress: order.deliveryAddress,
        date: Timestamp.fromDate(new Date()),
        status: "ordered", 
        price: order.totalPrice,
        paymentMethod: order.paymentMethod,
    }


     try{
        await addDoc(collection(db, "orders"), orderData);
        setShoppingCartItems([])
        navigate("/")

     }catch(error){
        toast.error("Create order failed");
        console.log(error)
        }

     }


  return (

    <Container>
      <PageContainer title="Order summary">

{/* STEP 1 */}
      {state.step1 &&
      <StepContainer $active>
        <div className="step-number"><StepNumber $active>1</StepNumber></div>
        <div className="step-details">
          <SectionContainer>
            <StepHeader><div className="step-number"><StepNumber $active>1</StepNumber></div><SectionHeader>Shopping Cart</SectionHeader></StepHeader>
          <ShoppingCartItems $active>
            {shoppingCartItems.map((item =>
             <ShoppingCartItemContainer  key={item.productID}>
              
              <div className="name">
                  <div>
                    <img 
                    src={getMenuItem(item.productID)?.img ? getMenuItem(item.productID)?.img : iconAdd} 
                    alt={getMenuItem(item.productID)?.name} 
                  />
                </div>
                <p>{getMenuItem(item.productID)?.name}</p>
              </div>
              <div className="price">
                <div className="quantity">
                <Button buttonType="icon" iconLeft={iconMinus} onClick={()=>changeQuantity(item, "decrement")}/>
                <p>{item.quantity}</p>
                <Button buttonType="icon" iconLeft={iconAdd} onClick={()=>changeQuantity(item, "increment")}/> 
                </div>
                <p>{countPrice(getMenuItem(item.productID)?.price, item.quantity)}{'\u20AC'}</p>

              </div>
              
             </ShoppingCartItemContainer>
            ))}
          </ShoppingCartItems>
          <PriceSummary>
            <div className="subtotal-price">
              <p>Subtotal price:</p>
              <p>{subtotalPrice(shoppingCartItems)} {'\u20AC'}</p>

            </div>
            <div className="delivery-price">
              <p>Delivery:</p>
              <p>0 {'\u20AC'}</p>
              
            </div>
            <div className="total-price">
              <p>Total price:</p>
              <p>{subtotalPrice(shoppingCartItems)} {'\u20AC'}</p>
              
            </div>

          </PriceSummary>
          <SectionFooter>
            <Button buttonType="primary" onClick={() => {
              dispatch({ type: "TOGGLE_STEP1" });

              if(state.step2 === "disabled"){
                dispatch({ type: "SET_STEP2", payload: "true" });
              } 
              setOrder({...order, products: shoppingCartItems, totalPrice: subtotalPrice(shoppingCartItems) })
            }}>Next</Button>

          </SectionFooter>
          
          
        </SectionContainer>
        </div>
        
      </StepContainer>
      }

      {!state.step1 &&
      <StepContainer>
        <div className="step-number"><StepNumber>1</StepNumber></div>
        <div className="step-details">
          <SectionContainer>
            <HeaderEdit>
              <StepHeader><div className="step-number"><StepNumber>1</StepNumber></div><SectionHeader>Shopping Cart</SectionHeader> </StepHeader>
              <Button buttonType="icon" iconLeft={iconEdit} onClick={()=> {dispatch({ type: "TOGGLE_STEP1" }); order.deliveryAddress ? dispatch({ type: "SET_STEP2", payload: "false" }) :  dispatch({ type: "SET_STEP2", payload: "disabled" }); order.paymentMethod ? dispatch({ type: "SET_STEP3", payload: "false" }): dispatch({ type: "SET_STEP3", payload: "disabled" })}}/>
            </HeaderEdit>
          <ShoppingCartItems>
            {shoppingCartItems.map((item =>
             <ShoppingCartItemContainer key={item.productID}>
              
              <div className="name">
                <img 
                  src={getMenuItem(item.productID)?.img ? getMenuItem(item.productID)?.img : iconAdd} 
                  alt={getMenuItem(item.productID)?.title} 
                />
                <p>{getMenuItem(item.productID)?.name}</p>
              </div>
              <div className="price">
                
                <p>{countPrice(getMenuItem(item.productID)?.price, item.quantity)}{'\u20AC'}</p>

              </div>
              
             </ShoppingCartItemContainer>
            ))}
          </ShoppingCartItems>
          
        </SectionContainer>
        </div>
      </StepContainer>
      
      
      
      
      }

{/* STEP 2 */}
      {state.step2 === "true" &&
      <StepContainer $active>
        <div className="step-number"><StepNumber $active>2</StepNumber></div>
        <div className="step-details">
          <SectionContainer>
            <StepHeader><div className="step-number"><StepNumber $active>2</StepNumber></div><SectionHeader>Delivery address</SectionHeader></StepHeader>
          <Form onSubmit={formik.handleSubmit}>
            {userData?.addressesList?.slice(0, 3).map((address) => (
              <InputRadio key={address.addressID}>    
                  <input
                    type="radio"
                    id={address.addressID}
                    name="option"
                    value={address.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.option === address.address}
                  />
                  <label htmlFor={address.addressID}>{address.address}</label>   
              </InputRadio>
            ))}
      
 
              <InputRadio>
                <input
                  type="radio"
                  name="option"
                  value="custom"
                  checked={formik.values.option === 'custom'}
                  onChange={formik.handleChange}
                />
                <label>
                  <Input
                    type="text"
                    name="customAddress"
                    value={formik.values.customAddress}
                    onChange={formik.handleChange}
                    placeholder="Enter new address"
                    onBlur={formik.handleBlur}
                    onFocus={() => formik.setFieldValue('option', 'custom')} // Ustawienie wartości opcji
                    onClick={() => formik.setFieldValue('option', 'custom')} // Ustawienie wartości opcji
                    touched={formik.touched.customAddress}
                    error={formik.errors.customAddress}
                  />
                </label>

              </InputRadio>
   

            {formik.errors.option && (
              <div style={{ color: 'red' }}>{formik.errors.option}</div>
            )}

            <SectionFooter>

            {formik.isValid && formik.dirty ? (
  <Button buttonType="primary" type="submit">Next</Button>
) : (
  <Button buttonType="disabled" disabled>Next</Button>
)}
            
            </SectionFooter>

            
          </Form>
          
        </SectionContainer>
          
        </div>
        

      </StepContainer>
}

{state.step2 === "false" &&
<StepContainer>
  <div className="step-number"><StepNumber>2</StepNumber></div>
    <div className="step-details">
      <SectionContainer>
        <HeaderEdit>
          <StepHeader><div className="step-number"><StepNumber>2</StepNumber></div><SectionHeader>Delivery address</SectionHeader></StepHeader>
          <Button buttonType="icon" iconLeft={iconEdit} onClick={()=> {dispatch({ type: "SET_STEP2", payload: "true" }); order.paymentMethod ? dispatch({ type: "SET_STEP3", payload: "false" }): dispatch({ type: "SET_STEP3", payload: "disabled" })}}/>
        </HeaderEdit>
        
        <div style={{display: "flex", columnGap: "16px", padding: "16px"}}>
          <img src={iconPin} alt="" />
          <p>{order.deliveryAddress}</p>  
    </div>


  </SectionContainer>
      
    </div>
  

</StepContainer>
}

{state.step2 === "disabled" && 
    <StepContainer>
      <div className="step-number"><StepNumber>3</StepNumber></div>
      <SectionContainer>
        <StepHeader><div className="step-number"><StepNumber>2</StepNumber></div><SectionHeader>Delivery address</SectionHeader></StepHeader>
      </SectionContainer>
    </StepContainer>

}







{/* STEP 3 */}
    {state.step3 === "true" &&
      <StepContainer $active>
         <div className="step-number"><StepNumber $active>3</StepNumber></div>
        <div className="step-details">
          <SectionContainer>
            <StepHeader><div className="step-number"><StepNumber $active>3</StepNumber></div><SectionHeader>Payment method</SectionHeader></StepHeader>
            <Form onSubmit={(event) => {event.preventDefault(); dispatch({ type: "SET_STEP3", payload: "false" })}}>
              <InputRadio>
                <input id="BankTransfer" type="radio" name="option" value="BankTransfer" onChange={() => {
        setOrder({ ...order, paymentMethod: "BankTransfer" });
        setActiveButtonPayment(true);
      }} checked={order?.paymentMethod === "BankTransfer"}/>
                <label htmlFor="BankTransfer">Bank transfer</label>    
              </InputRadio>
                
              <InputRadio>
                <input id="PayPal" type="radio" name="option" value="PayPal" onChange={() => {
        setOrder({ ...order, paymentMethod: "PayPal" });
        setActiveButtonPayment(true);
      }} checked={order?.paymentMethod === "PayPal"}/>
                <label htmlFor="PayPal">PayPal</label>
                <img src={iconPayPal} alt=""/>
              </InputRadio>

              <InputRadio>
                <input id="CreditDebitCard" type="radio" name="option" value="CreditDebitCard" onChange={() => {
        setOrder({ ...order, paymentMethod: "CreditDebitCard" });
        setActiveButtonPayment(true);
      }} checked={order?.paymentMethod === "CreditDebitCard"} />
                <label htmlFor="CreditDebitCard">Credit/Debit Card</label>  
                <div className="cardLogo">
                  <img src={iconMastercard} alt=""/>
                  <img src={iconVisa} alt=""/>
                </div>
              </InputRadio> 
                           
               <SectionFooter>
                {activeButtonPayment ? 
                  <Button buttonType="primary" type="submit">Next</Button> :
                  <Button buttonType="disabled" disabled>Next</Button>
                }       
            </SectionFooter>
            </Form>
          
        </SectionContainer>

        </div>
         
      </StepContainer>
    }

      {(state.step3 === "false" || (state.step3 === "disabled" && state.step1 === "false" && state.step3 === "false"))  &&

    <StepContainer>
      <div className="step-number"><StepNumber>3</StepNumber></div>
      <div className="step-details">
        <SectionContainer>
          <HeaderEdit>
          <StepHeader><div className="step-number"><StepNumber>3</StepNumber></div><SectionHeader>Payment method</SectionHeader></StepHeader>
          <Button buttonType="icon" iconLeft={iconEdit} onClick={()=> {dispatch({ type: "SET_STEP3", payload: "true" })}}/>
        </HeaderEdit>
        <div style={{display: "flex", columnGap: "16px", padding: "16px"}}>
          <p>{order.paymentMethod}</p>
        {order.paymentMethod === "PayPal" && <img src={iconPayPal} alt=""/> }
        {order.paymentMethod === "CreditDebitCard" &&
          <div className="cardLogo">
            <img src={iconMastercard} alt=""/>
            <img src={iconVisa} alt=""/>
          </div> }
        </div>
        
      </SectionContainer>

      </div>
      
    </StepContainer>
}

    {state.step3 === "disabled" &&

    <StepContainer>
      <div className="step-number"><StepNumber>3</StepNumber></div>
      <SectionContainer>
        <StepHeader><div className="step-number"><StepNumber>3</StepNumber></div><SectionHeader>Payment method</SectionHeader></StepHeader>

 
      </SectionContainer>
    </StepContainer>
}

    {!state.step1 && state.step2 === "false" && state.step3 === "false" &&
      <PageFooter>
        <Button buttonType="textBlack" onClick={()=>navigate("/")}>Cancel</Button>
        <Button buttonType="primary" onClick={() => createOrder(order)}>Order now</Button>
      </PageFooter>
}

      </PageContainer>


    </Container>

      


  )
}

export default OrderSummary