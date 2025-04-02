import { ButtonHTMLAttributes } from "react";
import { StyledBaseButtonProps, StyledButton } from "@/app/components/button/Button.Styled";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    StyledBaseButtonProps {
  /** 추가로 입힐 수 있는 인라인 스타일 */
}

const Button: React.FC<ButtonProps> = ({
    $size = "lg",
    $color,
    children,
    ...rest
  }) => {
    return (
      <StyledButton $size={$size} $color={$color} {...rest}>
        {children}
      </StyledButton>
    );
  };

Button.displayName = "Button";

export default Button;
