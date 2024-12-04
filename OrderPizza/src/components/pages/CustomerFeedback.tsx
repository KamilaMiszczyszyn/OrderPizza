import styled from "styled-components"
import bigStarIcon from "./../../assets/star-review-big.svg"
import { collection, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import {PageContainer, SectionContainer, Input, Button, Feedback} from "./../index"
import checkedStar from "./../../assets/star-checked.svg"
import uncheckedStar from "./../../assets/star-unchecked.svg"
import { useState, useEffect } from "react"
import { db } from "../../firebase/firebase"

type Review = {
  firstName: string,
  stars: null | number,
  feedback: string, 
  date: Timestamp;
  id?: string,
}

type FeedbackFormData ={
  firstName: string,
  selectedStars: null | number,
  feedbackText: string,
}

const Container=styled.div`
width: 864px;
margin: 128px 0;

@media (max-width: 864px) {
    width: 100%;
    margin: 16px;   
    }
`

const PageContent=styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 56px;
`
const TotalReviews = styled.section`
  display: flex;
  column-gap: 32px;
  justify-content: center;
  align-items: center;

  @media (max-width: 490px) {
    flex-direction: column;
    row-gap: 32px;
    }

  div.review-average {
    border: 1px solid ${(props) => props.theme.colors.neutral[200]};
    border-radius: 10px;
    row-gap: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    width: 207px;

    div {
      display: flex;
      column-gap: 8px;
    }

    p.rating{
      font-size: 48px;
      font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
      font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    }

    p.reviews{
      color: ${(props) => props.theme.colors.neutral[700]};
      font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 

    }
  }
`;

const RatingBreakdown=styled.div`
display: flex;
flex-direction: column;
row-gap: 8px;
width: 50%;

@media (max-width: 864px) {
    width: 100%;
    }



div.rating{
    display: flex;
    column-gap: 16px;
    border-radius: 50%;
    align-items: center;

    div.stars{
    display: flex;
    column-gap: 8px;
    align-items: center;

    img{
      width: 24px;
      height: 24px;
    }
}
    div.reviews{
      display: flex;
      column-gap: 4px;
    }

}    
`

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  
div.input{
  width: 240px;

  @media (max-width: 490px) {
    width: 100%;
    }


}

div.stars-container{
  display: flex;
  column-gap: 8px; 
}

div.textarea-container {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  row-gap: 8px;

  textarea{
    width: 100%;
    border: 1px solid ${props => props.theme.colors.neutral[200]};
    padding: 16px;
    border-radius: 10px;
    resize: none;
    max-height: 100px;

    &:focus {
    border: 1px solid ${props => props.theme.colors.neutral[900]};
    outline: none; 
  }

    &::placeholder{
      color: ${props => props.theme.colors.neutral[500]};
      font-family: ${props=> props.theme.typography.fontFamily["base"]};
    }
  }

  p{
    text-align: right;
    color: ${props => props.theme.colors.neutral[700]};
    font-size: ${props=> props.theme.typography.fontSize["xs"]};
  }

}
button {
    align-self: flex-end; 
  }
`

const Star = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${uncheckedStar}); 
  cursor: pointer;
  transition: background-image 0.3s ease; 
  

  &.active {
    background-image: url(${checkedStar}); 
  }
`;


const RatingBar=styled.div<{ $width: number; }>`
    background-color: ${props => props.theme.colors.yellow};
    width: ${props => `${props.$width}%`}; 
    height: 4px;
`
const FeedbackContainer= styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`
const ratings = [1,2,3,4,5]

const calculateAverageRating = (reviews: Array<Review>) => {
     if (!reviews || reviews.length === 0) return 0;
    const sumRating :number = reviews.reduce(
    (accumulator, currentValue) => currentValue.stars === null ? accumulator + 0: accumulator+ currentValue.stars,
    0,
    );
    const averageRating: number = sumRating/reviews.length
    return averageRating.toFixed(1)
  }

const countRatingsByValue = (reviews: Array<Review>, value: number) => {
    return reviews.filter(review => review.stars === value).length;
  }


