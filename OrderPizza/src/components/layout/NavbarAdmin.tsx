import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import homeIcon from './../../assets/admin-home.svg';
import ordersManagementIcon from './../../assets/admin-orders-management.svg';
import ordersHistoryIcon from './../../assets/admin-orders-history.svg';
import customersIcon from './../../assets/admin-customers.svg';
import { Button } from '../common';
import { signOut } from 'firebase/auth';
import logoutIcon from './../../assets/logout.svg';
import { auth } from './../../firebase/firebase';

const Container = styled.nav`
  background-color: ${(props) => props.theme.colors.neutral[900]};
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  div.navlist-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    div {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
  }
`;

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.neutral[50]};
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.neutral[50]};
  padding: 16px 24px;
  font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
  display: flex;
  column-gap: 16px;

  &:hover {
    background-color: ${(props) => props.theme.colors.neutral[800]};
    border-radius: 10px;
  }

  &.active {
    background-color: 2px solid ${(props) => props.theme.colors.neutral[700]};
    border-radius: 10px;
  }

  &.active:hover {
    background-color: ${(props) => props.theme.colors.neutral[800]};
    border-radius: 10px;
  }
`;

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Logo>OrderPizza</Logo>
      <div className="navlist-container">
        <NavList>
          <li>
            <StyledNavLink to="/dashboard">
              <img src={homeIcon} alt="" /> Home
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/orders-management">
              <img src={ordersManagementIcon} alt="" />
              Orders management
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/orders-history">
              <img src={ordersHistoryIcon} alt="" />
              Orders history
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/customers">
              <img src={customersIcon} alt="" />
              Customers
            </StyledNavLink>
          </li>
        </NavList>
        <div>
          <Button
            style={{ width: '100%', justifyContent: 'flex-start' }}
            buttonType="secondary"
            iconLeft={logoutIcon}
            onClick={logout}
          >
            Log out
          </Button>
          <Button
            style={{ width: '100%' }}
            buttonType="primary"
            onClick={() => navigate('./')}
          >
            Go to public site
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NavbarAdmin;
