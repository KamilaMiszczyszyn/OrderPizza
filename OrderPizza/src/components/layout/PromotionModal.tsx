import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './../index';
import { db } from '../../firebase/firebase';
import { addDoc, Timestamp, collection, getDocs } from 'firebase/firestore';

type ComponentProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Promotion = {
  createdAt: Timestamp;
  startDate: Timestamp;
  endDate: Timestamp;
  type: string;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Container = styled.div`
  background: ${(props) => props.theme.colors.white};
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 740px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Option = styled.div<{ $selected: boolean; $disabled: boolean }>`
  color: ${(props) =>
    props.$disabled
      ? props.theme.colors.neutral[500]
      : props.$selected
        ? props.theme.colors.primary[500]
        : props.theme.colors.neutral[900]};
  line-height: 1;
  width: 150px;
  height: 100px;
  border: 1px solid
    ${(props) =>
      props.$disabled
        ? props.theme.colors.neutral[200]
        : props.$selected
          ? props.theme.colors.primary[500]
          : props.theme.colors.neutral[200]};
  background-color: ${(props) =>
    props.$disabled
      ? props.theme.colors.neutral[100]
      : props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  flex-direction: column;
  row-gap: -40px;
  &:hover {
    background-color: ${(props) => props.theme.colors.neutral[50]};
    border: 1px solid
      ${(props) =>
        props.$selected
          ? props.theme.colors.primary[500]
          : props.theme.colors.neutral[500]};
  }

  span.percentage {
    font-size: 6.4rem;
    font-family: ${(props) => props.theme.typography.fontFamily['alternate']};
    font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
  }

  span.B2G1 {
    font-size: 1.9rem;
    font-family: ${(props) => props.theme.typography.fontFamily['alternate']};
    font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
  }

  span.B2G1-free {
    font-size: 4.8rem;
    font-family: ${(props) => props.theme.typography.fontFamily['alternate']};
    font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
  }

  span.code {
    font-size: ${(props) => props.theme.typography.fontSize['xs']};
    color: ${(props) => props.theme.colors.neutral[700]};
  }
`;

const DateContainer = styled.div`
  display: flex;
  column-gap: 40px;

  div {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  input {
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.primary[200]};
    padding: 8px 8px;
  }
`;

const Alert = styled.p`
  font-weight: ${(props) => props.theme.typography.fontWeight['bold']};
  color: ${(props) => props.theme.colors.primary[700]};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }
`;

const PromotionModal = ({ isOpen, onClose }: ComponentProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [disabledOptions, setDisabledOptions] = useState<Array<string>>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const getPromotions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'promotions'));
        const promotions = querySnapshot.docs.map((doc) => doc.data().type);
        setDisabledOptions(promotions);
      } catch (error) {
        console.error(error);
      }
    };

    getPromotions();
  }, []);

  const handleSave = async () => {
    if (!selectedOption) {
      setAlert('Please select a promotion option.');
      return;
    }

    if (disabledOptions.includes(selectedOption)) {
      setAlert('This promotion option is disabled');
      return;
    }

    if (endDate === '' || startDate === '') {
      setAlert('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setAlert('End date cannot be earlier than start date');
      return;
    }

    try {
      const promotion: Promotion = {
        createdAt: Timestamp.fromDate(new Date()),
        startDate: Timestamp.fromDate(new Date(startDate)),
        endDate: Timestamp.fromDate(new Date(endDate)),
        type: selectedOption,
      };

      await addDoc(collection(db, 'promotions'), promotion);
      setAlert(null);
      setSelectedOption(null);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <Container>
            <h3>Add promotion</h3>
            <OptionsContainer>
              <Option
                $selected={selectedOption === 'B2G1'}
                $disabled={disabledOptions.includes('B2G1')}
                onClick={() => {
                  setSelectedOption('B2G1');
                  disabledOptions.includes('B2G1')
                    ? setAlert('This option is disabled')
                    : setAlert(null);
                }}
              >
                <span className="B2G1">BUY 2 GET 1</span>
                <span className="B2G1-free">FREE</span>
                <span className="code">Code: B2G1</span>
              </Option>
              <Option
                $selected={selectedOption === 'PROMO20'}
                $disabled={disabledOptions.includes('PROMO20')}
                onClick={() => {
                  setSelectedOption('PROMO20'),
                    disabledOptions.includes('PROMO20')
                      ? setAlert('This option is disabled')
                      : setAlert(null);
                }}
              >
                <span className="percentage">20%</span>
                <span className="code">Code: PROMO20</span>
              </Option>
              <Option
                $selected={selectedOption === 'PROMO30'}
                $disabled={disabledOptions.includes('PROMO30')}
                onClick={() => {
                  setSelectedOption('PROMO30'),
                    disabledOptions.includes('PROMO30')
                      ? setAlert('This option is disabled')
                      : setAlert(null);
                }}
              >
                <span className="percentage">30%</span>
                <span className="code">Code: PROMO30</span>
              </Option>
              <Option
                $selected={selectedOption === 'PROMO40'}
                $disabled={disabledOptions.includes('PROMO40')}
                onClick={() => {
                  setSelectedOption('PROMO40'),
                    disabledOptions.includes('PROMO40')
                      ? setAlert('This option is disabled')
                      : setAlert(null);
                }}
              >
                <span className="percentage">40%</span>
                <span className="code">Code: PROMO40</span>
              </Option>
            </OptionsContainer>
            <h4>Promotion period</h4>

            <DateContainer>
              <div>
                <label htmlFor="start">Start date</label>
                <input
                  type="date"
                  id="start"
                  name="promotion-start"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="end">End date</label>
                <input
                  type="date"
                  id="end"
                  name="promotion-end"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </DateContainer>

            <Footer>
              <div>{alert && <Alert>{alert}</Alert>}</div>

              <div>
                <Button buttonType="textBlack" onClick={onClose}>
                  Cancel
                </Button>
                <Button buttonType="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </Footer>
          </Container>
        </ModalOverlay>
      )}
    </>
  );
};

export default PromotionModal;
