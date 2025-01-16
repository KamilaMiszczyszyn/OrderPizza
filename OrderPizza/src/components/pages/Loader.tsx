import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
    

const Logo = styled.h1`
    font-size: 4.8rem;
    font-weight: ${props => props.theme.typography.fontWeight["bold"]};
    font-family: 'Segoe UI', sans-serif;

    @media (max-width: 490px) {
        font-size: 2.4rem;
    }
`;

const LoadingText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: ${props => props.theme.typography.fontFamily["base"]};
    font-weight: ${props => props.theme.typography.fontWeight["medium"]}; 
    font-size: ${props => props.theme.typography.fontSize["md"]};
    display: flex;
    gap: 0.5rem;

     @media (max-width: 490px) {
        font-size: ${props => props.theme.typography.fontSize["sm"]};
    }

    span {
        animation-name: dot;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        opacity: 0;
        font-size: ${props => props.theme.typography.fontSize["md"]};

        @media (max-width: 490px) {
        font-size: ${props => props.theme.typography.fontSize["sm"]};
    }
    }
    span:nth-child(1) {
        animation-delay: 0s;

    }
    span:nth-child(2) {
        animation-delay: 0.5s;
 
    }
    span:nth-child(3) {
        animation-delay: 1s;
        
    }
    @keyframes dot {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
`;


const Loader = () => {
  return (
    <Container>
        <div>
            <Logo>OrderPizza</Logo>
            <LoadingText>Loading <span>.</span><span>.</span><span>.</span></LoadingText>
        </div>
    </Container>
  );
};

export default Loader;
