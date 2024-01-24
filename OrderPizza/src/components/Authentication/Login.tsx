import { useFormik } from 'formik'
import {useNavigate, Link} from "react-router-dom";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from '@firebase/auth'
import {auth} from "./../../firebase/firebase"


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
    <>
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="email">Email</label>
      <input id="email" type="text" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
      {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}

      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
      {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}

      <button type="submit">Log in</button>        
    </form>
    <p>You do not have an account yet?<Link to="/register"> Register now!</Link></p>
    </>
  )
}

export default Login