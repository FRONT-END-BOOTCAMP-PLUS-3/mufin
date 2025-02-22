"use client";

import "@/styles/globals.css";
import Header from "@/app/components/Header";
import { usePathname } from "next/navigation";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import { useGetHeaderTitle } from "@/utils/getHeaderTitle";
import {
  ContentContainer,
  RootContainer,
} from "./components/RootContainerStyled";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const title = useGetHeaderTitle(pathname);

  const isBackType = title !== "";

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <RootContainer>
            <Header type={isBackType ? "back" : "default"} title={title} />
            <ContentContainer>{children}</ContentContainer>
          </RootContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
