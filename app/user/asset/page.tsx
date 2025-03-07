"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Modal from "@/app/components/modal/Modal";
import {
    Container,
    InvestmentGoal,
    GoalText,
    RightContainer2,
    GoalAmount,
    ProgressBarContainer,
    Progress,
    TotalAssetsSection,
    TotalText,
    TotalValue,
    AccountSection,
    LeftContainer,
    RightContainer,
    AccountTitle,
    AccountValue,
    TransferButton,
    ProfitText,
    Input,
    Button,
} from "@/app/user/asset/components/Asset.Styled";
import InvestmentAmount from "./components/InvestmentAmount";
import Holdings from "./components/Holdings";

const Asset = () => {
    const router = useRouter();

    // 투자 목표 설정 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 자산 데이터 (DB에서 가져올 예정)
    const [goalAmount, setGoalAmount] = useState(7700000); // 투자 목표 금액
    const [tempGoalAmount, setTempGoalAmount] = useState(goalAmount.toString()); //임시 목표금액
    const [securitiesAccount, setSecuritiesAccount] = useState(1500000); // 증권계좌 자산
    const [bankAccount, setBankAccount] = useState(1000000); // 일반계좌 자산
    const [totalAssets, setTotalAssets] = useState(securitiesAccount + bankAccount); // 총자산
    const [profit, setProfit] = useState(3216); // 평가손익
    const [profitRate, setProfitRate] = useState(1.6); // 수익률

    // 증권계좌 기준으로 Progress Bar 업데이트
    const progress = Math.min((securitiesAccount / goalAmount) * 100, 100);

    // 예제 데이터 (실제 데이터는 API 연동 예정)
    const investmentAmount = 750000; // 투자금액: 보유 종목들의 현재 가격 합산
    const totalProfit = 80000; // 총 평가손익(구매 가격 대비 현재 가격)
    const totalProfitRate = 8; // 평가손익 비율
    const cash = 250000; // 예수금 (DB의 cash 항목)

    // 보유 종목 데이터
    const holdings = [
        { logo: "/images/naver.png", name: "Naver", quantity: 5, amount: 250000, profit: 3215, profitRate: 1.5 },
        { logo: "/images/samsung.png", name: "삼성전자", quantity: 5, amount: 250000, profit: 3215, profitRate: 1.5 },
    ];

    useEffect(() => {
        setTotalAssets(securitiesAccount + bankAccount);
    }, [securitiesAccount, bankAccount]);

    return (
        <Container>
            {/* 나의 투자 목표 */}
            <InvestmentGoal>
                <GoalText>나의 투자 목표</GoalText>
                <RightContainer2>
                    <GoalAmount>{goalAmount.toLocaleString()} 원</GoalAmount>
                    <ArrowRight onClick={() => setIsModalOpen(true)} style={{ cursor: "pointer" }} />
                </RightContainer2>
            </InvestmentGoal>

            {/* Progress Bar */}
            <ProgressBarContainer>
                <Progress progress={progress}>{`+${progress.toFixed(0)}%`}</Progress>
            </ProgressBarContainer>

            {/* 총자산 */}
            <TotalAssetsSection>
                <TotalText>총 자산</TotalText>
                <TotalValue>{totalAssets.toLocaleString()} 원</TotalValue>
            </TotalAssetsSection>

            {/* 증권계좌 자산 */}
            <AccountSection>
                <LeftContainer>
                    <AccountTitle>증권 계좌 자산</AccountTitle>
                    <TransferButton onClick={() => router.push("/transfer")}>송금 →</TransferButton>
                </LeftContainer>
                <RightContainer>
                    <AccountValue>{securitiesAccount.toLocaleString()} 원</AccountValue>
                    <ProfitText>
                        +{profit.toLocaleString()}원 ({profitRate}%)
                    </ProfitText>
                </RightContainer>
            </AccountSection>

            {/* 일반계좌 자산 */}
            <AccountSection>
                <LeftContainer>
                    <AccountTitle>일반 계좌 자산</AccountTitle>
                    <TransferButton onClick={() => router.push("/transfer")}>송금 →</TransferButton>
                </LeftContainer>
                <RightContainer>
                    <AccountValue>{bankAccount.toLocaleString()} 원</AccountValue>
                    <ProfitText>
                        +{profit.toLocaleString()}원 ({profitRate}%)
                    </ProfitText>
                </RightContainer>
            </AccountSection>
            {/* 투자금액 & 평가손익 & 예수금 컴포넌트 */}
            <InvestmentAmount
                investmentAmount={investmentAmount}
                totalProfit={totalProfit}
                totalProfitRate={totalProfitRate}
                cash={cash}
            />

            {/* 보유종목 컴포넌트 */}
            <Holdings holdings={holdings} />

            {/* 투자 목표 설정 모달 */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h6>목표 금액 설정</h6>
                <Input
                    type="number"
                    value={tempGoalAmount}
                    onChange={(e) => {
                        setTempGoalAmount(e.target.value);
                    }}
                />
                <Button
                    onClick={() => {
                        setGoalAmount(Number(tempGoalAmount));
                        setIsModalOpen(false);
                    }}
                >
                    설정 완료
                </Button>
            </Modal>
        </Container>
    );
};
export default Asset;
