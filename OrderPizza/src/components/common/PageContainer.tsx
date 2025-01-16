import styled from 'styled-components';
import { PageHeader } from './../index';

interface ComponentProps {
  small?: boolean;
  title?: string;
  children: React.ReactNode;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  width: 100%;
`;
const PageContainer = ({ title, small, children }: ComponentProps) => {
  return (
    <Container>
      <PageHeader small={small}>{title}</PageHeader>
      <div>{children}</div>
    </Container>
  );
};

export default PageContainer;
