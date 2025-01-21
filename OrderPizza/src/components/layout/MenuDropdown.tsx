import styled from 'styled-components';
import closeIcon from './../../assets/close.svg';
import { useContext, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './../../firebase/firebase';
import { Button } from './../index';

type ComponentProps = {
  dropdownMenu: boolean;
  setDropdownMenu: (value: boolean) => void;
};

const Container = styled.div`
  position: absolute;
  top: 60px;
  right: 24px;
  box-shadow: ${(props) => props.theme.shadow};
  width: 300px;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid ${(props) => props.theme.colors.neutral[200]};
  background-color: ${(props) => props.theme.colors.white};
  row-gap: 24px;
  z-index: 1;

  @media (max-width: 490px) {
    border-radius: 0;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    justify-content: flex-start;
    align-items: flex-start;
  }

  ul {
    list-style: none;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.neutral[200]};
    padding-bottom: 8px;

    li {
      margin: 16px 0;
    }

    button {
      padding: 8px 0;
      text-decoration: none;
      display: block;
      padding: 8px 16px;
      background: none;
      width: 100%;
      text-align: start;

      &:hover {
        background-color: ${(props) => props.theme.colors.neutral[50]};
        border-radius: 10px;
      }
    }
  }

  ul.nav {
    display: none;

    @media (max-width: 864px) {
      display: initial;
    }
  }

  div.login-btn {
    display: none;

    @media (max-width: 864px) {
      display: initial;
      width: 100%;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  display: none;

  @media (max-width: 490px) {
    display: initial;
    position: absolute;
    top: 24px;
    right: 24px;
  }
`;
const Logo = styled.h1`
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: 24px;
  display: none;
  @media (max-width: 490px) {
    display: initial;
  }
`;

const MenuDropdown = forwardRef<HTMLDivElement, ComponentProps>(
  ({ dropdownMenu, setDropdownMenu }: ComponentProps, ref) => {
    const navigate = useNavigate();
    const { uid } = useContext(AuthContext);

    const toggleDropdownMenu = () => setDropdownMenu(!dropdownMenu);

    const logout = async () => {
      try {
        await signOut(auth);
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Container ref={ref}>
        <CloseButton onClick={() => setDropdownMenu(!dropdownMenu)}>
          <img src={closeIcon} alt="Close" />
        </CloseButton>
        <Logo>OrderPizza</Logo>
        <ul className="nav">
          <li>
            <button
              onClick={() => {
                navigate('/menu'), toggleDropdownMenu();
              }}
            >
              Menu
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate('/promotions'), toggleDropdownMenu();
              }}
            >
              Promotions
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate('/contact'), toggleDropdownMenu();
              }}
            >
              Contact
            </button>
          </li>
        </ul>
        {uid && (
          <ul>
            <li>
              <button
                onClick={() => {
                  navigate('/personal-data'), toggleDropdownMenu();
                }}
              >
                Personal data
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate('/orders'), toggleDropdownMenu();
                }}
              >
                Orders
              </button>
            </li>
          </ul>
        )}

        {uid ? (
          <Button
            style={{ width: '100%' }}
            buttonType="secondary"
            onClick={logout}
          >
            Log out
          </Button>
        ) : (
          <div className="login-btn">
            <Button
              buttonType="primary"
              style={{ width: '100%' }}
              onClick={() => {
                navigate('./login'), toggleDropdownMenu();
              }}
            >
              Log in
            </Button>
          </div>
        )}
      </Container>
    );
  }
);

export default MenuDropdown;
