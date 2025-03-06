import { serialize } from "cookie";

export class LogoutUseCase {
  execute() {
    const removeAccessToken = serialize("accessToken", "", {
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

    return { removeAccessToken, removeRefreshToken };
  }
}
