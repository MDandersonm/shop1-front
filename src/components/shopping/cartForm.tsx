// CartPage.tsx
import React, { Dispatch, useEffect, useState } from "react";
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
} from "../../redux/shopping/shoppingActions";
import { useNavigate } from "react-router-dom";
import { CartFormProps, CartItem } from "../../types/shoppingTypes";
import { checkUser } from "../../redux/user/userActions";

const CartForm: React.FC<CartFormProps> = ({ isCheckout = false }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

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
    if (user && user.id) {
      dispatch(checkUser());
      let relevantItems: CartItem[] = [];

      if (checkoutFlow === "direct") {
        if (singleItem?.userId === user.id) {
          relevantItems.push(singleItem);
        }
      } else if (checkoutFlow === "cart") {
        relevantItems = cartItemsFromState.filter(
          (item) => item.userId === user.id
        );
      }

      if (JSON.stringify(relevantItems) !== JSON.stringify(items)) {
        setItems(relevantItems);
      }
    }
  }, [checkoutFlow, cartItemsFromState, singleItem, dispatch]);

  // const totalPrice = items.reduce((acc, item) => {
  //   const price =
  //     typeof item.product.price === "number" ? item.product.price : 0;
  //   const quantity = typeof item.quantity === "number" ? item.quantity : 0;

  //   return acc + price * quantity;
  // }, 0);
  const totalPrice = items.reduce((acc, item) => {
    const price = parseFloat(item.product.price);
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;

    return acc + price * quantity;
  }, 0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const product = items[index].product;
    const currentQuantity = items[index].quantity;
    const size = items[index].size;

    if (newQuantity > currentQuantity) {
      if (user && user.id) {
        dispatch(incrementQuantity(user?.id, product.id, size));
      }
    } else if (newQuantity < currentQuantity && newQuantity >= 1) {
      if (user && user.id) {
        dispatch(decrementQuantity(user?.id, product.id, size));
      }
    }
  };

  const handlePaymentClick = () => {
    navigate("/checkout");
  };
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {items.length === 0 ? ( // 상품이 없을 때
        <Typography variant="h6" style={{ textAlign: "center" }}>
          상품이 없습니다!
        </Typography>
      ) : (
        //상품이 있을때
        <>
          {items.map((item, index) => (
            <Card
              key={item.product.id + item.size}
              style={{
                display: "flex",
                marginBottom: "20px",
                minWidth: "800px",
              }}
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
                  {Number(
                    parseFloat(item.product.price) * item.quantity
                  ).toLocaleString()}
                  원
                </Typography>

                {/* <Typography style={{ margin: "0 20px" }}>
                  Total:{" "}
                  {Number(item.product.price * item.quantity).toLocaleString()}
                  원
                </Typography> */}
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
                  onClick={() => {
                    if (user && user.id) {
                      dispatch(
                        removeFromCart(user?.id, item.product.id, item.size)
                      );
                    }
                  }}
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
            disabled={items.length === 0} // 상품이 없으면 버튼 비활성화
            style={{
              display: isCheckout ? "none" : "block",
              margin: "20px auto",
              width: "100px",
            }}
            onClick={handlePaymentClick}
          >
            결제
          </Button>
        </>
      )}
    </div>
  );
};

export default CartForm;
