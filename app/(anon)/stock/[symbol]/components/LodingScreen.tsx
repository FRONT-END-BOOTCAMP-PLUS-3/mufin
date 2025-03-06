import { ScreenSection } from "@/app/(anon)/stock/[symbol]/components/StockDetail.Styled";
import { SyncLoader } from "react-spinners";

const LoadingScreen = () => (
    <ScreenSection>
      <p>차트 데이터를 불러오는 중입니다</p>
      <SyncLoader color="#5865f2" margin={10} />
    </ScreenSection>
  );
  
  export default LoadingScreen;