"use client";
import React, { useCallback,  useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  EmailContainer,
  Message,
  Verified,
  SignupContainer,
  EmailInput,
} from "@/app/(anon)/signup/components/signupPage.Styled";
import { CircleCheckBig } from "lucide-react";

import '@/app/components/styles/swal-custom.css';
import { fetchEmailAuth, fetchEmailVerify, fetchSignup } from "@/utils/fetchAuth";
import Button from "@/app/components/button/Button";

interface SignupForm {
  name: string;
  loginId: string;
  password: string;
  confirmPassword: string;
  email: string;
  emailAuthCode: string;
}

const defaultSwalConfig = {
  confirmButtonText: "확인",
  customClass: {
    title: "swal-title-custom",
    popup: "swal-popup-custom",
    confirmButton: "swal-confirm-button",
    icon: "swal-icon-custom",
  },
}

const showAlert = async(
  title: string, 
  icon: "success" | "error" | "info",
  width?: string) => {
    const Swal = (await import('sweetalert2')).default;
    Swal.fire({
      title,
      icon,
      width: width || "auto",
      ...defaultSwalConfig,
    })
  }

const SignupPage: React.FC = React.memo(() => {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    loginId: "",
    password: "",
    confirmPassword: "",
    email: "",
    emailAuthCode: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (form.password !== form.confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const dataToSend = {
      name: form.name,
      loginId: form.loginId,
      password: form.password,
      email: form.email,
      emailAuthCode: form.emailAuthCode,
    };

    try {
      const res = await fetchSignup(dataToSend);
      const data = await res.json();
      
      setMessage(data.message || data.error);
      showAlert("회원가입 성공!", "success");
      
      router.push("/login");

    } catch {
      setMessage("회원가입 중 오류 발생");
      showAlert("회원가입 중 오류 발생", "error");
    }
  }, [form, router]);

  const handleEmailAuth = useCallback(async () => {
    if (!form.email) {
      showAlert("이메일을 입력해주세요.", "info");
      return;
    }
    try {
      const res = await fetchEmailAuth(form.email);

      const data = await res.json();
      if (res.ok) {
        showAlert("인증번호가 이메일로 전송되었습니다!", "success", "90%");
      } else {
        showAlert("이미 가입된 이메일입니다", "error", "90%");
        console.log(data.error || "인증 요청 실패");
      }
    } catch (error) {
      console.error(error);
      showAlert("인증 요청 중 오류 발생", "error", "90%");
    }
  }, [form.email]);

  const handleEmailVerify = useCallback(async () => {
    if (!form.emailAuthCode) {
      showAlert("인증코드를 입력해주세요.", "info");
      return;
    }
    try {
      const res = await fetchEmailVerify(form.email, form.emailAuthCode);
      const data = await res.json();

      if (res.ok) {
        setIsVerified(true);
        showAlert("인증이 완료되었습니다!", "success", "90%");
      } else {
        showAlert("인증 실패", "error", "90%");
        console.log(data.error || "인증 실패");
      }
    } catch (error) {
      console.error("이메일 인증 실패:", error);
      showAlert("이메일 인증 중 오류 발생", "error", "90%");
    }
  }, [form.email, form.emailAuthCode]);

  return (
    <SignupContainer onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="loginId"
          placeholder="ID"
          value={form.loginId}
          onChange={handleChange}
          autoComplete="username"
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
            type="text"
            name="emailAuthCode"
            placeholder="인증번호 입력"
            value={form.emailAuthCode}
            onChange={handleChange}
            autoComplete="one-time-code"
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
          autoComplete="new-password"
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <Button type="submit" disabled={!isVerified}>
          가입하기
        </Button>
        {message && <Message>{message}</Message>}
    </SignupContainer>
  );
});

SignupPage.displayName = "SignupPage";

export default SignupPage;
