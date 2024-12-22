import styled from "styled-components";
import { NavLink } from "react-router-dom"
import homeIcon from "./../../assets/admin-home.svg"
import ordersManagementIcon from "./../../assets/admin-orders-management.svg"
import ordersHistoryIcon from "./../../assets/admin-orders-history.svg"
import customersIcon from './../../assets/admin-customers.svg'


const Container= styled.nav`
    background-color: ${props=> props.theme.colors.neutral[900]};
    height: 100%;
`

const Logo = styled.h1`
  color: ${props=> props.theme.colors.neutral[50]};
`;

const NavList= styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${props=> props.theme.colors.neutral[50]};
  padding: 16px 24px;
  font-weight: ${props=> props.theme.typography.fontWeight["bold"]};
  display: flex;
  column-gap: 16px;

    &:hover{
      background-color: ${props=> props.theme.colors.neutral[800]};
      border-radius: 10px;

    }

    &.active{
      background-color: 2px solid ${props=> props.theme.colors.neutral[700]} ;
      border-radius: 10px;     
    }

     &.active:hover {
      background-color: ${props => props.theme.colors.neutral[800]};
      border-radius: 10px; 
  }
    
`

const NavbarAdmin = () => {
  return (
    <Container>
        <Logo>OrderPizza</Logo>
        <NavList>
            <li><StyledNavLink to='/dashboard'><img src={homeIcon} alt=''/> Home</StyledNavLink></li>
            <li><StyledNavLink to='/orders-managemenet'><img src={ordersManagementIcon} alt=''/>Orders management</StyledNavLink></li>
            <li><StyledNavLink to='/orders-history'><img src={ordersHistoryIcon} alt=''/>Orders history</StyledNavLink></li>
            <li><StyledNavLink to='/customers'><img src={customersIcon} alt=''/>Customers</StyledNavLink></li>
        </NavList>
    </Container>
  )
}

export default NavbarAdmin