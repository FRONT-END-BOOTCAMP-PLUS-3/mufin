import { NextResponse } from "next/server";
import { GetUserInfoUseCase } from "@/application/usecases/user/GetUserInfoUseCase";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { getDecodedUserId } from "@/utils/getDecodedUserId";

export async function GET() {
  try {
    const userId = await getDecodedUserId();

    if(!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userRepository = new UserRepository();
    const getUserInfoUseCase = new GetUserInfoUseCase(userRepository);

    const user = await getUserInfoUseCase.execute(userId);

    if(!user)
      return NextResponse.json({ message: "User not found" }, { status: 401 });

    return NextResponse.json(user, { status: 200 });


  } catch (error) {
    console.error("User fetch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Server error";
    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
