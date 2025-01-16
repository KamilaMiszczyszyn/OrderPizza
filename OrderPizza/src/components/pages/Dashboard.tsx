import styled from "styled-components"
import { useState, useEffect } from "react";
import { collection, onSnapshot, where, query, orderBy, limit, deleteDoc, doc} from "firebase/firestore";
import { db } from "./../../firebase/firebase";
import { Timestamp } from "firebase/firestore";
import { OrderStatusIcon, Feedback, PromotionModal, Button } from "./../index"
import iconAdd from "./../../assets/add-white.svg"
import { generateDate } from "../../utils/convertTime";
import optionsIcon from "./../../assets/options.svg"
import { useNavigate } from "react-router-dom";

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

type OrderStatus =  "ordered" | "preparation" | "delivery" | "completed"

type Review = {
  firstName: string,
  stars: null | number,
  feedback: string, 
  date: Timestamp;
  id?: string,
}

type Promotion = {

    createdAt: Timestamp,
    startDate: Timestamp,
    endDate: Timestamp,
    type: string , 
    id: string,
  
}


const Container = styled.div`
  width: 872px;
  display: grid;
  column-gap: 32px;
  row-gap: 32px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "date salesSummary"
    "ordersSummary ordersSummary"
    "feedback promotions";
`;

const DateSection = styled.section`
  grid-area: date;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
  grid-template-areas: 
  "date month"
  "day day";

  span.date{
    grid-area: date;
    font-size: 4.8rem;
    color: ${props=> props.theme.colors.neutral[900]};
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
  }

  span.month{
    grid-area: month;
    font-size: 4.8rem;
    color: ${props=> props.theme.colors.neutral[700]};
    align-self: center;
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};

  }

  span.day{
    grid-area: day;
    color: ${props=> props.theme.colors.neutral[700]};

  }



`;

const SalesSummarySection = styled.section`
  grid-area: salesSummary;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  

  div.income{
    background-color: ${props=> props.theme.colors.neutral[50]};
    border-radius: 10px;
    padding: 16px 24px;

  }

  div.orders{
    background-color: ${props=> props.theme.colors.neutral[50]}; 
    border-radius: 10px;
    padding: 16px 24px;


  }

  p{
    font-size: ${props=> props.theme.typography.fontSize["xl"]};
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
    text-align: end;
  }

`;

const OrdersSummarySection = styled.section`
  grid-area: ordersSummary;

  div.container{
    display: grid;
    column-gap: 24px;
    grid-template-columns: repeat(4, 1fr);

  }
  



`;

const FeedbackSection = styled.section`
  grid-area: feedback;

  div.container{
    height: 270px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    overflow-y: scroll;

    button{
      color: ${props => props.theme.colors.primary[500]};
      background-color: transparent;
      align-self: flex-end;

      &:hover{
        color: ${props => props.theme.colors.primary[700]};
      }
    }
  }
    

    div.container::-webkit-scrollbar {
        width: 6px; 
    }

    div.container::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.neutral[50]}; 
        border-radius: 10px; 
    }

    div.container::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.neutral[200]};
        border-radius: 10px; 
    }

    div.container::-webkit-scrollbar-thumb:hover {
        background-color: ${props => props.theme.colors.neutral[700]}; 
    }
  
`;

const PromotionsSection = styled.section`
  grid-area: promotions;

  div.promotions-container{
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    

  }

  div.footer{
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  
  }
 
`;

const Promotion=styled.div`
height: 74px;

display: flex;
column-gap: 8px;
align-items: flex-start;
position: relative;

span.number{
  font-size: ${props=> props.theme.typography.fontSize["xl"]};
  font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
  font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
  color: ${props => props.theme.colors.primary[500]}; 
}

div.content{
  height: 100%;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  display: flex;
  align-items: center;
  column-gap: 16px;
  padding: 16px;

}


div.promotion-type{
  display: flex;
  flex-direction: column;
  line-height: 1;
  font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
  font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 

  span.B2G1{
    font-size: 1.4rem;

  }
  span.B2G1-free{
    font-size: 3.4rem;

  }

  span.percentage{
    font-size: 4.2rem;
  }
} 

div.period{
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  h3{
  font-size: ${props=> props.theme.typography.fontSize["xs"]};
  font-weight: ${props=> props.theme.typography.fontWeight["regular"]}; 
  color: ${props => props.theme.colors.neutral[700]}; 
}

p{
  font-size: ${props=> props.theme.typography.fontSize["sm"]};
  font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 


}

}

`

