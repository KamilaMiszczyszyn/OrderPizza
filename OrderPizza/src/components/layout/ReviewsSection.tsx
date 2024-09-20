
import styled from 'styled-components'
import {ReviewMain, Button} from "./../index"
import {useEffect, useState} from "react";
import {collection, getDocs } from 'firebase/firestore';
import {db} from "./../../firebase/firebase"

interface Review {
  user: string,
  stars: number,
  review: string,
}


const Container = styled.section`
height: 696px;
display: flex;
flex-direction: column;
row-gap: 56px;
`

const H2 = styled.h2`
    font-size: 4.8rem;
`



const ReviewsSection = () => {
   const [reviews, setReviews] = useState<Review[] | null>(null)

    useEffect(() => {
    const getReviews= async()=>{
      try{
        const collectionRef = collection(db, 'reviews');
        const snapshot = await getDocs(collectionRef);

        const reviewsData = snapshot.docs.map(doc => ({
          id: doc.id,
        ...doc.data() 
        }));

        setReviews(reviewsData)

        } catch (error) {
      console.log(error)
      }  
    }

    getReviews()

  }, [])


  return (
    <Container>
        <H2>Recent customer feedback</H2>
        {reviews != null && reviews.map((review) => 
        <ReviewMain key={review.id} user={review.user} stars={review.stars} review={review.review}/>)
        }
        <Button type="secondary">See all feedback</Button>

       
        


    </Container>
  )
}

export default ReviewsSection