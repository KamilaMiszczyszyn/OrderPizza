import { useFormik } from 'formik'
import {useNavigate, Link} from "react-router-dom";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from '@firebase/auth'
import {auth} from "./../../firebase/firebase"
import styled from 'styled-components';
import {Input, Button} from "./../index"
import pizzaImg from "./../../assets/login-pizza.png"

const Container=styled.div`
display: flex;
column-gap: 24px;
max-width: 979px;
width: 100%;
margin: 16px;
justify-content: center;


div.pizza-img{
  background-image: url(${pizzaImg});
  width: 100%; 
  background-size: cover;
  background-position: center;
  flex-shrink: 1; 
  border-radius: 10px;

  @media (max-width: 768px) {
      display: none;
    }

}

`

const ContainerForm = styled.div`
    min-width: 390px;
    border-radius: 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
    padding: 48px;
    display: flex;
    flex-direction: column;
    row-gap: 40px;

    @media (max-width: 490px) {
      min-width: 300px;
      width: 100%;
    }

    form{
      display: flex;
      flex-direction: column;
      row-gap: 24px;

      div{
        width: 100%;
      }
    }

    div.line{
      display: flex;
      column-gap: 8px;
      align-items: center;
      div{
        height: 1px;
        background-color: ${props=> props.theme.colors.neutral[900]};
        width: 100%;
      }

    }

    div.create-account{
      display: flex;
      flex-direction: column;
      row-gap: 24px;
    }

  
`
const H2 = styled.h2`
  font-size: ${props=> props.theme.typography.fontSize["xl"]};
  font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
  font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
  text-align: center;
`

const Login = () => {
  const navigate=useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object(
      {
        email: Yup.string().email("Invalid Email").required("Required"),
        password: Yup.string().required("Required")
    }),

    onSubmit: async (values) => {
        const email = values.email
        const password = values.password

         try{
          await signInWithEmailAndPassword(auth, email, password)
          toast.success("Login successful"); 
        }catch(error){
          toast.error("Login failed");
        }
        navigate("/")
    } 
    }
  )

  return (
    <Container>
      <ContainerForm>
      <H2>Login</H2>

      <form onSubmit={formik.handleSubmit}>

      <Input label="E-mail" id="email" type="text" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} touched={formik.touched.email}/>

      <Input label="Password "id="password" type="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} touched={formik.touched.password}/>
      
      <Button style={{width:"100%"}} buttonType="secondary" type="submit">Log in</Button>        
    </form>

    <div className='line'>
      <div></div>
      <span>or</span>
      <div></div>
    </div>

    <div className='create-account'>
      <H2>Don't have an account?</H2>
      <Button buttonType="secondary" onClick={()=> navigate("/register")}>Create account</Button>
    </div>

    </ContainerForm>
    <div className='pizza-img'></div>

    </Container>
    
    
  )
}

export default Login