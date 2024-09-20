import { createGlobalStyle } from "styled-components";
import close from "./../assets/close.png"

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html{
    font-size: 62.5%; 
}

body{
    font-size: 1.6rem; 
    background-color: ${props=> props.theme.colors.white};
    font-family: "Inter", sans-serif;
}

label{
    display: block;
    margin: 20px 0 0 0;
}

input{
    width: 100%;
    padding: 10px;
    border: 1px solid ${props=> props.theme.colors.black};
    border-radius: 10px;
    margin: 5px 0;
}

input:focus{
    outline: none;
    border: 1px solid ${props=> props.theme.colors.primary};
}

button{
    border-radius: 10px;
    padding: 10px 30px;
    border: none;
    background-color: ${props=> props.theme.colors.black};
    color: ${props=> props.theme.colors.white};
    cursor: pointer;
    font-weight: 700;
    font-size: 1.6rem;
}

button:hover{
    opacity: 0.8;
}

button.close{
    background-image: url(${close});
    background-size: cover;
    background-color: transparent;
    width: 20px;
    height: 20px;
    padding: 0;
    position: absolute;
    top: 10px;
    right: 10px;
}
`

export default GlobalStyle