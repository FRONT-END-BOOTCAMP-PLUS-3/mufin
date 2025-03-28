import * as S from "@/app/(anon)/stock/[symbol]/components/StockTabMenu.Styled";

export interface TabItem {
  key: string;
  label: string;
}

export interface TabMenuProps {
  tabs: TabItem[];
  activeTab: string;
  onTabClick: (key: string) => void;
}

const StockTabMenu: React.FC<TabMenuProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <>
      <S.TabMenuWrapper>
        {tabs.map((tab) => {
          return (
            <S.TabItemWrapper
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => onTabClick(tab.key)}
            >
              {tab.label}
            </S.TabItemWrapper>
          );
        })}
      </S.TabMenuWrapper>
    </>
  );
};
export default StockTabMenu;
