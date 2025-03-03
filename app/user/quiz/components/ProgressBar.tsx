import React from "react";
import * as S from "./ProgressBar.Styled";

interface ProgressBarProps {
  current: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({current}) => {
  const maxItem = 5;
  const progressWidth = (current * 100) / maxItem; // ✅ 계산식 변경
  

  return (
    <S.ProgressBarContainer>
      <S.Progress $width={progressWidth} />
    </S.ProgressBarContainer>
  );
};

export default ProgressBar;