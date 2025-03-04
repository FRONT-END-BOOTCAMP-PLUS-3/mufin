import { ButtonHTMLAttributes } from "react";
import { StyledBaseButtonProps, StyledButton } from "@/app/user/quiz/components/BaseButton.Styled";

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    StyledBaseButtonProps {
  /** 추가로 입힐 수 있는 인라인 스타일 */
}

const BaseButton: React.FC<BaseButtonProps> = ({
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

BaseButton.displayName = "BaseButton";

export default BaseButton;
