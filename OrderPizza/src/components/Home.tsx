import styled from "styled-components"
import heroImg from "./../assets/hero-image.png"
import QualityInformationIcon from "./common/QualityInformationIcon"
import pizzaImg from "./../assets/pizza-slices.png"
import arrowSteps from "./../assets/steps-arrow.svg"
import InstructionStep from "./common/InstructionStep"
import {ReviewsSection} from "./index"
import aboutUsImg from "./../assets/aboutus-img.png"

import fbIcon from "./../assets/socialmedia-fb.png"
import igIcon from "./../assets/socialmedia-insta.png"
import ttIcon from "./../assets/socialmedia-tt.png"




const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props=> props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`

const HeroSection = styled.div`
  background-image: url(${heroImg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: calc(100vh - 51px);

  div{
    width: 862px;
    height: 485px;
    background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
  }
`

const HeroHeader = styled.h1`
  font-size: 128px;
  font-family: "Segoe UI", sans-serif;
  color: ${props=> props.theme.colors.white};
  border-bottom: 1px solid ${props=> props.theme.colors.white};
  display: inline;
`
const QualitySection=styled.div`
  height: 520px;
  width: 100%;
  background-color:${props=> props.theme.colors.neutral[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 100px;
 
  > div{
    width: 300px;
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

      h2{
        margin: 24px 0 16px;
      }

      p{
        text-align: center;
      }
  }

  h2{

  }

`
const ImageSection = styled.div`
  background-image: url(${pizzaImg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 467px;
  
`

const InstructionSection = styled.section`
   height: 1138px;
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;

   > div{
      width: 962px;
      height: 938px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(${arrowSteps});
      background-repeat: no-repeat;
      background-position: center;
      position: relative;

   }

`
const AboutUsSection = styled.section`
  background-color: ${props=> props.theme.colors.neutral[900]};
  height: 510px;
  width: 100%;
  color: ${props=> props.theme.colors.neutral[50]};
  display: flex;
  justify-content: space-between;

  >div{
    
    width: 520px;

    h2{
    font-size: 40px;

  }

  }

  

  img {
    width: auto;
    height: 100%;
  }
`

const Home = () => {
  return (
    <Container>
      <HeroSection>
        <HeroHeader>OrderPizza</HeroHeader>
      </HeroSection>
      <QualitySection>
        <div>
          <QualityInformationIcon ingredients={true}/>
          <h2>High-quality ingredients</h2>

          <p>We import high-quality Italian ingredients from sauces to cheese, hams and much more.</p>
        </div>
        <div>
          <QualityInformationIcon recipe={true} variant2={true}/>
          <h2>Delicious recipe</h2>
          <p>Our pizza is made from an old recipe created by a famous Italian pizza master.</p>

        </div>
        <div>
          <QualityInformationIcon delivery={true}/>
          <h2>Quick delivery</h2>
          <p>You will always get warm and delicious pizza. Our energetic team provides very fast delivery.</p>
        </div>
        
        
        
        
        
      </QualitySection>
      <ImageSection/>
      <InstructionSection>
        <div>
            <InstructionStep step1={true}/>
            <InstructionStep step2={true}/>
            <InstructionStep step3={true}/>
            <InstructionStep step4={true}/>
        </div>
      </InstructionSection>

      
      <AboutUsSection>
        <div>
          <div>
            <h2>About Us</h2>
            <p>
              We are a small restaurant in the center of Warsaw focused on perfecting the art of pizza. Our pizza is made from an old recipe created by a famous Italian pizza master. We continuously improve our recipe to provide you with high-quality products. We use only the best ingredients, imported from Italy and produced by local farmers. We can ensure that you will always get warm and delicious pizza. Our energetic team provides very fast delivery.
            </p>
            <div>
              <a href="https://www.facebook.com"><img src={fbIcon} alt=''/></a>
              <a href="https://www.instagram.com"><img src={igIcon} alt=''/></a>
              <a href="https://www.tiktok.com"><img src={ttIcon} alt=''/></a>
            </div>
          </div>

        </div>
        
        <img src={aboutUsImg} alt='Cooking man'/>
        


      </AboutUsSection>
      <ReviewsSection/>


    </Container>
  )
}

export default Home