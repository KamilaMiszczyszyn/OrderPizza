import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './../index';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 24px;
`;

const Header = styled.h1`
  font-size: 6rem;
  margin: 0;
  color: ${(props) => props.theme.colors.primary[500]};
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>404</Header>
      <Text>Page Not Found</Text>
      <Button buttonType="primary" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
