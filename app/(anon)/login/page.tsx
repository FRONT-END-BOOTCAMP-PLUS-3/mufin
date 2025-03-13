"use client";

import {
  Button,
  Input,
  LoginBox,
  LoginContainer,
} from "@/app/(anon)/login/components/loginPage.Styled";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import "@/app/components/styles/swal-custom.css";

const Login = () => {
  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginId, password }),
    });
    const data = await res.json();
    if (res.ok) {
      Swal.fire({
        title: "로그인 성공!",
        icon: "success",
        confirmButtonText: "확인",
        customClass: {
          title: "swal-title-custom",
          popup: "swal-popup-custom",
          confirmButton: "swal-confirm-button",
          icon: "swal-icon-custom",
        },
      });
      router.push("/");
    } else {
      Swal.fire({
        title: "로그인 실패",
        icon: "error",
        confirmButtonText: "확인",
        customClass: {
          title: "swal-title-custom",
          popup: "swal-popup-custom",
          confirmButton: "swal-confirm-button",
          icon: "swal-icon-custom",
        },
      });
      console.log(data.message || "로그인 실패");
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
            value={loginId}
            onChange={(e) => setloginId(e.target.value)}
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
