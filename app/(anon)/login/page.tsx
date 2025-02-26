"use client";

import {
  LoginContainer,
  LoginBox,
  Input,
  Button,
} from "@/app/(anon)/login/components/loginPage.Styled";

const Login = () => {
  return (
    <LoginContainer>
      <LoginBox>
        <h1>로그인</h1>
        <form>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit">LOGIN</Button>
        </form>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
