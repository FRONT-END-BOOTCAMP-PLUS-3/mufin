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

    // DB에서 받아올 자산 데이터 상태
    const [goalAmount, setGoalAmount] = useState(0); // 투자 목표 금액 (Wallet.target)
    const [tempGoalAmount, setTempGoalAmount] = useState("0");
    const [securitiesAccount, setSecuritiesAccount] = useState(0); // 증권계좌 자산 (현재는 cash 값)
    const [bankAccount, setBankAccount] = useState(0); // 일반계좌 자산 (Wallet.account)
    const [totalAssets, setTotalAssets] = useState(0); // 총 자산 = 증권계좌 자산 + 일반계좌 자산
    const [profit, setProfit] = useState(0); // 평가손익 (추후 구현)
    const [profitRate, setProfitRate] = useState(0); // 평가손익 비율 (추후 구현)
    const [cash, setCash] = useState(0); // 예수금 (Wallet.cash)
    const [holdings, setHoldings] = useState<any[]>([]); // 보유종목 (추후 구현)
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    const [totalProfitRate, setTotalProfitRate] = useState(0);

    // 목표금액이 0이 아닐 경우 증권계좌 기준 Progress Bar 계산
    const progress = goalAmount > 0 ? Math.min((securitiesAccount / goalAmount) * 100, 100) : 0;

    useEffect(() => {
        // API 엔드포인트에서 자산 데이터 받아오기
        async function fetchAssetData() {
            try {
                const response = await fetch("/api/user/asset");
                if (!response.ok) {
                    throw new Error("자산 데이터를 불러오지 못했습니다.");
                }
                const data = await response.json();

                // API에서 받아온 데이터로 상태 업데이트
                setGoalAmount(data.goalAmount);
                setTempGoalAmount(data.goalAmount.toString());
                setSecuritiesAccount(data.securitiesAccount);
                setBankAccount(data.bankAccount);
                setTotalAssets(data.totalAssets);
                setProfit(data.profit);
                setProfitRate(data.profitRate);
                setCash(data.cash);
                setHoldings(data.holdings);
                setInvestmentAmount(data.investmentAmount);
                setTotalProfit(data.totalProfit);
                setTotalProfitRate(data.totalProfitRate);
                setTotalAssets(data.totalAssets); // 백엔드에서 계산한 값 사용
            } catch (error) {
                console.error("자산 데이터를 가져오는 중 에러 발생:", error);
            }
        }
        fetchAssetData();
    }, []);

    // 목표금액 업데이트 API 호출 함수
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
            // 서버에서 반환한 target 값을 적용
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
                <Input type="number" value={tempGoalAmount} onChange={(e) => setTempGoalAmount(e.target.value)} />
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
