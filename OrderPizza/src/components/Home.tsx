import styled from "styled-components"
import Logo from "./../assets/Logo.png"


const Container = styled.div`
  height: 100%;
  background-color: ${props=> props.theme.colors.black};
  display: flex;
  justify-content: center;
  align-items: center;

`

const LogoImg = styled.img`
  height: 80vh;
  width: auto;
`

const Home = () => {
  return (
    <Container>
      <LogoImg src={Logo} alt="Logo"/>
    </Container>
  )
}

export default Home