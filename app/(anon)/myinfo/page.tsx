"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Container,
  MyBox,
  LoginBox,
  Button,
  ModalStyle,
  ButtonStyle,
} from "@/app/(anon)/myinfo/components/page.styled";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modal/Modal";

const MyInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    loginId: string;
  } | null>(null);
  const router = useRouter();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"logout" | "delete" | null>(null);

  useEffect(() => {
    fetch("/api/myinfo", {
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

  // 로그아웃 요청
  const handleLogout = async () => {
    fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    alert("로그아웃 하였습니다!");
    router.push("/");
  };

  // 회원탈퇴 요청
  const handleDeleteId = async () => {
    fetch("/api/myinfo/delete-id", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    alert("회원탈퇴 하였습니다!");
    router.push("/");
  };

  // 모달 열기
  const openModal = (type: "logout" | "delete") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  // 모달 확인 버튼 클릭 시 실행될 함수
  const handleConfirm = () => {
    if (modalType === "logout") {
      handleLogout();
    } else if (modalType === "delete") {
      handleDeleteId();
    }
    closeModal();
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
          <Button onClick={() => openModal("logout")}>로그아웃</Button>
          <Button onClick={() => openModal("delete")}>회원탈퇴</Button>
        </LoginBox>
      ) : (
        <LoginBox>
          <Button onClick={() => router.push("/login")}>로그인</Button>
          <Button onClick={() => router.push("/signup")}>회원가입</Button>
        </LoginBox>
      )}
      <ModalStyle>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <p>
            {modalType === "logout"
              ? "로그아웃 하시겠습니까?"
              : "정말로 회원탈퇴 하시겠습니까?"}
          </p>
          <ButtonStyle>
            <Button onClick={handleConfirm}>확인</Button>
            <Button onClick={closeModal}>취소</Button>
          </ButtonStyle>
        </Modal>
      </ModalStyle>
    </Container>
  );
};

export default MyInfo;
