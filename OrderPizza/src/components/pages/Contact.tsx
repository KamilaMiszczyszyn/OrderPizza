
import styled from 'styled-components'
import {PageContainer, SectionContainer} from "./../index"

import pinIcon from "./../../assets/pin-black.svg"
import mailIcon from "./../../assets/mail-black.svg"
import phoneIcon from "./../../assets/phone-black.svg"

const Container=styled.div`
width: 864px;
margin: 128px 0;

@media (max-width: 864px) {
    width: 100%;
    margin: 16px;   
    }
`

const PageContent= styled.div`
    display: flex;
    justify-content: center;
    column-gap: 56px;

    @media (max-width: 864px) {
        flex-direction: column;
     
    }

    iframe{
        width: 470px;
        height: 470px;

        @media (max-width: 864px) {
        width: 100%;
     
    }

    }


    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    align-items: flex-start;

    @media (min-width: 490px) and (max-width: 864px) {
       flex-direction: row;
       justify-content: space-around;
     
    }

    @media (max-width: 490px) {
       flex-direction: column;
     
    }
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

const OpeningHoursContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    div{
        display: flex;
        justify-content: space-between;
        

        p{
            display: inline;
        }
}
`



const Contact = () => {
  return (
    <Container>
        <PageContainer title="Contact">
        <PageContent>
            <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d687.3191803908343!2d20.996035153707027!3d52.22837082265181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecdeded6c4ed9%3A0xe3ffbccce39b01f2!2sMural%20%22Rozp%C4%99dzona%20Warszawa%22%20na%20%C5%9Bcianie%20siedziby%20ZDM!5e1!3m2!1spl!2spl!4v1726847047240!5m2!1spl!2spl"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                />

        </div>
        <ContentContainer>
            <SectionContainer title="Contact Us">
                <ContactContainer>
                    <div><img src={pinIcon} alt=''/><div><p>ul. Chmielna 124</p><p>00-001 Warszawa</p></div></div>
                    <div><img src={mailIcon} alt=''/><p>order_pizza@gmail.com</p></div>
                    <div><img src={phoneIcon} alt=''/><p>+48 500 600 700</p></div> 
                </ContactContainer>     
                   
                
            </SectionContainer>

             <SectionContainer title="Opening hours">  
                <OpeningHoursContainer>
                    <div><p>Monday - Friday</p><p>10:00 - 22:00</p></div>
                    <div><p>Saturday - Sunday</p><p>10:00 - 00:00</p></div>
                </OpeningHoursContainer>        
    
            </SectionContainer>
        </ContentContainer>

        </PageContent>    
    </PageContainer>
    </Container>
    
  )
}

export default Contact