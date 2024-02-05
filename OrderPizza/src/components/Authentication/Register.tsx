import { useFormik } from 'formik'
import * as Yup from 'yup';
import {useNavigate, Link} from "react-router-dom";
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {auth, db} from "./../../firebase/firebase"
import { toast } from 'react-toastify';
import styled from 'styled-components';

 const Container = styled.div`
    width: 400px;
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
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">Name</label>
        <input id="firstName" type="text" name="firstName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstName}/>
        {formik.touched.firstName && formik.errors.firstName ? <p>{formik.errors.firstName}</p> : null}

        <label htmlFor="lastName">Lastname</label>
        <input id="lastName" type="text" name="lastName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastName}/>
        {formik.touched.lastName && formik.errors.lastName ? <p>{formik.errors.lastName}</p> : null}

        <label htmlFor="email">Email</label>
        <input id="email" type="text" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
        {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
        {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" name="confirmPassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword}/>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p>{formik.errors.confirmPassword}</p> : null}

        <button type="submit">Sign up</button>        
      </form>
      <Link to="/login">Cancel</Link>
    </Container>
  )
}

export default Register