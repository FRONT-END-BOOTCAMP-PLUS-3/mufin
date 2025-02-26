import { useRouter } from "next/navigation";
import {
  Container,
  MyBox,
  Button,
  LoginBox,
} from "@/app/(anon)/myinfo/components/loggedOut.Styled";
import Image from "next/image";

const LoggedOut = () => {
  const router = useRouter();

  return (
    <Container>
      <MyBox>
        <Image
          src="/user_profile.png"
          alt="user_profile"
          width={45}
          height={45}
        />
        <span>로그인이 필요합니다</span>
        <div> </div>
      </MyBox>
      <LoginBox>
        <Button onClick={() => router.push("/login")}>로그인</Button>
        <Button onClick={() => router.push("/signup")}>회원가입</Button>
      </LoginBox>
    </Container>
  );
};

export default LoggedOut;
