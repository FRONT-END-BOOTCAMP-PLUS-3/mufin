"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  EmailContainer,
  Message,
  Verified,
  SignupContainer,
  EmailInput,
} from "@/app/(anon)/signup/components/signupPage.Styled";
import { CircleCheckBig } from "lucide-react";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    loginId: "",
    password: "",
    confirmPassword: "",
    email: "",
    emailAuthCode: "",
  });
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
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
      const res = await fetch("/api/signup/email_auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("인증번호가 이메일로 전송되었습니다!");
      } else {
        alert(`${data.error || "인증 요청 실패"}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleEmailVerify = async () => {
    if (!form.emailAuthCode) {
      alert("인증코드를 입력해주세요.");
      return;
    }
    try {
      const res = await fetch("/api/signup/email_verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          authCode: form.emailAuthCode,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsVerified(true);
        alert("인증이 완료되었습니다!");
      } else {
        alert(`${data.error || "인증 실패"}`);
      }
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      alert("이메일 인증 중 오류가 발생했습니다.");
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
        />
        <Input
          type="loginId"
          name="loginId"
          placeholder="ID"
          value={form.loginId}
          onChange={handleChange}
        />
        <EmailContainer>
          <EmailInput
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
          />
          <button type="button" onClick={handleEmailAuth}>
            인증번호 받기
          </button>
        </EmailContainer>
        <EmailContainer>
          <EmailInput
            type="emailAuthCode"
            name="emailAuthCode"
            placeholder="인증번호 입력"
            value={form.emailAuthCode}
            onChange={handleChange}
          />
          {isVerified ? (
            <Verified>
              <CircleCheckBig />
            </Verified>
          ) : (
            <button type="button" onClick={handleEmailVerify}>
              인증번호 확인
            </button>
          )}
        </EmailContainer>
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" disabled={!isVerified}>
          가입하기
        </Button>
        {message && <Message>{message}</Message>}
      </Form>
    </SignupContainer>
  );
};

export default SignupPage;
