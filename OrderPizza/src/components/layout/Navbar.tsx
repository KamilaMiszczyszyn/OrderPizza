import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/firebase';
import { ShoppingCartDropdown, Button, MenuDropdown } from './../index';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import userIcon from './../../assets/user-small-white.svg';
import arrowIcon from './../../assets/arrow-down-white.svg';
import arrowBackIcon from './../../assets/arrow-back.svg';
import hamburgerIcon from './../../assets/hamburger-menu.svg';

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
  role: string;
};

const Nav = styled.nav`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.neutral[900]};
  color: ${(props) => props.theme.colors.neutral[50]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  position: relative;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;

    button.dropdown-btn {
      @media (max-width: 864px) {
        display: none;
      }
    }
  }

  div.logged-out {
    div.login-btn {
      @media (max-width: 490px) {
        display: none;
      }
    }
  }
`;

const NavBack = styled.nav`
  width: 100%;
  padding: 8px 24px;
  height: 100%;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  column-gap: 24px;
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral[200]};

  button {
    background: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    &:hover {
      background-color: ${(props) => props.theme.colors.neutral[50]};
    }

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const Logo = styled.h1<{ $black?: boolean }>`
  color: ${(props) =>
    props.$black ? props.theme.colors.black : props.theme.colors.neutral[50]};
`;

const NavList = styled.ul`
  display: flex;
  gap: 20px;

  @media (max-width: 864px) {
    display: none;
  }

  li {
    list-style-type: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.neutral[50]};
  padding: 8px 16px;
  font-weight: ${(props) => props.theme.typography.fontWeight['bold']};

  &:hover {
    background-color: ${(props) => props.theme.colors.neutral[800]};
    border-radius: 10px;
  }

  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.neutral[50]};
  }

  &.active:hover {
    background-color: ${(props) => props.theme.colors.neutral[800]};
    border-radius: 10px 10px 0 0;
  }
`;

const CartButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: url('/assets/shopping-cart-2.svg');
  background-repeat: no-repeat;
  background-position: center;
  width: 33px;
  height: 33px;

  &:hover {
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.neutral[800]};
  }

  div {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background-color: ${(props) => props.theme.colors.primary[500]};
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 1.1rem;
    font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
    text-align: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;

    border: none;
    width: 33px;
    height: 33px;
    padding: 0px;
  }
`;

const Greeting = styled.p`
  font-weight: ${(props) => props.theme.typography.fontWeight['bold']};

  @media (max-width: 864px) {
    display: none;
  }
`;

const ButtonHamburger = styled.button`
  display: none;
  padding: 8px;
  background: none;

  @media (max-width: 864px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.neutral[800]};
    border-radius: 10px;
  }
`;

const Navbar = () => {
  const { uid, role } = useContext(AuthContext);
  const { shoppingCartItems } = useContext(ShoppingCartContext);

  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [shoppingCart, setShoppingCart] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const shoppingCartRef = useRef<HTMLDivElement>(null);

  const closeDropdownMenu = (event: MouseEvent) => {
    if (
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(event.target as Node)
    ) {
      setDropdownMenu(false);
    }
  };

  const closeShoppingCartDropdown = (event: MouseEvent) => {
    if (
      shoppingCartRef.current &&
      !shoppingCartRef.current.contains(event.target as Node)
    ) {
      setShoppingCart(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdownMenu);
    document.addEventListener('mousedown', closeShoppingCartDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdownMenu);
      document.removeEventListener('mousedown', closeShoppingCartDropdown);
    };
  }, []);

  useEffect(() => {
    const getData = async (user: string | null) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userPersonalData = docSnap.data() as UserData;
            setName(userPersonalData.firstName);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData(uid);
  }, [uid]);

  useEffect(() => {
    const isSmallScreen = () => window.matchMedia('(max-width: 490px)').matches;

    if (isSmallScreen() && (dropdownMenu || shoppingCart)) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [dropdownMenu, shoppingCart]);

  const countTotalQuantity = () => {
    const totalQuantity: number = shoppingCartItems.reduce(
      (accumulator, currentValue) => {
        const quantity: number = currentValue.quantity;
        return accumulator + quantity;
      },
      0
    );
    return totalQuantity;
  };

  return (
    <>
      {location.pathname === '/order-summary' ||
      location.pathname === '/login' ||
      location.pathname === '/register' ? (
        <NavBack>
          <button onClick={() => navigate(-1)}>
            <img src={arrowBackIcon} alt="Back" />
          </button>
          <Link style={{ textDecoration: 'none' }} to="/">
            <Logo $black>OrderPizza</Logo>
          </Link>
        </NavBack>
      ) : (
        <>
          <Nav>
            <div>
              <Link style={{ textDecoration: 'none' }} to="/">
                <Logo>OrderPizza</Logo>
              </Link>
              <NavList>
                <li>
                  <StyledNavLink to="/menu">Menu</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/promotions">Promotions</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/contact">Contact</StyledNavLink>
                </li>
              </NavList>
            </div>

            {uid && role !== 'admin' && (
              <div>
                <Greeting>Hi, {name}!</Greeting>

                <CartButton>
                  <div>{countTotalQuantity()}</div>
                  <button
                    onClick={() => setShoppingCart(!shoppingCart)}
                  ></button>
                </CartButton>

                <Button
                  className="dropdown-btn"
                  buttonType="textWhite"
                  iconLeft={userIcon}
                  iconRight={arrowIcon}
                  onClick={() => setDropdownMenu(!dropdownMenu)}
                >
                  My account
                </Button>
                <ButtonHamburger onClick={() => setDropdownMenu(!dropdownMenu)}>
                  <img src={hamburgerIcon} alt="" />
                </ButtonHamburger>
              </div>
            )}
            {!uid && (
              <div className="logged-out">
                <div className="login-btn">
                  <Button
                    buttonType="primary"
                    onClick={() => navigate('./login')}
                  >
                    Log in
                  </Button>
                </div>
                <CartButton>
                  <div>{countTotalQuantity()}</div>
                  <button
                    onClick={() => setShoppingCart(!shoppingCart)}
                  ></button>
                </CartButton>
                <ButtonHamburger onClick={() => setDropdownMenu(!dropdownMenu)}>
                  <img src={hamburgerIcon} alt="" />
                </ButtonHamburger>
              </div>
            )}

            {role === 'admin' && (
              <Button
                buttonType="primary"
                onClick={() => navigate('./dashboard')}
              >
                Go to dashboard
              </Button>
            )}
          </Nav>

          {dropdownMenu && (
            <MenuDropdown
              ref={dropdownMenuRef}
              dropdownMenu={dropdownMenu}
              setDropdownMenu={setDropdownMenu}
            />
          )}

          {shoppingCart && (
            <ShoppingCartDropdown
              ref={shoppingCartRef}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
