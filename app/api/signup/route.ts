import { NextResponse } from "next/server";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { SignUpUseCase } from "@/application/usecases/user/SignUpUseCase";

export async function POST(req: Request) {
  try {
    const { name, loginId, password, email } = await req.json();
    const userRepository = new UserRepository();
    const walletRepository = new PgWalletRepository();
    const signupUseCase = new SignUpUseCase(userRepository, walletRepository);

    const { message, user } = await signupUseCase.execute({
      name,
      loginId,
      email,
      password,
    });

    return new NextResponse(JSON.stringify({ message, user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Signup error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Server error";
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
