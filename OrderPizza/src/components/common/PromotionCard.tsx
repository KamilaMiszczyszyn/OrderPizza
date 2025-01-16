import styled from 'styled-components'
import { Timestamp } from 'firebase/firestore'
import { generateDate } from '../../utils/convertTime'

type ComponentProps = {
    startDate: Timestamp,
    endDate: Timestamp,
    type: "B2G1" |  "PROMO20" | "PROMO30" | "PROMO40",
}

const Container = styled.div`
width: 100%;
height: 100%;
 border: 1px solid ${props => props.theme.colors.neutral[200]};
 border-radius: 10px;
 padding: 16px;
 display: flex;
 column-gap: 16px;
 align-items: center;
 justify-content: center;

 div.line{
  width: 1px;
  height: 100%;
  background-color: ${props => props.theme.colors.neutral[200]};

   @media (max-width: 490px) {
    width: 100%;
    height: 1px;

  }

 }
 @media (max-width: 490px) {
    flex-direction: column;
    row-gap: 16px;

  }
    
`

const PromotionOption=styled.div`
color: ${(props) => props.theme.colors.neutral[900]};
  line-height: 1;
  width: 150px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

span.percentage{
    font-size: 6.4rem;
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 

  }

  span.B2G1{
    font-size: 1.9rem;
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 

  }

  span.B2G1-free{
    font-size: 4.8rem;
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
    

  }
    
`

const PromotionDescription=styled.div`
display: flex;
flex-direction: column;
row-gap: 16px;

    span.details{
      font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
    }
    
 
`

const PromotionCard = ({type, startDate, endDate}: ComponentProps) => {
  return (
    <Container>
        <PromotionOption>
            {type === "B2G1" && <><span className="B2G1">BUY 2 GET 1</span><span className="B2G1-free">FREE</span></>}
            {type === "PROMO20" && <span className="percentage">20%</span>}
            {type === "PROMO30" && <span className="percentage">30%</span>}
            {type === "PROMO40" && <span className="percentage">40%</span>}
        </PromotionOption>
        <div className='line'></div>
        <PromotionDescription>
         
          <p>{type === "B2G1" ? <span className='details'>Buy 3 pizzas and the cheapest one you get for free. </span> : <span className='details'>Discount on total value. </span>}
        <span className='details'>{`Use discount code "${type === "B2G1" ? "B2G1" : `${type}`}" in the cart.`}</span></p>
        <div>
          <p>The promotion is valid</p>
         <p>{`from ${generateDate(startDate.toDate())} to ${generateDate(endDate.toDate())}.`}</p>

        </div>
         

        </PromotionDescription>
        
    </Container>
  )
}

export default PromotionCard






