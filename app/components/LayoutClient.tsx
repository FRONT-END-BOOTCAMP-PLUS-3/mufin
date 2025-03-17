"use client";
import { useGetHeaderTitle } from "@/utils/getHeaderTitle";
import { usePathname } from "next/navigation";
import {
  ContentContainer,
  RootContainer,
} from "@/app/components/RootContainer.Styled";
import Header from "@/app/components/header/Header";
import Navbar from "./navbar/Navbar";

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const title = useGetHeaderTitle(pathname);
  const isBackType = title !== "";

  const hideNavbarRoutes = [
    "/user/quiz",
    "/user/transfer",
    "/user/tradeaction",
  ];
  const hasNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <RootContainer>
      <Header type={isBackType ? "back" : "default"} title={title} />
      <ContentContainer $hasNavbar={hasNavbar}>{children}</ContentContainer>
      {hasNavbar && <Navbar />}
    </RootContainer>
  );
};

export default LayoutClient;
