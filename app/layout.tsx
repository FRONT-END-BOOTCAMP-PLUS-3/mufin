import "@/styles/globals.css";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import LayoutClient from "@/app/components/LayoutClient";
import Navbar from "@/app/components/Navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <LayoutClient> {children} </LayoutClient>
        </StyledComponentsRegistry>
        <Navbar />
      </body>
    </html>
  );
}
