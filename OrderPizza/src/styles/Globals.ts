import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html{
    font-size: 62.5%; 
}

body{
    font-size: ${props=> props.theme.typography.fontSize["sm"]};
    font-family: ${props=> props.theme.typography.fontFamily["base"]};
    font-weight: ${props=> props.theme.typography.fontWeight["regular"]}; 
    background-color: ${props=> props.theme.colors.white};
    line-height: 1.5;
    letter-spacing: 2%;
    color: ${props=> props.theme.colors.neutral[900]};
    
}


h2{
    font-size: ${props=> props.theme.typography.fontSize["xxxl"]};
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 

     @media (max-width: 490px) {
        font-size: ${props=> props.theme.typography.fontSize["xxl"]};
        }
}

h3{
    font-size: ${props=> props.theme.typography.fontSize["xxl"]};
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 

    @media (max-width: 490px) {
        font-size: ${props=> props.theme.typography.fontSize["xl"]};
        }
}

h4{
    font-size: ${props=> props.theme.typography.fontSize["xl"]};
    font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 

    @media (max-width: 490px) {
        font-size: ${props=> props.theme.typography.fontSize["lg"]};
        }
}

button{
    cursor: pointer;
    border: none;
    font-size: ${props=> props.theme.typography.fontSize["sm"]};
    font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
}

a{
    color: ${props=> props.theme.colors.neutral[900]};
}

input[type="radio"] {
    width: 20px;   
    height: 20px;
    accent-color: ${props=> props.theme.colors.neutral[900]};  
    margin: 5px;
    cursor: pointer;
}
`



export default GlobalStyle