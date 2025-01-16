import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { db } from './../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { Input, PageContainer, SectionContainer, Button } from './../index';
import iconAdd from './../../assets/add-white.svg';
import successIcon from './../../assets/success.svg';

type Address = {
  addressID: number;
  address: string;
};

type UserData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  addressesList?: Array<Address>;
};

const Container = styled.div`
  width: 864px;
  margin: 128px 0;

  @media (max-width: 864px) {
    width: 100%;
    margin: 16px;
  }
`;

const FormGeneral = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  @media (max-width: 577px) {
    align-items: center;
  }

  div.inputs {
    width: 600px;
    display: grid;
    grid-template-columns: 300px 300px;
    column-gap: 24px;
    row-gap: 24px;

    @media (max-width: 577px) {
      width: 300px;
      display: flex;
      flex-direction: column;
    }
  }

  div.formFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Success = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
  p {
    font-size: ${(props) => props.theme.typography.fontSize['xs']};
    color: ${(props) => props.theme.colors.success};
  }
`;

const AddressContainer = styled.div`
  display: flex;
  column-gap: 16px;
  padding: 16px;

  div.number {
    width: 24px;
    height: 24px;
    background-color: ${(props) => props.theme.colors.primary[500]};
    font-weight: bold;
    color: ${(props) => props.theme.colors.neutral[50]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FormAddress = styled.form`
  max-width: 400px;
  display: flex;
  column-gap: 16px;
  justify-content: baseline;
  padding: 16px;

  button {
    white-space: nowrap;
    @media (max-width: 490px) {
      display: none;
    }
  }

  button.icon {
    display: none;
    @media (max-width: 490px) {
      display: initial;
    }
  }
`;

const PersonalData = () => {
  const { uid } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formikGeneral = useFormik({
    initialValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid Email').required('Required'),
      phone: Yup.string()
        .matches(/^[0-9]{9}$/, 'Phone number must be exactly 9 digits')
        .required('Required'),
    }),

    onSubmit: async (values) => {
      const firstName = values.firstName;
      const lastName = values.lastName;
      const email = values.email;
      const phone = values.phone;

      const user = {
        firstName,
        lastName,
        email,
        phone,
      };

      if (uid) {
        try {
          const docRef = doc(db, 'users', uid);
          await updateDoc(docRef, user);
          setUserData(user);
          setSuccessMessage('Your data has been successfully updated.');
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const formikAddress = useFormik({
    initialValues: {
      address: '',
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      address: Yup.string().matches(
        /\d+/,
        'Address must contain a house number'
      ),
    }),

    onSubmit: async (value) => {
      const address = value.address;

      const addressID = (userData?.addressesList?.length || 0) + 1;
      const newAddressesList = [
        ...(userData?.addressesList || []),
        { addressID, address },
      ];

      const user = {
        ...userData,
        addressesList: newAddressesList,
      };

      if (uid) {
        try {
          const docRef = doc(db, 'users', uid);
          await updateDoc(docRef, user);
          formikAddress.resetForm();
          setUserData(user);
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  useEffect(() => {
    const getPersonalData = async (user: string | null) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userPersonalData = docSnap.data();
            setUserData(userPersonalData);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getPersonalData(uid);
  }, [uid]);

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
              <div>
                {successMessage && (
                  <Success>
                    <img src={successIcon} alt="" />
                    <p>{successMessage}</p>
                  </Success>
                )}
              </div>
              <Button buttonType="secondary" type="submit">
                Save
              </Button>
            </div>
          </FormGeneral>
        </SectionContainer>

        <SectionContainer title="Delivery address">
          <h4>Favourite adresses (max 3)</h4>

          {userData?.addressesList?.map((address) => (
            <AddressContainer key={address.addressID}>
              <div className="number">{address.addressID}</div>
              <p>{address.address}</p>
            </AddressContainer>
          ))}

          {((userData?.addressesList && userData.addressesList.length < 3) ||
            !userData?.addressesList) && (
            <FormAddress onSubmit={formikAddress.handleSubmit}>
              <Input
                type="text"
                name="address"
                onBlur={formikAddress.handleBlur}
                onChange={formikAddress.handleChange}
                value={formikAddress.values.address}
                touched={formikAddress.touched.address}
                error={formikAddress.errors.address}
              />
              <Button
                className="icon"
                buttonType="icon"
                iconLeft={iconAdd}
                type="submit"
              ></Button>
              <Button buttonType="secondary" iconLeft={iconAdd} type="submit">
                Add address
              </Button>
            </FormAddress>
          )}
        </SectionContainer>
      </PageContainer>
    </Container>
  );
};

export default PersonalData;
