"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, LoginContainer } from "@/app/(anon)/login/components/loginPage.Styled";
import Swal, { SweetAlertOptions } from "sweetalert2";
import "@/app/components/styles/swal-custom.css";
import { fetchLogin } from "@/utils/fetchAuth";
import Button from "@/app/components/button/Button";

interface LoginForm {
  loginId: string;
  password: string;
}

const getSwalConfig = (isSuccess: boolean) : SweetAlertOptions =>({
    title: isSuccess? "로그인 성공!" : "로그인 실패",
    icon: isSuccess? "success" : "error",
    confirmButtonText: "확인",
    customClass: {
      title: "swal-title-custom",
      popup: "swal-popup-custom",
      confirmButton: "swal-confirm-button",
      icon: "swal-icon-custom",
    },
})

const Login: React.FC = ()  => {
  const [formData, setFormData] = useState<LoginForm>({ loginId: "", password: ""});
  const { loginId, password } = formData;
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = useCallback(async(e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetchLogin(loginId, password)

    const isSuccess = res.ok;
    Swal.fire(getSwalConfig(isSuccess));

    if (isSuccess) {
      router.push("/"); // 로그인 성공 시 홈으로 이동
    }
  }, [loginId, password, router]);

  return (
    <LoginContainer>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name= "loginId"
            placeholder="아이디"
            value={loginId}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleInputChange}
          />
          <Button type="submit">LOGIN</Button>
        </form>
    </LoginContainer>
  );
};

export default Login;
