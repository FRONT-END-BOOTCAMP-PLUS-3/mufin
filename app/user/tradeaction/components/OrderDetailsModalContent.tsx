import { InfoItem, InfoList, ModalButton, ModalContainer, SubTitle, Title, TotalPrice } from "@/app/user/tradeaction/components/Trandeaction.Styled";

interface OrderDetailsModalContentProps {
  type: string; // 매매 타입 (buy 또는 sell)
  quantity: number; // 구매/판매 갯수
  price: number; // 한 주 가격
  totalAmount: number; // 총 가격
  userId : string; // 유저 ID
  stockName: string; // 주식 이름
  stockId: number; // 주식 ID
}

const OrderDetailsModalContent = ({
  type,
  userId,
  stockId,
  stockName,
  quantity,
  price,
  totalAmount,
}: OrderDetailsModalContentProps) => {
  const isBuy = type === "buy";

  const handleTrade = async () => {
    const apiUrl = isBuy ? "/api/buy" : "/api/sell";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
          price,
          totalAmount,
          userId,
          stockName,
          stockId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert(`${isBuy ? "구매" : "판매"} 성공!`);
    } catch (error) {
      if (error instanceof Error) {
        alert(`${isBuy ? "구매" : "판매"} 실패: ${error.message}`);
      } else {
        alert(`${isBuy ? "구매" : "판매"} 실패: 알 수 없는 오류`);
      }
    }
  };

  return (
    <ModalContainer>
      <Title>{stockName ?? stockId}</Title>
      <SubTitle $isBuy={isBuy}>
        <span className="quantity">{quantity}주</span> 
        <span className="action">{isBuy ? "구매" : "판매"}</span>
      </SubTitle>
      <InfoList>
        <InfoItem>
          <span>1주 가격</span>
          <span>{price.toLocaleString()}원</span>
        </InfoItem>
        <TotalPrice>
          <span>총 주문 금액</span>
          <span>{totalAmount.toLocaleString()}원</span>
        </TotalPrice>
      </InfoList>
      <ModalButton as="button" onClick={handleTrade} $isBuy={isBuy}>
        {isBuy ? "구매하기" : "판매하기"}
      </ModalButton>
    </ModalContainer>
  );
};

export default OrderDetailsModalContent;
