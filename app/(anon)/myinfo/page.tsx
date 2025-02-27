"use client";

import LoggedOut from "@/app/(anon)/myinfo/components/loggedOut";
import LoggedIn from "@/app/(anon)/myinfo/components/loggedIn";
import { useEffect, useState } from "react";

const MyInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    userId: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoggedIn(true);
          setUserData(data);
        })
        .catch(() => setIsLoggedIn(false));
    }
  }, []);
  return isLoggedIn ? <LoggedIn userData={userData} /> : <LoggedOut />;
};

export default MyInfo;