const H2 = styled.h2`
  font-size: ${props=> props.theme.typography.fontSize["xl"]};
  padding-bottom: 16px;

  /* @media (max-width: 490px) {
        font-size: ${props=> props.theme.typography.fontSize["xl"]};
        } */
`;

    
const H3=styled.h3`
font-size: ${props=> props.theme.typography.fontSize["xs"]};
color: ${props=> props.theme.colors.neutral[700]}; 
font-weight: ${props=> props.theme.typography.fontWeight["regular"]}; 

`

const OrderStatus = styled.div`
border-radius: 10px;
border: 1px solid ${(props) => props.theme.colors.neutral[200]};
padding: 16px;
display: flex;
column-gap: 16px;
align-items: center;

p{
    font-size: ${props=> props.theme.typography.fontSize["xl"]};
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
    text-align: end;

}

`

const Options=styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

    div.container{
    position: realative;
  }`


const OptionsButton = styled.button`
background-color: transparent;
`

const Dropdown=styled.div`
  width: 80px;
  border-radius:  10px;
  border: 1px solid ${props=> props.theme.colors.neutral[200]};
  position: absolute;
  right: 0;
  top: 24px;
  background-color: ${props=> props.theme.colors.white};
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  z-index: 1;
  box-shadow: ${props=> props.theme.shadow};

`
const DropdownItem = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  text-align: left;
  border-radius:  10px;

  &:hover{
    background-color: ${props=> props.theme.colors.neutral[50]};
  }


`


//Date

enum Weekdays {
  Sunday,    
  Monday,    
  Tuesday,   
  Wednesday,
  Thursday, 
  Friday,   
  Saturday   
}

enum Months {
  January = 0,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}


const getDate = (): { date: number, month: string, day: string } => {
    const time: Date = new Date()
    const date: number = time.getDate()
    const month: number = time.getMonth()
    const day: number = time.getDay()
    
    return {date, month: Months[month], day: Weekdays[day]}
    
}


const getIncome = (orders: Array<Order> | null): number => {
  if (orders) {
    const income: number = orders.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    return income;
  } else {
    return 0;
  }
};



const getTotalOrders = (orders: Array<Order> | null, orderStatus?: OrderStatus): number =>{

    if (orders){
        if(orderStatus){
        const filteredArr: Array<Order> = orders.filter((order) => order.status === orderStatus);
        return filteredArr.length
    }
    
    return orders.length

    }else{
        return 0
    }
}




