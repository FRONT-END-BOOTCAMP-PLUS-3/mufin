"use client";

import {
  Button,
  Input,
  LoginBox,
  LoginContainer,
} from "@/app/(anon)/login/components/loginPage.Styled";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("로그인 성공!");
      router.push("/");
    } else {
      alert(data.message || "로그인 실패");
    }
  };
  return (
    <LoginContainer>
      <LoginBox>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">LOGIN</Button>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
