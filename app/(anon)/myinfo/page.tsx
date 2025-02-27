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
    fetch("/api/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return isLoggedIn ? <LoggedIn userData={userData} /> : <LoggedOut />;
};

export default MyInfo;
