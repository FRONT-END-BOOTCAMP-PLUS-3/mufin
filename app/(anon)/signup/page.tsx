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
import Swal from "sweetalert2";
import '@/app/components/styles/swal-custom.css';

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

    // const { confirmPassword, ...dataToSend } = form;

    const dataToSend = {
      name: form.name,
      loginId: form.loginId,
      password: form.password,
      email: form.email,
      emailAuthCode: form.emailAuthCode,
    };

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    if (data.message) {
      Swal.fire({
        title: "회원가입 성공!",
        icon: "success",
        confirmButtonText: "확인",
        customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            }
      });
      router.push("/login");
    }
  };

  const handleEmailAuth = async () => {
    if (!form.email) {
      Swal.fire({
        title: "이메일을 입력해주세요.",
        icon: "info",
        confirmButtonText: "확인",
        customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            }
      });
      return;
    }
    try {
      const res = await fetch("/api/signup/email-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "인증번호가 이메일로 전송되었습니다!",
          icon: "success",
          confirmButtonText: "확인",
          customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            },
          width: '90%'
        });
      } else {
        Swal.fire({
          title: "이미 가입된 이메일입니다",
          icon: "error",
          confirmButtonText: "확인",
          customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            },
          width: '90%'
        });
        console.log(data.error || "인증 요청 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailVerify = async () => {
    if (!form.emailAuthCode) {
      Swal.fire({
        title: "인증코드를 입력해주세요.",
        icon: "info",
        confirmButtonText: "확인",
        customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            }
      });
      return;
    }
    try {
      const res = await fetch("/api/signup/email-verify", {
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
        Swal.fire({
          title: "인증이 완료되었습니다!",
          icon: "success",
          confirmButtonText: "확인",
          customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            },
          width: '90%'
        });
      } else {
        Swal.fire({
          title: "인증 실패",
          icon: "error",
          confirmButtonText: "확인",
          customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            },
          width: '90%'
        });
        console.log(data.error || "인증 실패");
      }
    } catch (error) {
      console.error("이메일 인증 실패:", error);
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
