import styled from "styled-components"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {db} from "./../firebase/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type UserData = {
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: number,
  address?: string,
}


const Container = styled.div`
    width: 400px;
    margin-bottom: 100px;
`

const H1 = styled.h1`
    margin: 100px 0 20px 0; 
    color: ${props=> props.theme.colors.primary};
    font-size: 3.2rem;
`

const PersonalData = () => {
    const currentUser = useContext(AuthContext)
    const [userData, setUserData] = useState<UserData | null>(null)

    const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName:  userData?.lastName || "", 
      email:  userData?.email || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object(
      {
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid Email").required("Required"),
        phone: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
    }),

    onSubmit:  async (values) => {
     
      const firstName = values.firstName;
      const lastName = values.lastName;
      const email = values.email;
      const phone = values.email;
      const address = values.address;

      const user={
              firstName,
              lastName,
              email, 
              phone,
              address,         
      }

      if(currentUser){
        try{
          const docRef = doc(db, "users", currentUser);
          await updateDoc(docRef, user)
        }catch(error){
          console.log(error)
        }

      }
    } 
    }
  )
 
  useEffect(() => {
    const getPersonalData= async(user: string | null)=>{
      if(user){
        try{
          const docRef = doc(db, "users", user);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userPersonalData = docSnap.data();
            setUserData(userPersonalData)
             } else {
                 console.log("No such document!");
            } 
        }catch (error) {
            console.log(error)
            }}
  }

    getPersonalData(currentUser)

  }, [currentUser])

  return (
    
        
        <Container>
        <H1>Personal data</H1>
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

            <label htmlFor="phone">Phone number</label>
            <input id="phone" type="string" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}/>
            {formik.touched.phone && formik.errors.phone ? <p>{formik.errors.phone}</p> : null}

            <label htmlFor="address">Address</label>
            <input id="address" type="text" name="address" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.address}/>
            {formik.touched.address && formik.errors.address ? <p>{formik.errors.address}</p> : null}

            <button type="submit">Save</button>        
        </form>


        </Container>
        
  
  )
}

export default PersonalData