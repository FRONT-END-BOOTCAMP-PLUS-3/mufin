import { TransferDto } from "@/application/usecases/transfer/dtos/TransferDto";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";

export class TransferUseCase {
  private walletRepository: IWalletRepository;

  constructor(walletRepository: IWalletRepository) {
    this.walletRepository = walletRepository;
  }

  public async transferFunds(transferDto: TransferDto) {

    const { userId, amount, type } = transferDto;

    if (amount <= 0) {
      throw new Error("이체 금액은 0보다 커야 합니다.");
    }

    const wallet = await this.walletRepository.findWalletByUserId(userId);
    if (!wallet) {
      throw new Error("지갑 정보를 찾을 수 없습니다.");
    }

    if (type === "toCash") {
      wallet.cash = wallet.cash ?? BigInt(0); 
      wallet.account = wallet.account ?? BigInt(0); 
      wallet.cash += BigInt(amount);
      wallet.account -= BigInt(amount);

    } else if (type === "toAccount") {
      wallet.cash = wallet.cash ?? BigInt(0); 
      wallet.account = wallet.account ?? BigInt(0); 
      wallet.cash -= BigInt(amount);
      wallet.account += BigInt(amount);
    }

    await this.walletRepository.updateCashAccountWalletByUserId(userId, Number(wallet.cash), Number(wallet.account));
    return { message: "이체가 성공적으로 완료되었습니다." };
  }
  public async getWallet(userId: string) {
    const wallet = await this.walletRepository.findWalletByUserId(userId);
    if (!wallet) {
      throw new Error("해당 사용자의 지갑 정보를 찾을 수 없습니다.");
    }
    return {
      cash: wallet.cash ? wallet.cash.toString() : "0",
      account: wallet.account ? wallet.account.toString() : "0",
    };
  }
}

