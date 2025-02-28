import { serialize } from "cookie";

export async function POST() {
  // "token" 쿠키를 빈 값으로 설정하고 즉시 만료
  const cookieOptions = serialize("token", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "strict",
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookieOptions,
      "Content-Type": "application/json",
    },
  });
}
