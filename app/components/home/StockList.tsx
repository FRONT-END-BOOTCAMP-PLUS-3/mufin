"use client";
import {
    StockContainer,
    TitleBox,
    StockItems,
    StockLink,
    StockItem,
    StockInfo,
    StockLeft,
    LogoWrapper,
    StockName,
    StockRight,
    StockPrice,
    StockChange,
    StockImage,
} from "@/app/components/home/StockList.Styled";
const stockData = [
    {
        id: 1,
        name: "삼성전자",
        logo: "/stock-logo/samsung.png",
        price: "56,400",
        change: "+3215",
        changePercent: "+1.5%",
        symbol: "삼성전자", // 주식 심볼 추가
    },
    {
        id: 2,
        name: "SK하이닉스",
        logo: "/stock-logo/sk.png",
        price: "198,700",
        change: "-3215",
        changePercent: "-1.5%",
        symbol: "SK하이닉스",
    },
    {
        id: 3,
        name: "LG에너지솔루션",
        logo: "/stock-logo/lg.png",
        price: "369,500",
        change: "+3215",
        changePercent: "+1.5%",
        symbol: "LG에너지솔루션",
    },
    {
        id: 4,
        name: "카카오",
        logo: "/stock-logo/kakao.png",
        price: "44,300",
        change: "-3215",
        changePercent: "-1.5%",
        symbol: "카카오",
    },
];
const StockList = () => {
    return (
        <StockContainer>
            <TitleBox>인기 종목</TitleBox>
            <StockItems>
                {stockData.map((stock) => (
                    <StockLink href={`/stock/${stock.symbol}`} key={stock.id}>
                        <StockItem>
                            <StockInfo>
                                <StockLeft>
                                    <LogoWrapper>
                                        <StockImage src={stock.logo} alt={stock.name} width={40} height={40} />
                                    </LogoWrapper>
                                    <StockName>{stock.name}</StockName>
                                </StockLeft>
                                <StockRight>
                                    <StockPrice>{stock.price} 원</StockPrice>
                                    <StockChange $isPositive={stock.change.startsWith("+")}>
                                        {stock.change}원 ({stock.changePercent})
                                    </StockChange>
                                </StockRight>
                            </StockInfo>
                        </StockItem>
                    </StockLink>
                ))}
            </StockItems>
        </StockContainer>
    );
};

export default StockList;
