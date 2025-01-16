import { useFormik } from 'formik'
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, signOut, UserCredential} from 'firebase/auth'
import {setDoc, doc, Timestamp} from 'firebase/firestore'
import {auth, db} from "./../../firebase/firebase"
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {Input, Button} from "./../index"

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Timestamp;
  role: string;
}

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
      column-gap: 16px;

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

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },

    validationSchema: Yup.object<FormValues>(
      {
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid Email").required("Required"),
        phone: Yup.string().matches(/^[0-9]{9}$/, "Phone number must be exactly 9 digits").required("Required"),
        password: Yup.string().required("Required")
        .min(8, "Password must have at least 8 characters")
        .matches(/[0-9]/, `Your password must have at least one number`)
        .matches(/[a-z]/, `Your password must have at least lowercase letter`)
        .matches(/[A-Z]/, `Your password must have at least uppercase letter`),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords does not match")
    }),

    onSubmit: async (values: FormValues) => {
        const email = values.email
        const phone = values.phone
        const password = values.password
        const firstName = values.firstName
        const lastName = values.lastName
        
            try{
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user: User={
              firstName,
              lastName,
              email, 
              phone,
              createdAt: Timestamp.fromDate(new Date()),
              role: "user",       
            }

            await setDoc(doc(db,'users', userCredential.user?.uid), user);
            signOut(auth);
            navigate("/login");
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
        
        <Input label="Phone number" id="phone" type="text" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} error={formik.errors.phone} touched={formik.touched.phone}/>

        <Input password label="Password" id="password"  name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} touched={formik.touched.password}/>
      
        <Input password label="Confirm password" id="confirmPassword"  name="confirmPassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword} error={formik.errors.confirmPassword} touched={formik.touched.confirmPassword}/>
      
        <div className='footer'>
          <Button buttonType='textBlack' onClick={()=> navigate("/login")}>Cancel</Button>
          <Button buttonType="secondary" type="submit">Create account</Button>   

        </div>
             
      </form>


    </Container>
  )
}

export default Register