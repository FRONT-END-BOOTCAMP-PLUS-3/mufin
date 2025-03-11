import "@/styles/globals.css";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import LayoutClient from "@/app/components/LayoutClient";
import { Suspense } from "react";
import LoadingScreen from "@/app/(anon)/stock/[symbol]/components/LodingScreen";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Suspense fallback={<LoadingScreen />}>
            <LayoutClient> {children} </LayoutClient>
          </Suspense>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