const Dashboard = () => {
    const [orders, setOrders] = useState<Array<Order> | null>(null)
    const [reviews,setReviews]=useState<Array<Review> | null>(null);
     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [promotions, setPromotions] = useState<Array<Promotion> | null>(null);
    const [optionsDropdown, setOptionsDropdown] = useState<string | null>(null);
    const navigate = useNavigate()
    
    useEffect(() => {
        const getOrders= () =>{
            try{
                const today: Date = new Date();
            
                const startOfDay: Date = new Date(today); 
                startOfDay.setHours(0, 0, 0, 0);   

                const endOfDay: Date = new Date(today);  
                endOfDay.setHours(23, 59, 59, 999);

                const startOfDayTimestamp: Timestamp = Timestamp.fromDate(startOfDay);
                const endOfDayTimestamp: Timestamp = Timestamp.fromDate(endOfDay);

            
                const collectionRef = collection(db, 'orders');
                const q = query(collectionRef, where("date", ">=", startOfDayTimestamp), where("date", "<=", endOfDayTimestamp))
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
                    phone: doc.data().phone,
                    }))
                    setOrders(orders);
                    })
        
                    
                    return () => unsubscribe;
        
        
                    }catch (error) {
                    console.log(error)
                    }
      }
    
        getOrders()
    
      }, [])

       useEffect(() => {
            const getReviews = () => {
                const q = query(
                            collection(db, "reviews"),
                            orderBy("date", "asc"), 
                            limit(5) 
                        );
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const reviewsArr: Array<Review> = [];
                    querySnapshot.forEach((doc) => {
                        reviewsArr.push({...doc.data(), id: doc.id} as Review);
                    });
                    setReviews(reviewsArr);}
                )
                return () => unsubscribe();
            };
      
            getReviews();
      }, []);

       useEffect(() => {
    const q = query(
      collection(db, "promotions"),
      orderBy("createdAt", "asc")
    );

    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const promotions: Array<Promotion> = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          createdAt: data.createdAt,  
          startDate: data.startDate,  
          endDate: data.endDate,      
          type: data.type, 
          id: doc.id,                  
        };
      });

      setPromotions(promotions);  
    });

   
    return () => unsubscribe();
  }, []);




      const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const deletePromotion = async (promotionId: string) => {
  try {
    const promotionRef = doc(db, "promotions", promotionId);
    await deleteDoc(promotionRef);
  } catch (error) {
    console.error( error);
  }
};

  return (
    <>
    <PromotionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <Container>
        <DateSection>
            <span className="date">{getDate().date}</span>
            <span className="month">{getDate().month}</span>
            <span className="day">{getDate().day}</span>

        </DateSection>
        <SalesSummarySection>
            <div className="income">
                <H3>Today&apos;s income</H3>
                <p>{getIncome(orders)} {'\u20AC'}</p>
                
            </div>
            <div className="orders">
                <H3>Today&apos;s orders</H3>
                <p>{getTotalOrders(orders)}</p>
            </div>

        </SalesSummarySection>
        <OrdersSummarySection>
            <H2>Today&apos;s orders summary</H2>
            <div className="container">
                <OrderStatus>
                <OrderStatusIcon ordered/>
                <div>
                    <H3>Ordered</H3>
                    <p>{getTotalOrders(orders, "ordered")}</p>
                </div>         
            </OrderStatus>
             <OrderStatus>
                <OrderStatusIcon preparation/>
                <div>
                    <H3>Preparation</H3>
                    <p>{getTotalOrders(orders, "preparation")}</p>
                </div>
                
            </OrderStatus>
             <OrderStatus>
                <OrderStatusIcon delivery/>
                <div>
                    <H3>Delivery</H3>
                    <p>{getTotalOrders(orders, "delivery")}</p>
                </div>
                
            </OrderStatus>
             <OrderStatus>
                <OrderStatusIcon completed/>
                <div>
                    <H3>Completed</H3>
                    <p>{getTotalOrders(orders, "completed")}</p>
                </div>
                
            </OrderStatus>

            </div>
            


        </OrdersSummarySection>
        <FeedbackSection>
            <H2 >Customer feedback</H2>
            <div className="container">
               {reviews?.map((review) => <Feedback key={review.id} {...review} />)}
               <button onClick={()=> navigate("/customer-feedback")}>more</button>
            </div>

        </FeedbackSection>
        <PromotionsSection>
            <H2>Promotions</H2>
            <div className="promotions-container">
              {promotions?.map((promotion, index) => (
                  <Promotion key={promotion.id}>
                    <Options>
                      <div className="container">
                        <OptionsButton onClick={()=>setOptionsDropdown(optionsDropdown ? null : promotion.id )}><img src={optionsIcon} alt=''/></OptionsButton>
                      {optionsDropdown === promotion.id && (
                            <Dropdown>
                              <DropdownItem onClick={() => deletePromotion(promotion.id)}>Delete</DropdownItem>
                            </Dropdown>
                          )}

                      </div>
                      
                    </Options>
                    <span className="number">{`0${index + 1}`}</span>
                    <div className="content">
                      <div className="promotion-type">
                        {promotion.type === "B2G1" ? (
                          <>
                            <span className="B2G1">BUY 2 GET 1</span>
                            <span className="B2G1-free">FREE</span>
                          </>
                        ) : (
                          <span className="percentage">{`${promotion.type.slice(5)}%`}</span>
                        )}
                      </div>
                      <div className="period">
                        <h3>Period</h3>
                      <p>{`${generateDate(promotion.startDate.toDate())} to ${generateDate(promotion.endDate?.toDate())}`}</p>

                      </div>
                      
                    </div>
                    
                  </Promotion>
                ))}

            </div>
            <div className="footer">
              {promotions && promotions.length <3 && <Button buttonType="secondary" iconLeft={iconAdd} onClick={()=>setIsModalOpen(!isModalOpen)}>Add promotion</Button>}
            </div>
            
            

        </PromotionsSection>

    </Container>
      </>
    
  )
}

export default Dashboard
