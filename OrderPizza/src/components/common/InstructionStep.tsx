import styled from 'styled-components';
import userIcon from './../../assets/User big.svg';
import pizzaIcon from './../../assets/Pizza.svg';
import payIcon from './../../assets/Pay.svg';
import deliveryIcon from './../../assets/scooter-small.svg';
import { Button } from './../index';
import { useNavigate } from 'react-router-dom';

interface ComponentProps {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}

const StepContainer = styled.div<{
  $top?: string;
  $left?: string;
  $right?: string;
}>`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};

  h3 {
    text-align: center;
  }

  @media (max-width: 490px) {
    position: static;
    top: auto;
    left: auto;
    right: auto;
  }
`;

const BorderRed = styled.div`
  width: 270px;
  height: 270px;
  border-left: 4px solid ${(props) => props.theme.colors.primary[500]};
  border-bottom: 4px solid ${(props) => props.theme.colors.primary[500]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;

const BorderBlack = styled.div`
  width: 250px;
  height: 250px;
  border-right: 1px solid ${(props) => props.theme.colors.neutral[900]};
  border-top: 1px solid ${(props) => props.theme.colors.neutral[900]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  column-gap: 10px;
`;

const BorderRedVariant2 = styled.div`
  width: 270px;
  height: 270px;
  border-right: 4px solid ${(props) => props.theme.colors.primary[500]};
  border-top: 4px solid ${(props) => props.theme.colors.primary[500]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;

const BorderBlackVariant2 = styled.div`
  width: 250px;
  height: 250px;
  border-left: 1px solid ${(props) => props.theme.colors.neutral[900]};
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral[900]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  column-gap: 10px;
`;

const NumCircle = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.colors.primary[500]};
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: ${(props) => props.theme.colors.neutral[50]};
    font-size: 36px;
  }
`;

const InstructionStep = ({ step1, step2, step3, step4 }: ComponentProps) => {
  const navigate = useNavigate();

  return (
    <>
      {step1 && (
        <StepContainer $top="0" $left="40px">
          <BorderRed>
            <BorderBlack>
              <NumCircle>
                <span>1</span>
              </NumCircle>
              <img src={userIcon} alt="" />
              <h4>Log in or Sign up</h4>
              <Button
                buttonType="secondary"
                onClick={() => navigate('./login')}
              >
                Log in
              </Button>
            </BorderBlack>
          </BorderRed>
        </StepContainer>
      )}

      {step2 && (
        <StepContainer $top="294px" $right="-40px">
          <BorderRedVariant2>
            <BorderBlackVariant2>
              <NumCircle>
                <span>2</span>
              </NumCircle>
              <img src={pizzaIcon} alt="" />
              <h4>Choose pizza</h4>
              <h4>and drink</h4>
            </BorderBlackVariant2>
          </BorderRedVariant2>
        </StepContainer>
      )}

      {step3 && (
        <StepContainer $top="588px" $left="-40px">
          <BorderRed>
            <BorderBlack>
              <NumCircle>
                <span>3</span>
              </NumCircle>
              <img src={payIcon} alt="" />
              <h4>Pay for order</h4>
            </BorderBlack>
          </BorderRed>
        </StepContainer>
      )}

      {step4 && (
        <StepContainer $top="882px" $right="40px">
          <BorderRedVariant2>
            <BorderBlackVariant2>
              <NumCircle>
                <span>4</span>
              </NumCircle>
              <img src={deliveryIcon} alt="" />
              <h4>Wait for delivery</h4>
            </BorderBlackVariant2>
          </BorderRedVariant2>
        </StepContainer>
      )}
    </>
  );
};

export default InstructionStep;
