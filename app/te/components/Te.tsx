import { HomeDataResponseDto } from "@/application/usecases/home/dtos/HomeDataResponseDto";
import * as S from "@/app/te/components/Te.Styled";
import { env } from "@/config/env";

async function fetchStocks(
  stockList: string[]
): Promise<HomeDataResponseDto[]> {
  const queryString = new URLSearchParams({
    stockList: stockList.join(","),
  }).toString();
  const res = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/home?${queryString}`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
}

const StockList = async () => {
  const stockCodes = ["005930", "000660", "373220", "035720"];
  const stockData = await fetchStocks(stockCodes);

  return (
    <S.StockWrapper>
      <S.TitleBox>인기 종목</S.TitleBox>
      <S.StockItemBox>
        {stockData?.map(({ stockCode, stockImage, stockId, stockName, currentPrice }) => {
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
    </S.StockWrapper>
  );
};

export default StockList;
