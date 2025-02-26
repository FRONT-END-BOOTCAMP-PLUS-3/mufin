"use client"
import { Tab, TabsContainer } from "@/app/user/tradeaction/Trandeaction.Styled";
import React, { useState } from "react";

export const BuySellTabs = () => {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <TabsContainer>
      <Tab $active={activeTab === "buy"} onClick={() => setActiveTab("buy")}>
        구매
      </Tab>
      <Tab $active={activeTab === "sell"} onClick={() => setActiveTab("sell")}>
        판매
      </Tab>
    </TabsContainer>
  );
};
