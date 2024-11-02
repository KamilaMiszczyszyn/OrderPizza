import { useState } from 'react'
import styled from 'styled-components'
import arrowUp from "./../../assets/arrow-up.png"
import arrowDown from "./../../assets/arrow-down.png"
import getMenuItem from '../../utils/getMenuItem'
import scooter from "./../../assets/Scooter.svg"
import { generateDate, generateHour } from '../../utils/convertTime'

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

interface ComponentProps {
    order: Order;
}

const Container = styled.div`
    border-radius: 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
    position: relative;
`
const Date = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: ${props=> props.theme.colors.neutral[50]};
    display: flex;
    column-gap: 16px;
`
const Content= styled.div`
    width: 100%;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ScooterIcon = styled.div`


    div.red-border{
        width: 180px;
        height: 180px;
        border-left: 4px solid ${props=> props.theme.colors.primary[500]};
        border-bottom: 4px solid ${props=> props.theme.colors.primary[500]};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;   
    }

    div.black-border{
        width: 160px;
        height: 160px;
        border-right: 1px solid ${props=> props.theme.colors.neutral[900]};
        border-top: 1px solid ${props=> props.theme.colors.neutral[900]};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

`

const OrderTrucker = styled.div`
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
        grid-template-columns: 110px 40px;



        span{
            grid-area: status;
            justify-self: center;
        }


        div.order_point{
            grid-area: point;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: ${props=> props.theme.colors.neutral[100]};
            justify-self: center; 
        }
        
        div.order_load{
            grid-area: load;
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 7px; 

            div{
                background-color:${props=> props.theme.colors.neutral[100]};
                border-radius: 50%;
                height: 7px;
                width: 7px;
            }
        
        } 
    }

    div.active{

        div.order_point{
            background-color: ${props=> props.theme.colors.primary[500]};
        }
        
        div.order_load{
            div{
                background-color: ${props=> props.theme.colors.primary[500]};
            }
        } 
    }

    div.pending{
        div.order_load{
            div{
                animation: dot ease-in-out 1s infinite;
                background-color: ${props=> props.theme.colors.primary[500]};
            }

            div:nth-of-type(2) {
            animation-delay: 0.2s;
            }

            div:nth-of-type(3) {
            animation-delay: 0.3s;
            }

            @keyframes dot {
                0% { background-color:${props=> props.theme.colors.primary[500]}; transform: scale(1); }
                50% { background-color: ${props=> props.theme.colors.primary}; transform: scale(1.3); }
                100% { background-color:${props=> props.theme.colors.neutral[200]}; transform: scale(1); }
            }
        } 

    }

    div:last-child {
    grid-template-columns: 110px 0; 
    }
    
`

const Details=styled.div<{ $showDetails: boolean }>`
    padding: 24px;
    background-color: ${props=> props.theme.colors.neutral[50]} ;

    display: grid;
    grid-template-columns: auto 200px 150px;
    column-gap: 32px;

    &>div{
        display: flex;
        flex-direction: column;
        row-gap: 24px;

    }

    div.items{
        
        div.content{
            display: flex;
            flex-direction: column;
            row-gap: 8px;
        }

        div.item {
            display: flex;
            justify-content: space-between;
            align-items: center;

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

    div.total-price{
        p{
            text-align: right;
        }
    }
    
    overflow: hidden;
  max-height: ${props => props.$showDetails ? "1000px" : "0"};
  transition: max-height 0.4s ease-in-out;
    

`
    
  
    



const Footer = styled.div`
display: flex;
justify-content: flex-end;
padding: 4px 24px;

    
`

const DetailsButton=styled.button`
    background: none;
    padding: 8px 16px;
    display: flex;
    column-gap: 8px;
    align-items: center;
    color: ${props=> props.theme.colors.neutral[900]};

    img{
        width: 16px;
        height: 16px;
    }
`


const DeliveryTrucker = ({ order }: ComponentProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <Container>
        <Date>
            <p>{generateDate(order.date.toDate())}</p>
            <p>{generateHour(order.date.toDate())}</p>
        </Date>
        <Content>
            <ScooterIcon>
                <div className="red-border">
                    <div className="black-border">
                     <img src={scooter} alt=""/>
                    </div>
                </div>
            </ScooterIcon>
            <OrderTrucker>
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
            </OrderTrucker>
        </Content>
    
        <Details>
            <div className='orderID'>
                <h4>OrderID</h4>
                <p>{order.orderID}</p>

            </div>
            <div className='items'>
                <h4>Items</h4>
                <div className='content'>
                    {order.products.map((product)=>
                    <div key={product.productID} className='item'>
                        <p>{getMenuItem(product.productID)?.name}</p>
                        <div><p>{product.quantity}</p></div>
                    </div>)}

                </div>
                
                
            </div>
            <div className='total-price'>
                <h4>Total price</h4>
                <p>{order.price} {'\u20AC'}</p>
                
            </div>

        </Details>
        <Footer>
            {!showDetails ?
            <DetailsButton onClick={()=> setShowDetails(!showDetails)}>Details<img src={arrowDown} alt=''/></DetailsButton> :
            <DetailsButton onClick={()=> setShowDetails(!showDetails)}>Details<img src={arrowUp} alt=''/></DetailsButton> }          
        </Footer>
    </Container>
  )
}

export default DeliveryTrucker