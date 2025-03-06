import { OptionButton } from "@/app/user/quiz/components/Quiz.Styled";
import { Choice } from "@/app/user/quiz/components/Quiz";

interface OptionButtonsProps {
  choices: Choice[];
  setSelectedOption: (option: number) => void;
  selectedOption: number | null;
}

const OptionButtons: React.FC<OptionButtonsProps> = ({
  choices,
  selectedOption,
  setSelectedOption,
}: OptionButtonsProps) => {
  return (
    <>
      {choices.map((choice) => (
        <OptionButton
          key={choice.choiceId}
          onClick={() => setSelectedOption(choice.choiceNumber)}
          $isActive={selectedOption === choice.choiceNumber} // ✅ 선택된 버튼 여부 전달
          type="button"
        >
          {choice.choiceText}
        </OptionButton>
      ))}
    </>
  );
};
export default OptionButtons;
