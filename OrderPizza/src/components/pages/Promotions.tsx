import styled from 'styled-components';
import pizza1 from './../../assets/pizza-pieces-1.jpg';
import { useState, useEffect } from 'react';
import {
  Timestamp,
  query,
  collection,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { PromotionCard } from './../index';

type Promotion = {
  createdAt: Timestamp;
  startDate: Timestamp;
  endDate: Timestamp;
  type: 'B2G1' | 'PROMO20' | 'PROMO30' | 'PROMO40';
  id: string;
};

const Container = styled.div`
  width: 724px;
  height: 724px;
  margin: 128px 0;
  display: grid;
  row-gap: 24px;
  column-gap: 24px;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'FirstPromotion FirstPromotion FristSquare'
    'SecondSquare  SecondPromotion SecondPromotion'
    'ThirdPromotion ThirdPromotion ThirdSquare';


  @media (min-width: 490px) and (max-width: 864px) {
    width: 475px;
  }

  @media (max-width: 864px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  @media (max-width: 490px) {
    padding: 24px;
    margin: 16px;
    width: 100%;
  }
`;

const FirstPromotion = styled.div`
  grid-area: FirstPromotion;

  div.img {
    width: 100%;
    height: 100%;
    background-image: url(${pizza1});
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    border-radius: 10px;

  }
`;

const SecondPromotion = styled.div`
  grid-area: SecondPromotion;
  border-radius: 10px;
  div.img {
    width: 100%;
    height: 100%;
    background-image: url(${pizza1});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;

  }
`;

const ThirdPromotion = styled.div`
  grid-area: ThirdPromotion;

  div.img {
    width: 100%;
    height: 100%;
    background-image: url(${pizza1});
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
    border-radius: 10px;

  }
`;

const FirstSquare = styled.div`
  grid-area: FristSquare;
  background-color: ${(props) => props.theme.colors.primary[300]};
  border-radius: 10px;

  @media (max-width: 864px) {
    display: none;
  }
`;

const SecondSquare = styled.div`
  grid-area: SecondSquare;
  background-color: ${(props) => props.theme.colors.neutral[700]};
  border-radius: 10px;

  @media (max-width: 864px) {
    display: none;
  }
`;

const ThirdSquare = styled.div`
  grid-area: ThirdSquare;
  background-color: ${(props) => props.theme.colors.neutral[100]};
  border-radius: 10px;

  @media (max-width: 864px) {
    display: none;
  }
`;

const Promotions = () => {
  const [promotions, setPromotions] = useState<Array<Promotion> | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'promotions'), orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const promotions: Array<Promotion> = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          createdAt: data.createdAt,
          startDate: data.startDate,
          endDate: data.endDate,
          type: data.type,
          id: doc.id,
        };
      });

      setPromotions(promotions);
    });

    return () => unsubscribe();
  }, []);


  return (
    <Container>
      <FirstPromotion>
        {promotions && promotions[0] ? (
          <PromotionCard
            type={promotions[0].type}
            startDate={promotions[0].startDate}
            endDate={promotions[0].endDate}
          />
        ) : (
          <div className="img"></div>
        )}
      </FirstPromotion>
      <FirstSquare></FirstSquare>
      <SecondSquare></SecondSquare>
      <SecondPromotion>
        {promotions && promotions[1] ? (
          <PromotionCard
            type={promotions[1].type}
            startDate={promotions[1].startDate}
            endDate={promotions[1].endDate}
          />
        ) : (
          <div className="img"></div>
        )}
      </SecondPromotion>
      <ThirdPromotion>
        {promotions && promotions[2] ? (
          <PromotionCard
            type={promotions[2].type}
            startDate={promotions[2].startDate}
            endDate={promotions[2].endDate}
          />
        ) : (
          <div className="img"></div>
        )}
      </ThirdPromotion>
      <ThirdSquare></ThirdSquare>
    </Container>
  );
};

export default Promotions;
