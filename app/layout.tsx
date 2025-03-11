import "@/styles/globals.css";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import LayoutClient from "@/app/components/LayoutClient";
import { Suspense } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5865f2" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Suspense fallback={<div>Loading...</div>}>
            <LayoutClient> {children} </LayoutClient>
          </Suspense>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
