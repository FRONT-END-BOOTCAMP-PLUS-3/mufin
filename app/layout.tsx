import "@/styles/globals.css";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import LayoutClient from "@/app/components/LayoutClient";
import { Suspense } from "react";
import LoadingPage from "@/app/components/home/LoadingPage";

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};  // console.log() 숨기기
  console.error = () => {};  // console.error() 숨기기
  console.warn = () => {};   // console.warn() 숨기기
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="계좌 개설 없이 쉽게 배울 수 있는 주식 공부 어플로, 누구나 쉽게 주식 시장을 이해하고 학습할 수 있습니다." />
        <meta name="keywords" content="주식 공부, 주식, 투자, 주식 시장, 초보자, 주식 교육" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:type" content="website"/>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="주식 투자 플랫폼" />
        <meta property="og:description" content="계좌 개설 없이 쉽게 배울 수 있는 주식 공부 어플로, 누구나 쉽게 주식 시장을 이해하고 학습할 수 있습니다." />
        <meta property="og:url" content="https://mufin.newlecture.com" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="주식 투자 플랫폼" />
        <meta name="twitter:description" content="계좌 개설 없이 쉽게 배울 수 있는 주식 공부 어플로, 누구나 쉽게 주식 시장을 이해하고 학습할 수 있습니다." />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href="https://mufin.newlecture.com"></link>
        <title>주식 투자 플랫폼</title>
        
      </head>
      <body>
        <StyledComponentsRegistry>
          <Suspense fallback={<LoadingPage />}>
            <LayoutClient> {children} </LayoutClient>
          </Suspense>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
