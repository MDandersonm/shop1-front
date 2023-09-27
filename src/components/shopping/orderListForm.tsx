import React, { Dispatch, useEffect } from "react";
import { IOrderInfo } from "../../types/shoppingTypes";
import { fetchOrders, selectOrder } from "../../redux/shopping/shoppingActions";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OrderCard } from "./orderCard";

export const OrderListForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state: any) => state.shopping.orders);

const handleCardClick = (order: IOrderInfo) => {
  dispatch(selectOrder(order)); // 가정: selectOrder는 현재 주문 정보를 저장하는 액션입니다.
  navigate('/order-detail');
};


  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  return (
    <Grid container spacing={2}>
      {orders.map((order: IOrderInfo) => (
        <Grid item xs={12} key={`order-${order.id}`}>
              <OrderCard order={order} onCardClick={handleCardClick} formatNumber={formatNumber} />
        </Grid>
      ))}
    </Grid>
  );
};
