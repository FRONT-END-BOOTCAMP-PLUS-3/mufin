"use client";
import { LogoWrapper, StockChange, StockImage, StockItemBox, StockLeft, StockLink, StockName, StockPrice, StockRight } from "@/app/components/home/StockList.Styled";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";
import { useStockList } from "@/hooks/useStockList";

interface StockListProps {
  path: string;
  initialData: StockListResponseDto[];
}

const StockList = ({ path, initialData }: StockListProps) => {
  const { data: stockData } = useStockList(path, initialData);

  return (
    <>
      <StockItemBox>
        {stockData && stockData.length !== 0 && stockData.map(
          ({
            index, stockCode, stockImage, stockId, stockName, currentPrice,
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
