// OrderCard.tsx
import React from "react";
import { IOrderInfo, OrderCardProps } from "../../types/shoppingTypes";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onCardClick,
  formatNumber,
  showDeliveryInfo = false,
}) => (
  <Card
    elevation={3}
    style={{ padding: "15px", cursor: "pointer", minWidth:"500px" }}
    onClick={() => onCardClick(order)}
  >
    <Typography
      variant="subtitle2"
      style={{
        textAlign: "left",
        fontSize: "25px",
        fontWeight: "bold",
        padding: "10px",
      }}
    >
      {new Date(order.orderDate).toLocaleDateString()}{" "}
      <span
        style={{
          marginLeft: "15px",
          fontSize: "18px",
          fontWeight: "normal",
        }}
      >
        Order ID: {order.id}
      </span>
    </Typography>
    {order.orderProducts.map((op, index) => (
      <Grid container style={{ padding: "20px" }} key={op.id}>
        <Grid item xs={2} style={{ marginRight: "20px" }}>
          <CardMedia
            component="img"
            alt="Product Image"
            height="120px"
            image={`/images/product/${op.product.image}`}
            style={{ objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={5}>
          <CardContent>
            <Typography variant="body1" component="div">
              Product ID: {op.product.id}
            </Typography>
            <Typography variant="body1" component="div">
              {op.product.name}
            </Typography>
            <Typography variant="body1" component="div">
              {op.product.brand}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              style={{ fontWeight: "bold" }}
            >
              Size: {op.size}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            {op.quantity} 개
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            {formatNumber(parseFloat(op.product.price))}원
          </Typography>
        </Grid>
      </Grid>
    ))}
    <CardContent>
      <Typography
        variant="h4"
        color="textSecondary"
        component="p"
        style={{
          textAlign: "right",
          fontSize: "25px",
          fontWeight: "bold",
          padding: "5px",
        }}
      >
        Total Price: {formatNumber(order.totalPrice)}원
      </Typography>
    </CardContent>

    {showDeliveryInfo && (
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          배송지 정보
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                style={{ border: "none", paddingRight: "0px" }}
              >
                이름
              </TableCell>
              <TableCell style={{ border: "none", paddingLeft: "0px" }}>
                {order.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                style={{ border: "none", paddingRight: "0px" }}
              >
                우편번호
              </TableCell>
              <TableCell style={{ border: "none", paddingLeft: "0px" }}>
                {order.postCode}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                style={{ border: "none", paddingRight: "0px" }}
              >
                주소
              </TableCell>
              <TableCell style={{ border: "none", paddingLeft: "0px" }}>
                {order.address} {order.detailAddress}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                style={{ border: "none", paddingRight: "0px" }}
              >
                연락처
              </TableCell>
              <TableCell style={{ border: "none", paddingLeft: "0px" }}>
                {order.phone}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    )}
  </Card>
);
