import { serialize } from "cookie";

export async function POST() {
  const removeAccessToken = serialize("token", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  const removeRefreshToken = serialize("refreshToken", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  const headers = new Headers();
  headers.append("Set-Cookie", `${removeAccessToken}, ${removeRefreshToken}`);
  headers.set("Content-Type", "application/json");

  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers,
  });
}
