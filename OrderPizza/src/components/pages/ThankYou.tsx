import { useNavigate } from 'react-router-dom';
import deliveryMan from './../../assets/delivery-man.png';
import styled from 'styled-components';
import { Button } from './../index';

const Container = styled.div`
  width: 100vw;
  height: 100wh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 24px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 24px;
  }

  img {
    width: 360px;
    height: 360px;

    @media (max-width: 490px) {
      width: 240px;
      height: 240px;
    }
  }

  h2 {
    @media (max-width: 490px) {
      font-size: ${(props) => props.theme.typography.fontSize['xl']};
      line-height: 1.2;
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }

  p {
    @media (max-width: 490px) {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
`;

const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>OrderPizza</h1>
      <img src={deliveryMan} alt="Delivery man" />
      <div>
        <h2>
          <span>Thank You </span>
          <span>for your Order!</span>
        </h2>
        <p>
          <span>Keep an eye on your pizza's journey </span>
          <span>— track your order now!</span>
        </p>
      </div>
      <Button buttonType="primary" onClick={() => navigate('/orders')}>
        Track delivery
      </Button>
    </Container>
  );
};

export default ThankYou;
