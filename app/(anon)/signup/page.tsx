"use client";
import { useState } from "react";
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
import Swal from "sweetalert2";
import '@/app/components/styles/swal-custom.css';
import { fetchEmailAuth, fetchEmailVerify, fetchSignup } from "@/utils/fetchAuth";
import Button from "@/app/components/button/Button";

const defaultSwalConfig = {
  confirmButtonText: "확인",
  customClass: {
    title: "swal-title-custom",
    popup: "swal-popup-custom",
    confirmButton: "swal-confirm-button",
    icon: "swal-icon-custom",
  },
}

const showAlert = (
  title: string, 
  icon: "success" | "error" | "info",
  width?: string) => {
    Swal.fire({
      title,
      icon,
      width: width || "auto",
      ...defaultSwalConfig,
    })
  }

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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

      if (res.ok) {
        showAlert("회원가입 성공!", "success");
        router.push("/login");
      }

    } catch {
      setMessage("회원가입 중 오류 발생");
      showAlert("회원가입 중 오류 발생", "error");
    }
  };

  const handleEmailAuth = async () => {
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
  };

  const handleEmailVerify = async () => {
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
  };

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
    </SignupContainer>
  );
};

export default SignupPage;
