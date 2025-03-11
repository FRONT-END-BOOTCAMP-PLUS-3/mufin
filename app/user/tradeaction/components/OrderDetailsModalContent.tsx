"use client"

import { InfoItem, InfoList, ModalButton, ModalContainer, SubTitle, Title, TotalPrice } from "@/app/user/tradeaction/components/Trandeaction.Styled";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import '@/app/components/styles/swal-custom.css';

interface OrderDetailsModalContentProps {
  type: string; // 매매 타입 (buy 또는 sell)
  quantity: number; // 구매/판매 갯수
  price: number; // 한 주 가격
  totalAmount: number; // 총 가격
  stockName: string; // 주식 이름
  stockId: number; // 주식 ID
  symbol : string; // 주식 코드
}

const OrderDetailsModalContent = ({
  type,
  stockId,
  stockName,
  quantity,
  price,
  totalAmount,
  symbol,
}: OrderDetailsModalContentProps) => {
  const isBuy = type === "buy";

  const router = useRouter();

  const handleTrade = async () => {
    const apiUrl = isBuy ? "/api/tradeaction/buy" : "/api/tradeaction/sell";

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
          stockName,
          stockId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      Swal.fire({
        title: `${isBuy ? "구매" : "판매"} 성공!`,
        icon: "success",
        confirmButtonText: "확인",
        customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            }
      });
      router.push(`/stock/${symbol}`);
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: `${isBuy ? "구매" : "판매"} 실패`,
          icon: "success",
          confirmButtonText: "확인",
          customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            },
          width: '90%'
        });
        console.log(`${isBuy ? "구매" : "판매"} 실패: ${error.message}`);
      } else {
        Swal.fire({
          title: `${isBuy ? "구매" : "판매"} 실패`,
          icon: "success",
          confirmButtonText: "확인",
          customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            },
          width: '90%'
        });
        console.log(`${isBuy ? "구매" : "판매"} 실패: 알 수 없는 오류`);
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
