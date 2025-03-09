import { DropdownContainer, DropdownItem, DropdownList, SelectedValue } from "@/app/user/stockhistory/components/StockHistory.Styled";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CustomDropdownProps {
    availableMonths: string[]; 
    selectedMonth: string;
    setSelectedMonth: (month: string) => void;
  }
  
  const CustomDropdown: React.FC<CustomDropdownProps> = ({ availableMonths, selectedMonth, setSelectedMonth }) => {
    const [isOpen, setIsOpen] = useState(false);
  

  return (
    <DropdownContainer>
      <SelectedValue onClick={() => setIsOpen(!isOpen)}>
        {selectedMonth === "ALL" ? "전체 기간" : `${selectedMonth.split(".")[0]}년 ${selectedMonth.split(".")[1]}월`}
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </SelectedValue>
      {isOpen && (
        <DropdownList>
          <DropdownItem onClick={() => { setSelectedMonth("ALL"); setIsOpen(false); }}>
            전체 기간
          </DropdownItem>
          {availableMonths.map((month) => (
            <DropdownItem key={month} onClick={() => { setSelectedMonth(month); setIsOpen(false); }}>
              {`${month.split(".")[0]}년 ${month.split(".")[1]}월`}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default CustomDropdown;
