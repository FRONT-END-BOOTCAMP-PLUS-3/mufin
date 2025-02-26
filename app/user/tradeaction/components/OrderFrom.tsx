import { FormContainer, PriceText, QuantityControl } from "@/app/user/tradeaction/Trandeaction.Styled";

// app/user/tradeaction/components/OrderFrom.tsx
type OrderFormProps = {
    quantity: number;
    setQuantity: (quantity: number) => void;
    price: number;
  };
  
  export const OrderForm = ({ quantity, setQuantity, price }: OrderFormProps) => {
    return (
    <FormContainer>
      <label>구매할 가격</label>
      <PriceText>{price.toLocaleString()} 원</PriceText>
      <QuantityControl>
        <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
        <span>{quantity} 주</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </QuantityControl>
    </FormContainer>

    );
  };
  