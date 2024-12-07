import styled from "styled-components"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {db} from "./../../firebase/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../../context/AuthContext"
import {Input, PageContainer, SectionContainer, Button} from "./../index"
import iconAdd from "./../../assets/add-white.svg"

type UserData = {
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: number,
  addressesList?: Array<string>,
}

const Container=styled.div`
width: 864px;
margin: 128px 0;

@media (max-width: 864px) {
    width: 100%;
    margin: 16px;   
    }
`

const FormGeneral = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  @media (max-width: 577px) {
      align-items: center;
    }
  

  div.inputs{
    width: 577px;
    display: grid;
    grid-template-columns: auto auto;
    column-gap:24px;
    row-gap: 24px;

    @media (max-width: 577px) {
      width: 250px;
      display: flex;
      flex-direction: column;
    
    }

    }

  div.formFooter{
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
  }
 
`

const AddressContainer = styled.div`
  display: flex;
  column-gap: 16px;
  padding: 16px;

  div.number{
    width: 24px;
    height: 24px;
    background-color: ${props=> props.theme.colors.primary[500]};
    font-weight: bold;
    color: ${props=> props.theme.colors.neutral[50]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const FormAddress = styled.form`
  max-width: 400px;
  display: flex;
  column-gap: 16px;
  justify-content: baseline;
  padding: 16px;

  button{
    white-space: nowrap;
    @media (max-width: 490px) {
      display: none;
    }

  }

  button.icon{
    display: none;
    @media (max-width: 490px) {
      display: initial
    }

  }
 
`

const PersonalData = () => {
    const currentUser = useContext(AuthContext)
    const [userData, setUserData] = useState<UserData | null>(null)

    const formikGeneral = useFormik({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName:  userData?.lastName || "", 
      email:  userData?.email || "",
      phone: userData?.phone || "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object(
      {
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid Email").required("Required"),
        phone: Yup.string().required("Required"),
    }),

    onSubmit:  async (values) => {
     
      const firstName = values.firstName;
      const lastName = values.lastName;
      const email = values.email;
      const phone = values.phone;

      const user={
              firstName,
              lastName,
              email, 
              phone,        
      }

      if(currentUser){
        try{
          const docRef = doc(db, "users", currentUser);
          await updateDoc(docRef, user);
          setUserData(user);
        }catch(error){
          console.log(error)
        }

      }
    } 
    }
  )

  const formikAddress = useFormik({
    initialValues: {
      address:  "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object(
      {
        address: Yup.string().matches(/\d+/, 'Address must contain a house number'),
    }),

    onSubmit:  async (value) => {
     
      const address = value.address;

      const addressID = (userData?.addressesList?.length || 0) + 1;
      const newAddressesList = [...(userData?.addressesList || []), { addressID, address }];

      const user={
              ...userData,
              addressesList: newAddressesList,
      }

      if(currentUser){
        try{
          const docRef = doc(db, "users", currentUser);
          await updateDoc(docRef, user);
          formikAddress.resetForm(); 
          setUserData(user);
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
      <PageContainer title="Personal data">
      <SectionContainer title="General">
        <FormGeneral onSubmit={formikGeneral.handleSubmit}>
          <div className="inputs">
          <Input
            label="First name" 
            id="firstName" 
            type="text" 
            name="firstName" 
            onBlur={formikGeneral.handleBlur} 
            onChange={formikGeneral.handleChange} 
            value={formikGeneral.values.firstName}
            touched={formikGeneral.touched.firstName}
            error={formikGeneral.errors.firstName}
          />

          <Input 
            label="Last name"
            id="lastName" 
            type="text" 
            name="lastName" 
            onBlur={formikGeneral.handleBlur} 
            onChange={formikGeneral.handleChange} 
            value={formikGeneral.values.lastName}
            touched={formikGeneral.touched.lastName}
            error={formikGeneral.errors.lastName}
          />

          <Input 
            label="Phone number" 
            id="phone" 
            type="string" 
            name="phone" 
            onBlur={formikGeneral.handleBlur} 
            onChange={formikGeneral.handleChange} 
            value={formikGeneral.values.phone}
            touched={formikGeneral.touched.phone}
            error={formikGeneral.errors.phone}
            />

          <Input 
            label="E-mail"
            id="email"
            type="text"
            name="email" 
            onBlur={formikGeneral.handleBlur} 
            onChange={formikGeneral.handleChange} 
            value={formikGeneral.values.email}
            touched={formikGeneral.touched.email}
            error={formikGeneral.errors.email}
            />

            </div>
            <div className="formFooter">
              <Button buttonType="secondary" type="submit">Save</Button> 
            </div>

                 
        </FormGeneral>

      </SectionContainer>

      <SectionContainer title="Delivery address">
        <h4>Favourite adresses</h4>

        {userData?.addressesList?.map((address) => 
          <AddressContainer key={address.addressID}>
            <div className="number">{address.addressID}</div>
            <p>{address.address}</p>
          </AddressContainer>
        )}

        {(userData?.addressesList?.length<3 || !userData?.addressesList) && <FormAddress onSubmit={formikAddress.handleSubmit}>
          <Input
            type="text"
            name="address" 
            onBlur={formikAddress.handleBlur} 
            onChange={formikAddress.handleChange} 
            value={formikAddress.values.address}
            touched={formikAddress.touched.address}
            error={formikAddress.errors.address}
          />
          <Button className="icon" buttonType="icon" iconLeft={iconAdd} type="submit"></Button> 
          <Button buttonType="secondary" iconLeft={iconAdd} type="submit">Add address</Button> 

        </FormAddress>}



      </SectionContainer>

    </PageContainer>

    </Container>

     
  )
}

export default PersonalData