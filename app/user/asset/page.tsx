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
    Input,
    Button,
} from "@/app/user/asset/components/Asset.Styled";
import InvestmentAmount from "./components/InvestmentAmount";
import Holdings from "./components/Holdings";
import { PortfolioWithPrice } from "@/application/usecases/user/GetUserPortfolioUseCase";

const Asset = () => {
    const router = useRouter();

    // 투자 목표 설정 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Wallet 관련 데이터 상태 (투자 목표, 예수금, 일반계좌 등)
    const [goalAmount, setGoalAmount] = useState(0);
    const [tempGoalAmount, setTempGoalAmount] = useState("0");
    const [bankAccount, setBankAccount] = useState(0);
    const [cash, setCash] = useState(0);

    // Portfolio 관련 데이터 및 계산된 값
    const [holdings, setHoldings] = useState<PortfolioWithPrice[]>([]);
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [securitiesAccount, setSecuritiesAccount] = useState(0);

    // 기타 상태
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    const [totalProfitRate, setTotalProfitRate] = useState(0);

    // 증권계좌 기준 Progress Bar 계산
    const progress = goalAmount > 0 ? Math.min((securitiesAccount / goalAmount) * 100, 100) : 0;

    // 데이터 Fetch: Wallet와 Portfolio 데이터를 함께 받아옴
    useEffect(() => {
        async function fetchAssetData() {
            try {
                const response = await fetch("/api/user/asset");
                if (!response.ok) {
                    throw new Error("자산 데이터를 불러오지 못했습니다.");
                }
                const data = await response.json();
                // Wallet 관련 데이터 업데이트
                setGoalAmount(data.goalAmount);
                setTempGoalAmount(data.goalAmount.toString());
                setBankAccount(data.bankAccount);
                setCash(data.cash);
                setTotalProfit(data.totalProfit);
                setTotalProfitRate(data.totalProfitRate);
                // Portfolio(보유종목) 데이터 업데이트
                setHoldings(data.holdings);
            } catch (error) {
                console.error("자산 데이터를 가져오는 중 에러 발생:", error);
            }
        }
        fetchAssetData();
    }, []);

    //투자금액(원래 투자금액)과 총 평가손익 계산
    useEffect(() => {
        //원래 투자금액 : 각 보유종목의 DB total컬럼의 합계
        const sumOriginal = holdings.reduce((acc, item) => acc + (Number(item.total) || 0), 0);
        //현재 총 가치: 각 보유종목의 currentPrice*stockQty
        const sumCurrent = holdings.reduce((acc, item) => acc + (item.currentPrice || 0) * (item.stockQty || 0), 0);
        setInvestmentAmount(sumCurrent);
        setTotalProfit(sumCurrent - sumOriginal);
        setTotalProfitRate(sumOriginal > 0 ? ((sumCurrent - sumOriginal) / sumOriginal) * 100 : 0);
    }, [holdings]);

    // 증권계좌 자산 계산: 예수금(cash) + 투자금액
    useEffect(() => {
        setSecuritiesAccount(cash + investmentAmount);
    }, [cash, investmentAmount]);

    // 총 자산 계산: 증권계좌 자산 + 일반계좌 자산
    useEffect(() => {
        setTotalAssets(securitiesAccount + bankAccount);
    }, [securitiesAccount, bankAccount]);

    // 목표금액 업데이트 API 호출 함수 (PATCH)
    const updateGoalAmount = async (newTarget: number) => {
        try {
            const response = await fetch("/api/user/asset", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target: newTarget }),
            });
            if (!response.ok) {
                throw new Error("목표 금액 업데이트 실패");
            }
            const data = await response.json();
            setGoalAmount(data.target);
        } catch (error) {
            console.error("목표 금액 업데이트 중 에러 발생:", error);
        }
    };

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
                <Progress $progress={progress}>{`+${progress.toFixed(0)}%`}</Progress>
            </ProgressBarContainer>

            {/* 총 자산 */}
            <TotalAssetsSection>
                <TotalText>총 자산</TotalText>
                <TotalValue>{totalAssets.toLocaleString()} 원</TotalValue>
            </TotalAssetsSection>

            {/* 증권계좌 자산 (예수금 + 투자금액) */}
            <AccountSection>
                <LeftContainer>
                    <AccountTitle>증권 계좌 자산</AccountTitle>
                    <TransferButton onClick={() => router.push("/user/transfer?type=toAccount")}>송금</TransferButton>
                </LeftContainer>
                <RightContainer>
                    <AccountValue>{securitiesAccount.toLocaleString()} 원</AccountValue>
                </RightContainer>
            </AccountSection>

            {/* 일반계좌 자산 */}
            <AccountSection>
                <LeftContainer>
                    <AccountTitle>일반 계좌 자산</AccountTitle>
                    <TransferButton onClick={() => router.push("/user/transfer?type=toCash")}>송금</TransferButton>
                </LeftContainer>
                <RightContainer>
                    <AccountValue>{bankAccount.toLocaleString()} 원</AccountValue>
                </RightContainer>
            </AccountSection>

            {/* 투자금액, 평가손익, 예수금 컴포넌트 */}
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
                <Input type="number" value={tempGoalAmount} onChange={(e) => {
                    const newValue = e.target.value;
                    if (!isNaN(Number(newValue)) && (Number(newValue) >= 0 || newValue === "")) {
                    setTempGoalAmount(newValue);
                    }}} />
                <Button
                    onClick={async () => {
                        const newTarget = Number(tempGoalAmount);
                        await updateGoalAmount(newTarget);
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
