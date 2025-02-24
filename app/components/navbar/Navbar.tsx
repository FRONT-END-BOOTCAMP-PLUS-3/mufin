"use client";

import { ChartCandlestick, House, Wallet, CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  NavbarContainer,
  NavbarItem,
} from "@/app/components/navbar/Navbar.Styled";

const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    { name: "home", icon: <House />, path: "/", text: "홈" },
    {
      name: "charts",
      icon: <ChartCandlestick />,
      path: "/user/charts",
      text: "모의투자",
    },
    {
      name: "wallet",
      icon: <Wallet />,
      path: "/user/wallet",
      text: "보유자산",
    },
    {
      name: "myinfo",
      icon: <CircleUserRound />,
      path: "/user/myinfo",
      text: "내 정보",
    },
  ];

  return (
    <NavbarContainer>
      {navItems.map((item) => {
        const isActive: boolean = pathname === item.path;
        return (
          <NavbarItem key={item.name} $isActive={isActive}>
            <a className={isActive ? "active" : ""} href={item.path}>
              {item.icon}
              {item.text}
            </a>
          </NavbarItem>
        );
      })}
    </NavbarContainer>
  );
};

export default Navbar;
