"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Container,
  MyBox,
  LoginBox,
  Button,
} from "@/app/(anon)/myinfo/components/page.Styled";
import { useRouter } from "next/navigation";

const MyInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    loginId: string;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserData(null);
      });
  }, []);

  const handleLogout = async () => {
    fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    alert("로그아웃 하였습니다!");
    router.push("/");
  };

  const handleDeleteId = async () => {
    fetch("api/delete-id", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    alert("회원탈퇴 하였습니다!");
    router.push("/");
  };

  return (
    <Container>
      <MyBox>
        <Image
          src="/user_profile.png"
          alt="user_profile"
          width={45}
          height={45}
        />
        {isLoggedIn ? (
          <>
            <div>{userData?.name}님</div>
            <div style={{ paddingRight: "45px" }}></div>
          </>
        ) : (
          <span>로그인이 필요합니다</span>
        )}
      </MyBox>
      {isLoggedIn ? (
        <LoginBox>
          <Button onClick={handleLogout}>로그아웃</Button>
          <Button onClick={handleDeleteId}>회원탈퇴</Button>
        </LoginBox>
      ) : (
        <LoginBox>
          <Button onClick={() => router.push("/login")}>로그인</Button>
          <Button onClick={() => router.push("/signup")}>회원가입</Button>
        </LoginBox>
      )}
    </Container>
  );
};

export default MyInfo;
