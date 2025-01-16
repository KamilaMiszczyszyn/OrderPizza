import styled, { css } from 'styled-components';

interface ButtonTypes {
  buttonType:
    | 'primaryLarge'
    | 'primary'
    | 'secondary'
    | 'textWhite'
    | 'textBlack'
    | 'icon'
    | 'disabled';
}

interface ComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonType: ButtonTypes['buttonType'];
  iconLeft?: string;
  iconRight?: string;
}

const StyledButton = styled.button<{ $buttonType: ButtonTypes['buttonType'] }>`
  border-radius: 10px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  column-gap: 8px;
  width: auto;
  align-self: center;
  align-items: center;

  ${(props) =>
    props.$buttonType === 'primaryLarge' &&
    css`
      padding: 16px 32px;
      color: ${(props) => props.theme.colors.neutral[50]};
      background-color: ${(props) => props.theme.colors.primary[500]};

      &:hover {
        background-color: ${(props) => props.theme.colors.primary[300]};
      }

      &:active {
        background-color: ${(props) => props.theme.colors.primary[700]};
      }
    `}

  ${(props) =>
    props.$buttonType === 'primary' &&
    css`
      color: ${(props) => props.theme.colors.neutral[50]};
      background-color: ${(props) => props.theme.colors.primary[500]};

      &:hover {
        background-color: ${(props) => props.theme.colors.primary[300]};
      }

      &:active {
        background-color: ${(props) => props.theme.colors.primary[700]};
      }
    `}


    ${(props) =>
    props.$buttonType === 'secondary' &&
    css`
      color: ${(props) => props.theme.colors.neutral[50]};
      background-color: ${(props) => props.theme.colors.neutral[900]};

      &:hover {
        background-color: ${(props) => props.theme.colors.neutral[800]};
      }

      &:active {
        background-color: ${(props) => props.theme.colors.neutral[700]};
      }
    `}


    ${(props) =>
    props.$buttonType === 'textBlack' &&
    css`
      color: ${(props) => props.theme.colors.neutral[900]};
      background-color: transparent;

      &:hover {
        background-color: ${(props) => props.theme.colors.neutral[50]};
      }

      &:active {
        background-color: ${(props) => props.theme.colors.neutral[100]};
      }
    `}


    ${(props) =>
    props.$buttonType === 'textWhite' &&
    css`
      background-color: transparent;
      color: ${(props) => props.theme.colors.neutral[50]};

      &:hover {
        background-color: ${(props) => props.theme.colors.neutral[800]};
      }

      &:active {
        background-color: ${(props) => props.theme.colors.neutral[700]};
      }
    `}


    ${(props) =>
    props.$buttonType === 'icon' &&
    css`
      border-radius: 150%;
      color: ${(props) => props.theme.colors.neutral[50]};
      background-color: ${(props) => props.theme.colors.neutral[900]};
      width: 24px;
      height: 24px;
      padding: 4px;

      &:hover {
        background-color: ${(props) => props.theme.colors.neutral[800]};
      }

      &:active {
        background-color: ${(props) => props.theme.colors.neutral[700]};
      }
    `}

    ${(props) =>
    props.$buttonType === 'disabled' &&
    css`
      color: ${(props) => props.theme.colors.neutral[500]};
      background-color: ${(props) => props.theme.colors.neutral[200]};

      &:hover {
        background-color: ${(props) => props.theme.colors.neutral[100]};
      }
    `}
`;

const Button = ({
  children,
  buttonType,
  iconLeft,
  iconRight,
  ...props
}: ComponentProps) => {
  return (
    <StyledButton $buttonType={buttonType} {...props}>
      {iconLeft && <img src={iconLeft} alt="" />}
      {children}
      {iconRight && <img src={iconRight} alt="" />}
    </StyledButton>
  );
};

export default Button;
