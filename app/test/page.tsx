"use client";

import Button from "@/app/components/button/Button";
import { useRouter } from "next/navigation";

const TestPage = () => {
  const router = useRouter();

  const handleNavigate = (type: "toCash" | "toAccount") => {
    router.push(`/user/transfer?type=${type}`);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button onClick={() => handleNavigate("toAccount")}>투자 → 계좌</Button>
      <Button onClick={() => handleNavigate("toCash")}>계좌 → 투자</Button>
    </div>
  );
};

export default TestPage;
