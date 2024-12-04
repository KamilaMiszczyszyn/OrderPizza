import { useFormik } from 'formik'
import * as Yup from 'yup';
import {useNavigate, Link} from "react-router-dom";
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {auth, db} from "./../../firebase/firebase"
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {Input, Button} from "./../index"

 const Container = styled.div`
    width: 390px;
    border-radius: 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
    padding: 48px;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    margin: 16px;

    form{
      display: flex;
      flex-direction: column;
      row-gap: 32px;

      div{
        width: 100%;
      }
    }


    div.footer{
      display: flex;
      justify-content: flex-end;

    }
`

const H2 = styled.h2`
  font-size: ${props=> props.theme.typography.fontSize["xl"]};
  font-family: ${props=> props.theme.typography.fontFamily["alternate"]};
  font-weight: ${props=> props.theme.typography.fontWeight["bold"]}; 
  text-align: center;
`

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object(
      {
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid Email").required("Required"),
        password: Yup.string().required("Required")
        .min(8, "Password must have at least 8 characters")
        .matches(/[0-9]/, `Your password must have at least one number`)
        .matches(/[a-z]/, `Your password must have at least lowercase letter`)
        .matches(/[A-Z]/, `Your password must have at least uppercase letter`),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords does not match")
    }),

    onSubmit: async (values) => {
        const email = values.email
        const password = values.password
        const firstName = values.firstName
        const lastName = values.lastName
        
            try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user={
              firstName,
              lastName,
              email,          
            }

            await setDoc(doc(db,'users', userCredential.user?.uid), user);
            signOut(auth);
            navigate("/");
            toast.success("Registration successful"); 
            }catch(error){
            toast.error("Registration failed");
            console.log(error)
             }
        }
    }
  )

  return (
    <Container>
      <H2>Create account</H2>
      <form onSubmit={formik.handleSubmit}>
        <Input label="First name" id="firstName" type="text" name="firstName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstName} error={formik.errors.firstName} touched={formik.touched.firstName}/>
        
        <Input label="Last name" id="lastName" type="text" name="lastName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastName} error={formik.errors.lastName} touched={formik.touched.lastName}/>

        <Input label="E-mail" id="email" type="text" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} touched={formik.touched.email}/>
        
        <Input label="Password" id="password" type="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} touched={formik.touched.password}/>
      
        <Input label="Confirm password" id="confirmPassword" type="password" name="confirmPassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword} error={formik.errors.confirmPassword} touched={formik.touched.confirmPassword}/>
      
        <div className='footer'>
          <Button buttonType='textBlack' to="/login">Cancel</Button>
          <Button buttonType="secondary" type="submit">Create account</Button>   

        </div>
             
      </form>


    </Container>
  )
}

export default Register