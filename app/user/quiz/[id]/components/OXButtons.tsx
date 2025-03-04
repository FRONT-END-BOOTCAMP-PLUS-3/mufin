import { OXSelectButton } from "@/app/user/quiz/[id]/components/Quiz.Styled";
import { Circle, X } from "lucide-react";
import { Choice } from "./mockData";

interface OXButtonsProps {
  choices: Choice[];
  selectedOption: number;
  setSelectedOption: (option: number) => void;
}
const OXButtons: React.FC<OXButtonsProps> = ({ choices, selectedOption, setSelectedOption }: OXButtonsProps) => {
  console.log("curent",choices);
  
  return (
    
    <>
      {choices.map((choice) => (
        <OXSelectButton 
          key={choice.choiceId} type="button"
          $isActive={selectedOption === choice.choiceNumber}
          onClick={() => setSelectedOption(choice.choiceNumber)}
        >
          {choice.choiceText.toLowerCase() === "o" ? (
            <Circle
              color={ selectedOption === choice.choiceNumber ? "var(--white-color)" : "var(--primary-color)" }
              strokeWidth={4}
              size={60}
            />
          ) : (
            <X 
              color={ selectedOption === choice.choiceNumber? "var(--white-color)" : "var(--second-color)" }
              strokeWidth={4}
              size={68}
            />
          )}
        </OXSelectButton>
      ))}
    </>

  );
};
export default OXButtons;
