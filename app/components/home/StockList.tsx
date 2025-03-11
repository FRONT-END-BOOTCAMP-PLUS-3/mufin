import { LogoWrapper, StockChange, StockImage, StockItemBox, StockLeft, StockLink, StockName, StockPrice, StockRight } from "@/app/components/home/StockList.Styled";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";

import { env } from "@/config/env";

interface StockListProps {
  path: string;
}

async function fetchStocks(path: string): Promise<StockListResponseDto[]> {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}${path}`, {
    cache: "no-store",
  });

  return await res.json();
}

const StockList = async ({ path }: StockListProps) => {
  const stockData = await fetchStocks(path);

  return (
    <>
      <StockItemBox>
        {stockData?.map(
          ({
            index,
            stockCode,
            stockImage,
            stockId,
            stockName,
            currentPrice,
          }) => {
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
              <StockLink href={`/stock/${stockCode}`} key={stockId}>
                <StockLeft>
                  {index && <span>{index}.</span>}
                  <LogoWrapper>
                    {stockImage ? (
                      <StockImage
                        src={`/stock/${stockImage}.png`}
                        alt={stockName}
                        width={40}
                        height={40}
                      />
                    ): <>
                    <StockImage
                        src={`/stock/DEFAULT.png`}
                        alt={"stockDefault"}
                        width={40}
                        height={40}
                        />
                    </> }
                  </LogoWrapper>
                  <StockName>{stockName}</StockName>
                </StockLeft>

                <StockRight>
                  <StockPrice>
                    {Number(currentPrice.stckPrpr).toLocaleString()} 원
                  </StockPrice>
                  <StockChange $isPositive={isPositive}>
                    {formattedVrss}원 ({formattedCtrt})
                  </StockChange>
                </StockRight>
              </StockLink>
            );
          }
        )}
      </StockItemBox>
    </>
  );
};

export default StockList;
