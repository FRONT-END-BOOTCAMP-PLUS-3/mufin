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
        {/* <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5865f2" /> */}
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
