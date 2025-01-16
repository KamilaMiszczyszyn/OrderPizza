import styled from 'styled-components';
import orderedIcon from './../../assets/ordered.svg';
import preparationIcon from './../../assets/preparation.svg';
import deliveryIcon from './../../assets/delivery.svg';
import completedIcon from './../../assets/completed.svg';

interface ComponentProps {
  ordered?: boolean;
  preparation?: boolean;
  delivery?: boolean;
  completed?: boolean;
}

const BorderRed = styled.div`
  width: 70px;
  height: 70px;
  border-left: 2px solid ${(props) => props.theme.colors.primary[500]};
  border-bottom: 2px solid ${(props) => props.theme.colors.primary[500]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
`;

const BorderBlack = styled.div`
  width: 60px;
  height: 60px;
  border-right: 1px solid ${(props) => props.theme.colors.neutral[900]};
  border-top: 1px solid ${(props) => props.theme.colors.neutral[900]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderStatusIcon = ({
  ordered,
  preparation,
  delivery,
  completed,
}: ComponentProps) => {
  return (
    <BorderRed>
      <BorderBlack>
        {ordered && <img src={orderedIcon} alt="" />}
        {preparation && <img src={preparationIcon} alt="" />}
        {delivery && <img src={deliveryIcon} alt="" />}
        {completed && <img src={completedIcon} alt="" />}
      </BorderBlack>
    </BorderRed>
  );
};

export default OrderStatusIcon;
