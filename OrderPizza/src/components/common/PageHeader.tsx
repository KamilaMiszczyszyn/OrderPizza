import styled from 'styled-components';

type ComponentProps = {
  children: React.ReactNode;
  small?: boolean;
};

const H2 = styled.h2<{ $small?: boolean }>`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral[900]};
  padding: 16px;

  font-size: ${(props) =>
    props.$small
      ? props.theme.typography.fontSize['xl']
      : props.theme.typography.fontSize['default']};
`;

const PageHeader = ({ children, small }: ComponentProps) => {
  return <H2 $small={small}>{children}</H2>;
};

export default PageHeader;
