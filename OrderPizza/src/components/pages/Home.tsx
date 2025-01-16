import styled from "styled-components"
import heroImg from "./../../assets/hero-image.png"
import heroImgVertical from "./../../assets/hero-image-vertical.png"
import arrowBg from "./../../assets/arrow-background.png"
import InstructionStep from "../common/InstructionStep"
import {ReviewsSection, Button, QualityIcon} from "./../index"
import aboutUsImg from "./../../assets/aboutus-img.png"
import aboutUsImgMobile from "./../../assets/aboutus-img-mobile.png"
import fbIcon from "./../../assets/socialmedia-fb.png"
import igIcon from "./../../assets/socialmedia-insta.png"
import ttIcon from "./../../assets/socialmedia-tt.png"
import advert from "./../../assets/advert.png"
import advertMobile from "./../../assets/advert-mobile.png"
import { useNavigate } from 'react-router-dom';




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
  height: calc(100vh - 60px); 
  display: flex;
  justify-content: flex-end;

  @media (min-width: 768px) and (orientation: portrait) {
  aspect-ratio: 1440 / 959;
  height: auto;
  }

  @media (max-width: 768px) {
    background-image: url(${heroImgVertical});
    background-size: cover;
    justify-content: center;
    align-items: flex-end;
  }
    


  &>div{
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    width: 50%;

    @media (max-width: 768px) {
    width: 100%;
  }

    div.heading{
    height: 50%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    

    h2{
    font-size: clamp(1rem, 8vw, 12.8rem);
    font-family: "Segoe UI", sans-serif;
    color: ${props=> props.theme.colors.neutral[50]};
    border-bottom: 1px solid ${props=> props.theme.colors.neutral[50]};
    display: inline;

    @media (max-width: 490px) {
      font-size: ${props=> props.theme.typography.fontSize["xxxl"]};
  }
  }
  }
  
  div.subheading{
    color: ${props=> props.theme.colors.neutral[50]};
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 40px;
    height: 50%;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7));
    padding: 40px;

    @media (max-width: 490px) {
    padding: 32px 0;
  }

    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 8px;

      p:nth-child(1){
        font-size: ${props=> props.theme.typography.fontSize["xxl"]};
        @media (max-width: 1040px) {
          font-size: ${props=> props.theme.typography.fontSize["xl"]};
        }
      
      }

      p:nth-child(2){
        font-size: ${props=> props.theme.typography.fontSize["xxl"]};
        @media (max-width: 1040px) {
          font-size: ${props=> props.theme.typography.fontSize["xl"]};
        }
        
      }

    }

    
  }


  }

  

  

  

`

const QualitySection=styled.div`
  width: 100%;
  background-color:${props=> props.theme.colors.neutral[50]};
  display: flex;
  justify-content: space-evenly;
  column-gap: 16px;
  align-items: flex-start;
  padding: 100px 16px;

  @media (min-width: 490px) and (max-width: 864px) {
    padding: 32px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 24px;

  }



  @media (max-width: 490px) {
    padding: 32px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 24px;

  }

    div.quality-item{
    max-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 24px;

     @media (min-width: 490px) and (max-width: 864px) {
      max-width: 75%;
    padding: 32px 0;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    column-gap: 24px;
    

  }

    div{
      display: flex;
      flex-direction: column;
      row-gap: 16px;

      h4{
        text-align: center;

        @media (min-width: 490px) and (max-width: 768px) {
        font-size: ${props=> props.theme.typography.fontSize["lg"]};
        }
      }

      p{
        text-align: center;
      }

    }

      
  }

  
`
const AdvertSection = styled.div`
  img{
    width: 100%;
    height: auto;

    @media (max-width: 490px) {
      display: none;
    }


  }

  img.mobile{
    display: none;

    @media (max-width: 490px) {
      display: initial;
      width: 100%;
      height: auto;
    }

  }
  
`

const InstructionSection = styled.section`
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 100px 0;

   @media (max-width: 490px) {
      padding: 40px 0;
    }


   &>div{
      width: 745px;
      height: 1152px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(${arrowBg});
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      background-size: 100% 100%;

      @media (min-width: 490px) and (max-width: 900px) {
        width: 75%;
    }

     @media (max-width: 490px) {
      background: none;
      width: 100%;
      flex-direction: column;
      row-gap: 32px;
    }
      

   }

`
const AboutUsSection = styled.section`
  width: 100%;
  background-color: ${props=> props.theme.colors.neutral[900]};
  color: ${props=> props.theme.colors.neutral[50]};
  display: flex;


  @media (max-width: 864px) {
      flex-direction: column;
     
    }

  div.description{
    width: 50%;
    padding: 100px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;

    @media (max-width: 864px) {
      padding: 40px;
      width: 100%;
    }

    div{
        display: flex;
        column-gap: 16px;
        justify-content: flex-end;
        
      }

  }

  div.img {
    width: 50%;
    background-image: url(${aboutUsImg});
    background-size: cover;

    @media (max-width: 864px) {
      width: 100%;
      background-image: url(${aboutUsImgMobile});
      aspect-ratio: 720 / 510;
    }
  }
`

const Home = () => {
    const navigate = useNavigate();

  return (
    <Container>
      <HeroSection>
        <div>
          <div className="heading">
            <h2>OrderPizza</h2>
          </div>
          <div className="subheading">
            <div>
              <p>Do you want some pizza?</p>
              <p>Stay home. We deliver to you!</p>
            </div>
            <Button style={{width: "280px"}} buttonType="primaryLarge" onClick={()=>navigate("/menu")}>Order now</Button>
          </div>
        </div>
      </HeroSection>
      <QualitySection>
        
          <div className="quality-item">
          <QualityIcon ingredients/>
          <div>
            <h4>High-quality ingredients</h4>
            <p>We import high-quality Italian ingredients from sauces to cheese, hams and much more.</p>
          </div>
          
        </div>
        <div className="quality-item">
          <QualityIcon recipe variant2/>
          <div>
            <h4>Delicious recipe</h4>
            <p>Our pizza is made from an old recipe created by a famous Italian pizza master.</p>
          </div>
          

        </div>
        <div className="quality-item">
          <QualityIcon delivery/>
          <div>
            <h4>Quick delivery</h4>
            <p>You will always get warm and delicious pizza. Our energetic team provides very fast delivery.</p>
          </div>      
        </div>

        
        
      
      </QualitySection>
      <AdvertSection>
        <img src={advert} alt="advert"/>
        <img className="mobile" src={advertMobile} alt="advert"/>
      </AdvertSection>
      <InstructionSection>
        <div>
            <InstructionStep step1/>
            <InstructionStep step2/>
            <InstructionStep step3/>
            <InstructionStep step4/>
        </div>
      </InstructionSection>

      
      <AboutUsSection>
          <div className="description">
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

       
        
        <div className="img"></div>
      
      </AboutUsSection> 
      <ReviewsSection/>


    </Container>
  )
}

export default Home