import styled from 'styled-components';
import { generateDate } from '../../utils/convertTime';
import { Timestamp } from 'firebase/firestore';
import userSmall from './../../assets/user-small.svg';
import uncheckedStar from './../../assets/star-unchecked.svg';
import checkedStar from './../../assets/star-checked.svg';

type ComponentProps = {
  firstName: string;
  stars: number | null;
  feedback: string;
  date: Timestamp;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    column-gap: 4px;
  }
`;

const FeedbackText = styled.div`
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.neutral[200]};
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  div.stars-container {
    display: flex;
  }
`;

const Star = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${uncheckedStar});

  &.active {
    background-image: url(${checkedStar});
  }
`;

const ratings = [1, 2, 3, 4, 5];

const Feedback = ({ firstName, stars, feedback, date }: ComponentProps) => {
  return (
    <Container>
      <Header>
        <div>
          <img src={userSmall} alt="" />
          <p>{firstName}</p>
        </div>
        <p>{generateDate(date?.toDate())}</p>
      </Header>
      <FeedbackText>
        <div className="stars-container">
          {ratings.map((e) => (
            <Star key={e} className={e <= (stars ?? 0) ? 'active' : ''} />
          ))}
        </div>
        <p>{feedback}</p>
      </FeedbackText>
    </Container>
  );
};

export default Feedback;
