"use client";

import { ScreenSection } from "@/app/components/home/Loding.Styled";
import { SyncLoader } from "react-spinners";

const LoadingPage = () => (
    <ScreenSection>
      <p>잠시만 기다려주세요</p>
      <SyncLoader color="#5865f2" margin={10} />
    </ScreenSection>
  );
  
  export default LoadingPage;