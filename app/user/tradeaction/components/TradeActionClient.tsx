// app/user/tradeaction/components/TradeActionClient.tsx
"use client";

import { useState } from "react";
import { OrderForm } from "@/app/user/tradeaction/components/OrderFrom";
import { OrderSummary } from "@/app/user/tradeaction/components/Ordersummary";

type TradeActionClientProps = {
  symbol: string;
  initialPrice: number;
};

const TradeActionClient = ({ symbol, initialPrice }: TradeActionClientProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <h3>Trade {symbol}</h3>
      <OrderForm quantity={quantity} setQuantity={setQuantity} price={initialPrice} />
      <OrderSummary quantity={quantity} price={initialPrice} />
    </div>
  );
};

export default TradeActionClient;
