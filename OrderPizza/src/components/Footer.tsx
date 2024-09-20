import styled from "styled-components"
import pinIcon from "./../assets/pin-white.svg"
import mailIcon from "./../assets/mail-white.svg"
import phoneIcon from "./../assets/phone-white.svg"

import fbIcon from "./../assets/socialmedia-fb.png"
import igIcon from "./../assets/socialmedia-insta.png"
import ttIcon from "./../assets/socialmedia-tt.png"


const Container = styled.footer`
  background-color: ${props=> props.theme.colors.neutral[900]};
  height: 364px;
  color: ${props=> props.theme.colors.neutral[50]};
  display: flex;
  justify-content: center;
  align-items: center;


  >div{
    display: flex;
    column-gap: 48px;
    

  }


`

const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`

const Logo = styled.h2`
  font-size: 2.4rem;
`

const ContactContainer= styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  >div{
    display: flex;
    align-items: flex-start;
    column-gap: 16px;
  }

`
const H3 = styled.h3`
  font-size: 2.0rem;
`

const NavSection = styled.section`
  
`

const SocialMediaSection=styled.section`
  display:flex;
  flex-direction: column;
  row-gap: 16px;

  div{
    display:flex;
    column-gap: 16px;
  }

  
`


const Footer = () => {
  return (
    <Container>
      <div>
        <ContactSection>
          <Logo>OrderPizza</Logo>
          <ContactContainer>
            <div><img src={pinIcon} alt=''/><div><p>ul. Chmielna 124</p><p>00-001 Warszawa</p></div></div>
            <div><img src={mailIcon} alt=''/><p>order_pizza@gmail.com</p></div>
            <div><img src={phoneIcon} alt=''/><p>+48 500 600 700</p></div>
          </ContactContainer>
        </ContactSection>
        <NavSection></NavSection>
        <SocialMediaSection>
          <H3>Follow Us</H3>
          <div>
            <a href="https://www.facebook.com"><img src={fbIcon} alt=''/></a>
            <a href="https://www.instagram.com"><img src={igIcon} alt=''/></a>
            <a href="https://www.tiktok.com"><img src={ttIcon} alt=''/></a>

          </div>
        </SocialMediaSection>

      </div>
      
    </Container>

  )
}

export default Footer