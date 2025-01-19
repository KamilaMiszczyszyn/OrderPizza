import styled from 'styled-components';
import { SectionHeader } from './../index';

interface ComponentProps {
  title?: string;
  children?: React.ReactNode;
}

const Container = styled.section`
  padding: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  @media (max-width: 490px) {
    padding: 8px 0;
  }
`;

const SectionContainer = ({ title, children }: ComponentProps) => {
  return (
    <Container>
      {title && <SectionHeader>{title}</SectionHeader>}
      {children}
    </Container>
  );
};

export default SectionContainer;
