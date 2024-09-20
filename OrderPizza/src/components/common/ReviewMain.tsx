import styled from 'styled-components'
import starChecked from './../../assets/star-checked.svg'
import starUnchecked from './../../assets/star-unchecked.svg'

interface ComponentProps {
  user: string,
  stars: number,
  review: string,
}

const Container = styled.div`
height: 270px;
width: 320px;
position: relative;
display: flex;
flex-direction: column;
row-gap: 8px;
`

const ReviewContainer = styled.div`
border-radius: 10px;
padding: 24px;
border: 1px solid ${props => props.theme.colors.neutral[200]};
height: 243px;
display: flex;
flex-direction: column;
row-gap: 10px;
`

const Decor= styled.span`
color: ${props => props.theme.colors.primary[500]};
font-size: 96px;
font-family: 'Times New Roman', Times, serif;
position: absolute;
left: 24px;
top: -55px;
`
const StarsContainer = styled.div`
  display: flex;
`

const generateStars = (stars: number) => {

  const arrayCheckedStars: boolean[] = [];
  for (let i = 1; i <= stars; i++) {
    arrayCheckedStars.push(true); 
  }

  const arrayUncheckedStars: boolean[] = [];
  for (let i = 5-stars; i <= 5; i++) {
    arrayUncheckedStars.push(false)
  }

  return arrayCheckedStars.concat(arrayUncheckedStars)
}


function ReviewMain({user, stars, review}: ComponentProps) {
  return (
    <Container>
        <Decor>"</Decor>
        <ReviewContainer>
          
          <StarsContainer>
            {generateStars(stars).map((star, index) =>
            {
              if(star){
              return <img key={index} src={starChecked} alt=''/>
            }else{
              <img key={index} src={starUnchecked} alt=''/>
            }
            } 
            )}
          </StarsContainer>
          <p>{review}</p>
        </ReviewContainer>
        <p>{user}</p>
    </Container>

  )
}

export default ReviewMain