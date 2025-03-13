export interface UserAssetDTO {
    // 나의 투자목표: Wallet의 target 필드
    goalAmount: number;
    // 증권계좌 자산: 예수금(cash) (보유종목 가격 합산은 추후 구현)
    securitiesAccount: number;
    // 일반계좌 자산: Wallet의 account 필드
    bankAccount: number;
    // 총 자산: 증권계좌 자산 + 일반계좌 자산
    totalAssets: number;
    // 아래 값들은 보유종목 및 평가손익 관련 계산 (추후 구현 예정)
    profit: number;
    profitRate: number;
    investmentAmount: number;
    totalProfit: number;
    totalProfitRate: number;
    // 예수금
    cash: number;
    // 보유종목 배열 (현재는 미구현이므로 빈 배열)
    holdings: any[];
}
