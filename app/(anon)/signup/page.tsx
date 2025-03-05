"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  EmailContainer,
  Message,
  SignupContainer,
} from "@/app/(anon)/signup/components/signupPage.Styled";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    loginId: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (form.password !== form.confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // confirmPassword 필드는 서버로 보내지 않음
    const { confirmPassword, ...dataToSend } = form;

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    if (data.message) {
      alert("회원가입 성공!");
      router.push("/login");
    }
  };

  const handleEmailAuth = async () => {
    if (!form.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const res = await fetch("/api/signup/emailAuth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("인증번호가 이메일로 전송되었습니다!");
      } else {
        alert(`오류: ${data.error || "인증 요청 실패"}`);
      }
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      alert("이메일 인증 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <SignupContainer>
      <Form onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          type="loginId"
          name="loginId"
          placeholder="ID"
          value={form.loginId}
          onChange={handleChange}
          required
        />
        <EmailContainer>
          <Input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <button onClick={handleEmailAuth}>인증번호 받기</button>
        </EmailContainer>
        <Input
          type="emailAuth"
          name="emailAuth"
          placeholder="인증번호 입력"
          //value={form.emailAuth}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit">가입하기</Button>
        {message && <Message>{message}</Message>}
      </Form>
    </SignupContainer>
  );
};

export default SignupPage;
