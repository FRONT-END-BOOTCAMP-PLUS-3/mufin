"use client";
import { useRouter } from "next/navigation";
import { BackButtonBox, HeaderContainer, HeaderLogo, HeaderWrapper } from "./Header.Styled";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
    type: "default" | "back";
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ type, title }) => {
    const router = useRouter();

    return (
        <HeaderContainer>
            <HeaderWrapper>
                {type === "default" ? (
                    <HeaderLogo
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        <Image src="/Logo.svg" alt="Logo" width={145} height={100} />
                    </HeaderLogo>
                ) : (
                    <>
                        <BackButtonBox onClick={() => router.back()}>
                            <ChevronLeft size={30} />
                        </BackButtonBox>
                        <h6>{title}</h6>
                    </>
                )}
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default Header;
