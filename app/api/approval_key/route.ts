import { NextResponse } from "next/server";
import { env } from "@/config/env";

let approvalKey: string | null = null; // Approval Key 저장

export async function POST() {
  try {

    const url = `${env.KIS_API_URL}/oauth2/Approval`;

    const body = {
      grant_type: "client_credentials",
      appkey: env.KIS_APP_KEY,
      secretkey: env.KIS_APP_SECRET,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; utf-8",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `[KIS API] Approval Key 요청 실패 (HTTP Status: ${response.status})`
      );
    }

    const data = await response.json();
    approvalKey = data.approval_key; // Approval Key 저장

    if (!approvalKey) {
      throw new Error(
        "[KIS API] WebSocket 접속키 발급 실패: 응답에 approval_key 없음"
      );
    }
    const res = NextResponse.json({approvalKey}, {status: 200});
    
    res.cookies.set("approval_key", approvalKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:"strict",
      path: "/",
      maxAge: 60 * 60, // 1시간
    });

    return res;

  } catch (error) {
    console.error("[KIS API] Approval Key 요청 실패:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },{ status: 500 }
    );
  }
}
