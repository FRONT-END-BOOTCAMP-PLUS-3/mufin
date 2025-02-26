"use client";

import {
  NavbarContainer,
  NavbarItem,
} from "@/app/components/navbar/Navbar.Styled";
import { ChartCandlestick, CircleUserRound, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    {
      name: "stock",
      icon: <ChartCandlestick />,
      path: "/",
      text: "모의투자",
    },
    {
      name: "asset",
      icon: <Wallet />,
      path: "/user/asset",
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
