"use client"
import { useGetHeaderTitle } from "@/utils/getHeaderTitle";
import { usePathname } from "next/navigation";
import { ContentContainer, RootContainer } from "@/app/components/RootContainer.Styled";
import Header from "@/app/components/header/Header";
import Navbar from "./navbar/Navbar";

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const title = useGetHeaderTitle(pathname);
  const isBackType = title !== "";

  return (
    <RootContainer>
      <Header type={isBackType ? "back" : "default"} title={title} />
      <ContentContainer>{children}</ContentContainer>
      <Navbar/>
    </RootContainer>
  );
};
export default LayoutClient;
