import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";
import * as S from "@/app/te/components/Te.Styled";
import { env } from "@/config/env";

interface StockListProps {
    path:string;
}

async function fetchStocks(path: string): Promise<StockListResponseDto[]> {
    
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}${path}`, {
        cache: "no-store",
    });

    return await res.json();
}

const StockList = async ({path}:StockListProps) => {
    
    const stockData = await fetchStocks(path);


    return (
    <>
       
            <S.StockItemBox>
            {stockData?.map(({ index, stockCode, stockImage, stockId, stockName, currentPrice }) => {
                const isPositive = !currentPrice.prdyVrss.startsWith("-");
            
                const formattedVrss =
                    currentPrice.prdyVrss === "0"
                    ? "0"
                    : isPositive
                    ? `+${Number(currentPrice.prdyVrss).toLocaleString()}`
                    : Number(currentPrice.prdyVrss).toLocaleString();
            
                const formattedCtrt =
                    currentPrice.prdyCtrt === "0"
                    ? "0%"
                    : isPositive
                    ? `+${currentPrice.prdyCtrt}%`
                    : `${currentPrice.prdyCtrt}%`;
            
                return (
                    <S.StockLink href={`/stock/${stockCode}`} key={stockId}>
                    <S.StockLeft>
                        {index && <span>{index}.</span>}
                        <S.LogoWrapper>
                        {stockImage && (
                            <S.StockImage
                            src={`/stock-logo/${stockImage.toLowerCase()}.png`}
                            alt={stockName}
                            width={40}
                            height={40}
                            />
                        )}
                        </S.LogoWrapper>
                        <S.StockName>{stockName}</S.StockName>
                    </S.StockLeft>
                    
                    <S.StockRight>
                        <S.StockPrice>
                        {Number(currentPrice.stckPrpr).toLocaleString()} 원
                        </S.StockPrice>
                        <S.StockChange $isPositive={isPositive}>
                        {formattedVrss}원 ({formattedCtrt})
                        </S.StockChange>
                    </S.StockRight>
                    </S.StockLink>
                );
                }
            )}
            </S.StockItemBox>
        </>
    );
};

export default StockList;
