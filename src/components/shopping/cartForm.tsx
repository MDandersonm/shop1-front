// CartPage.tsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/reducers";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/actions/shoppingActions";
import { useNavigate } from "react-router-dom";
import { CartFormProps } from "../../redux/types/shoppingTypes";

const CartForm: React.FC<CartFormProps> = ({ isCheckout = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkoutFlow = useSelector(
    (state: RootState) => state.shopping.checkoutFlow
  );
  const cartItemsFromState = useSelector(
    (state: RootState) => state.shopping.cart
  );
  const singleItem = useSelector(
    (state: RootState) => state.shopping.singleItem
  );

  const [items, setItems] = useState(cartItemsFromState); // 로컬 상태로 항목들을 관리

  useEffect(() => {
    if (checkoutFlow === "direct") {
      setItems([singleItem]); // 바로구매를 통한 접근이면 singleItem만을 배열에 담습니다.
    } else if (checkoutFlow === "cart") {
      setItems(cartItemsFromState); // 장바구니를 거쳐온 경우에는 cartItems를 그대로 사용합니다.
    }
  }, [checkoutFlow, cartItemsFromState, singleItem]);

  const totalPrice = items.reduce((acc, item) => {
    const price =
      typeof item.product.price === "number" ? item.product.price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;

    return acc + price * quantity;
  }, 0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const product = items[index].product;
    const currentQuantity = items[index].quantity;
    const size = items[index].size;

    if (newQuantity > currentQuantity) {
      dispatch(incrementQuantity(product.id, size));
    } else if (newQuantity < currentQuantity && newQuantity >= 1) {
      dispatch(decrementQuantity(product.id, size));
    }
  };

  const handlePaymentClick = () => {
    navigate("/checkout");
  };
  return (
    <div>
      {items.map((item, index) => (
        <Card
          key={item.product.id + item.size}
          style={{ display: "flex", marginBottom: "20px" }}
        >
          <CardMedia
            component="img"
            image={
              item.product.image
                ? `/images/product/${item.product.image}`
                : "/path/to/default/image.jpg"
            }
            alt={item.product.name}
            style={{ width: "150px" }}
          />
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h5">{item.product.name}</Typography>
            <Typography>brand: {item.product.brand}</Typography>
            <Typography>Size: {item.size}</Typography>
            <Typography>
              Price: {Number(item.product.price).toLocaleString()}원
            </Typography>
          </CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <TextField
              value={item.quantity}
              type="number"
              inputProps={{ min: 1, readOnly: isCheckout }} // isCheckout이 true이면 readOnly 속성 적용
              style={{ width: "50px", margin: "0 20px" }}
              onChange={
                isCheckout
                  ? undefined
                  : (e) => handleQuantityChange(index, +e.target.value)
              } // + 기호를 붙이면, JavaScript는 해당 문자열을 숫자로 변환
            />

            <Typography style={{ margin: "0 20px" }}>
              Total:{" "}
              {Number(item.product.price * item.quantity).toLocaleString()}원
            </Typography>
          </div>
          <div
            style={{
              //   flexDirection: "row",
              alignItems: "center",
              marginRight: "10px",
              display: isCheckout ? "none" : "flex",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{
                // backgroundColor: "darkred",
                // color: "white",
                height: "40px",
              }}
              onClick={() =>
                dispatch(removeFromCart(item.product.id, item.size))
              }
            >
              Remove
            </Button>
          </div>
        </Card>
      ))}
      <Typography
        variant="h6"
        style={{ textAlign: "right", marginRight: "20px" }}
      >
        Total Price: {Number(totalPrice).toLocaleString()}원
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{
          display: isCheckout ? "none" : "block",
          margin: "20px auto",
          width: "100px",
        }}
        onClick={handlePaymentClick}
      >
        결제
      </Button>
    </div>
  );
};

export default CartForm;
