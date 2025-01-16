import {PageContainer} from "./../index"
import styled from 'styled-components'
import { useReducer, useState, useEffect } from 'react'
import { db } from '../../firebase/firebase'
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import sortIcon from "./../../assets/sort.svg"
import userIcon from "./../../assets/user-customer.svg"

type ActionReducer = {type: "alphabeticalAZ" | "alphabeticalZA" | "recencyDESC" | "recencyASC" }


type User = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  createdAt: Timestamp,
  userID: string,
  role: string,

}

const Container = styled.div`
  width: 872px;
  height: 90vh;
`
const Content = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;


  div.options{
    display: flex;
    justify-content: space-between;

  }
  
  
`


const UsersQuantity = styled.div`
  background-color: ${props=> props.theme.colors.neutral[50]};
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 8px 16px;
  border-radius:  10px;
`

const SortButton = styled.button`
  background-color: transparent;
  padding: 8px 16px;
  border-radius:  10px;
  border: 1px solid ${props=> props.theme.colors.neutral[200]};
  display: flex;
  align-items: center;
  column-gap: 8px;
  
`
const SortOption = styled.div`
  position: relative;
`
const Dropdown=styled.div`
  width: 300px;
  border-radius:  10px;
  border: 1px solid ${props=> props.theme.colors.neutral[200]};
  position: absolute;
  right: 0;
  top: 48px;
  background-color: ${props=> props.theme.colors.white};
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 16px 0;
  box-shadow: ${props=> props.theme.shadow};

`
const DropdownItem = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  text-align: left;

  &:hover{
    background-color: ${props=> props.theme.colors.neutral[50]};
  }


`


const Header=styled.div`
    background-color: ${props=> props.theme.colors.neutral[900]};
    border-radius: 10px 10px 0 0;
    display: grid;
    grid-template-columns: 1fr 150px 1fr ;
    column-gap: 32px;
    padding: 16px 40px 16px 24px;
`

const H3 = styled.h3`
    color: ${props=> props.theme.colors.neutral[50]};
    font-size: ${props=> props.theme.typography.fontSize["sm"]};
`
const ListItem=styled.div`
    border-radius: 10px;
    border: 1px solid ${props=> props.theme.colors.neutral[200]};
    display: grid;
    grid-template-columns: 1fr 150px 1fr ;
    column-gap: 32px;
    padding: 16px 24px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding: 0 16px 0 0;
  height: 55vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
        width: 6px; 
    }

  &::-webkit-scrollbar-track {
      background-color: ${props => props.theme.colors.neutral[50]}; 
      border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.colors.neutral[200]};
      border-radius: 10px; 
  }

  &::-webkit-scrollbar-thumb:hover {
      background-color: ${props => props.theme.colors.neutral[700]}; 
  }
  
`

const reducer = (state: string, action: ActionReducer) => {
  switch (action.type){
    case "alphabeticalAZ": 
      return "alphabeticalAZ"
    
    case "alphabeticalZA": 
      return "alphabeticalZA"
    
    case "recencyDESC": 
      return "recencyDESC"
    
    case "recencyASC": 
      return "recencyASC"

  default:
     return state
    
  }
}


const numberOfUsers = (users: Array<User> | null) => {
  if(users){
        return users.length
  }
  return 0
}


const Customers = () => {
    const [users, setUsers] = useState<Array<User> | null>(null)

    const [state, dispatch] = useReducer(reducer, "recencyASC");
    const [sortOption, setSortOption] = useState<boolean>(false)

    useEffect(() => {
            const getUsers= () =>{
                try{
                    const collectionRef = collection(db, 'users');
                    let q = query(collectionRef, orderBy("createdAt"))

                    if(state === "recencyASC"){
                      q = query(collectionRef, orderBy("createdAt"))
                      
                    }
                
                    if(state === "recencyDESC"){
                      q = query(collectionRef, orderBy("createdAt", 'desc'))
                      
                    }
                    if (state === "alphabeticalAZ"){
                      q = query(collectionRef, orderBy("lastName"))
                      
                    }
                    if (state === "alphabeticalZA"){
                      q = query(collectionRef, orderBy("lastName", "desc"))
                    }
                  
                    const unsubscribe =  onSnapshot( q, (querySnapshot) => {
                    
                    const users= querySnapshot.docs.map((doc) => (
                        {
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        email: doc.data().email,
                        phone: doc.data().phone,
                        createdAt: doc.data().createdAt,
                        userID: doc.id,
                        role: doc.data().role
                  
                        }))

                        const filteredUsers = users.filter((user) => user.role !== "admin") 
                        setUsers(filteredUsers);
                        })
            
                        
                        return () => unsubscribe;
            
            
                        }catch (error) {
                        console.log(error)
                        }
          }
        
            getUsers()
        
          }, [state])


  return (
    <Container>
      <PageContainer title="Customers" small>
        <Content>
          <div className="options">
        <UsersQuantity>
          <img src={userIcon} alt=''/>
          {numberOfUsers(users)}

        </UsersQuantity>
        <SortOption>
          <SortButton onClick={()=>setSortOption(!sortOption)}>Sort<img src={sortIcon} alt=''/></SortButton>
          {sortOption && 
            <Dropdown>
              <DropdownItem onClick={()=>  dispatch({ type: "alphabeticalAZ"})}>Alphabetical (A-Z)</DropdownItem>
              <DropdownItem onClick={()=>  dispatch({ type: "alphabeticalZA"})}>Alphabetical (Z-A)</DropdownItem>
              <DropdownItem onClick={()=>  dispatch({ type: "recencyDESC"})}>By recency (Oldest to newest)</DropdownItem>
              <DropdownItem onClick={()=>  dispatch({ type: "recencyASC"})}>By recency (Newest to oldest)</DropdownItem>
            </Dropdown>
            }
        </SortOption>
        

      </div>
        <Header>
            <H3>Fullname</H3>
            <H3>Phone number</H3>
            <H3>E-mail</H3>
        </Header>
        <ListContainer>
          {users?.filter(user => user.role !== "admin" ).map(user => 
          <ListItem key={user.userID}>
                <p className="fullname">{`${user.lastName} ${user.firstName}`}</p>
                <p className="phone-number">{user.phone ? `${user.phone.slice(0, 3)} ${user.phone.slice(3, 6)} ${user.phone.slice(6)}` : "-"}</p>
                <p className="email">{user.email}</p>       
            </ListItem>


          )}

        </ListContainer>
        </Content>
    </PageContainer>

        
      

    </Container>
    
  )
}

export default Customers