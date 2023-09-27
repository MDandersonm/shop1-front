import React from "react";
import { OrderCard} from "./orderCard";
import { OrderCardProps } from "@/types/shoppingTypes";

const OrderDetailForm: React.FC<OrderCardProps> = ({ order, formatNumber }) => {
  return (
    <>
      <OrderCard
        order={order}
        formatNumber={formatNumber}
        onCardClick={() => {}}
        showDeliveryInfo={true}
      />
    </>
  );
};

export default OrderDetailForm;