const divWidth = (reviews: Array<Review>, value: number) => {
    const countRating :number = reviews.reduce(
    (accumulator, currentValue) => currentValue.stars === value ? accumulator + 1 : accumulator,
    0)
    const total: number = reviews.length;
    return total > 0 ? (countRating / total) * 100 : 0;

}






const CustomerFeedback = () => {
    const [reviews,setReviews]=useState([]);
    const [stars,setStars] = useState<number | null>(null)
    const [feedbackFormData, setFeedbackFormData]=useState<FeedbackFormData>({firstName: "", selectedStars: null, feedbackText: ""})

  

  


    useEffect(() => {
      const getReviewsData = () => {
          const q = collection(db, "reviews");
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const reviewsArr: Array<Review> = [];
              querySnapshot.forEach((doc) => {
                  reviewsArr.push({...doc.data(), id: doc.id});
              });
              setReviews(reviewsArr);})
          return () => unsubscribe();
      };

      getReviewsData();
}, []);



const handleSubmit= async (event: React.FormEvent<HTMLFormElement>) =>{
  event.preventDefault();

  const {firstName, selectedStars, feedbackText}= feedbackFormData

  const feedbackData: Review  ={
  firstName: firstName,
  stars: selectedStars,
  feedback: feedbackText, 
  date: Timestamp.fromDate(new Date()),
  }
  
  try{
    await addDoc(collection(db, "reviews"), feedbackData);
  }catch(error){
    console.log(error)
    }

setFeedbackFormData({firstName: "", selectedStars: null, feedbackText: ""})


}




  return (
    <Container>
      <PageContainer title="Customer feedback">
      <PageContent>
        <TotalReviews>
            <div className="review-average">
                <div>
                    <img src={bigStarIcon} alt='' />
                    <p className="rating">{calculateAverageRating(reviews)}</p>
                </div>
                <p className="reviews">{reviews.length} reviews</p>
            </div>

            <RatingBreakdown>

        {ratings.slice().reverse().map((e, index)=>
        <div className="rating" key={index}>
            <div className="stars">     
                <img src={checkedStar} alt=''/>  
                <p>{e}</p> 
            </div>
            <RatingBar $width={divWidth(reviews,e)}></RatingBar>
            <div className="reviews">
              <p>{countRatingsByValue(reviews, e)}</p>
              <p>reviews</p>

            </div>
            
        </div>
        
    
    )


         }

        </RatingBreakdown>
        </TotalReviews>

        

       



        <SectionContainer title="Leave feedback">
            <p>Share your feedback with us and help us improve our services. Your feedback will be sent anonymously.</p>
            <FeedbackForm onSubmit={handleSubmit}>

                  <div className="input">
                    <Input
                    label="First name" 
                    id="firstName" 
                    type="text" 
                    name="firstName"
                    placeholder="Enter your first name"
                    value={feedbackFormData.firstName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFeedbackFormData({...feedbackFormData, firstName: event.target.value})}
                    />
                    
                  </div>
                  

                    <div className="stars-container">
                      {ratings.map(e => (
                        <Star
                          key={e}
                          className={
                            (feedbackFormData.selectedStars !== null && e <= feedbackFormData.selectedStars) || 
                            (stars !== null && e <= stars) ? 'active' : ''
                          }
                          onMouseEnter={() => setStars(e)} 
                          onMouseLeave={() => setStars(null)} 
                          onClick={() => {setFeedbackFormData({...feedbackFormData, selectedStars: e}); setStars(null)}} 
                        />
                      ))}
                    </div>


                <div className="textarea-container">
                     <textarea
                        value={feedbackFormData.feedbackText}
                        onChange={(event) => setFeedbackFormData({...feedbackFormData, feedbackText: event.target.value})}
                        maxLength={200}
                        placeholder="Write a feedback..."
                      />
                    <p>Characters left:  {200-feedbackFormData.feedbackText.length}</p> 
                </div>
                  <Button buttonType="secondary" type="submit">Leave Feedback</Button>
                
               

            </FeedbackForm>
           
        </SectionContainer>

        <SectionContainer>
          <FeedbackContainer>
          {reviews.map((review) => <Feedback key={review.id} {...review} />)}
        </FeedbackContainer>


        </SectionContainer>
      </PageContent>

    </PageContainer>

    </Container>
    
  )
}

export default CustomerFeedback