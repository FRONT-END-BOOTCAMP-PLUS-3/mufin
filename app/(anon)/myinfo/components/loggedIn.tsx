import {
  Container,
  Button,
} from "@/app/(anon)/myinfo/components/loggedIn.Styled";
const LoggedIn = ({
  userData,
}: {
  userData: { name: string; email: string } | null;
}) => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return (
    <Container>
      <h2>안녕하세요, {userData?.name}님!</h2>
      <p>이메일: {userData?.email}</p>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Container>
  );
};

export default LoggedIn;
