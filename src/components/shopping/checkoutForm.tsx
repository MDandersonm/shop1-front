// CheckoutPage.tsx//부모
import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CartForm from "./cartForm";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/userTypes";
import { CartItem, CheckoutFormProps } from "../../types/shoppingTypes";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "@/redux/reducers";
import { clearCart, saveOrder } from "../../redux/shopping/shoppingActions";

declare global {
  interface Window {
    IMP: any;
  }
}

const CheckoutForm: React.FC<CheckoutFormProps> = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<number | "">("");
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [cartTotalPrice, setCartTotalPrice] = useState<number>(0);

  const [actualUser, setActualUser] = useState<User | null>(null); // 추가한 부분
  const [actualItems, setActualItems] = useState<CartItem[]>([]); // 추가한 부분

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setAddress(data.address);
        setPostCode(data.zonecode);
      },
    }).open();
  };

  const IMP = window.IMP;

  useEffect(() => {
    IMP.init("imp52172305");
  }, [IMP]);
  const handlePayment = () => {
    if (paymentMethod === 30) {
      handleKakaoPay();
    }
  };

  const handleKakaoPay = () => {
    // 결제창 호출 코드
    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "결제",
        amount: cartTotalPrice,
        buyer_email: "구매자 이메일",
        buyer_name: name,
        buyer_tel: phone,
        buyer_addr: address,
        buyer_postcode: postCode,
        m_redirect_url: "redirect url",
      },
      function (rsp: any) {
        if (rsp.success) {
          saveOrderInformations();
          if (actualUser && actualUser.id) {
            dispatch(clearCart(actualUser.id));
            let msg = "결제가 완료되었습니다.";
            alert(msg);
            navigate("/order-list");
          }
        
          
        } else {
          let msg = "결제에 실패하였습니다.";
          console.error(rsp.error_msg);
          alert(msg);
        }
      }
    );
  };

  const saveOrderInformations = () => {
    console.log("actualUser",actualUser);  // 변경된 부분
    console.log("actualItems",actualItems);  // 변경된 부분

    let cartItemList = []
    
    for(let i = 0; i < actualItems.length; i++) {
      cartItemList.push({
        productId: actualItems[i].product.id,
        quantity: actualItems[i].quantity,
        size: actualItems[i].size,
        price: actualItems[i].product.price,
        })
    }

    let orderInfo = {
      userId: actualUser?.id,
      totalPrice: cartTotalPrice,
      cartItemList: cartItemList,
      name:name,
      postCode:postCode,
      address:address,
      detailAddress:detailAddress,
      phone:phone
    } 

    dispatch(saveOrder(orderInfo));

  };


 

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <CartForm
          isCheckout={true}
          setTotalPrice={setCartTotalPrice}
          setUser={setActualUser}
          updateItems={setActualItems}
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Typography variant="h5">배송지 정보</Typography>
        <TextField
          fullWidth
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px", marginTop: "20px" }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <TextField fullWidth label="우편번호" value={postCode} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddressSearch}
            style={{ marginLeft: "30px", width: "150px", height: "50px" }}
          >
            주소검색
          </Button>
        </div>

        <TextField
          fullWidth
          label="주소"
          value={address}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          label="상세 주소"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="전화번호"
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Typography variant="h5">결제 방법</Typography>
        <FormControl fullWidth variant="outlined" style={{ marginTop: "20px" }}>
          <InputLabel>결제 방법 선택</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as number)}
          >
            <MenuItem value="">결제 방법 선택</MenuItem>
            <MenuItem value={10}>신용 카드</MenuItem>
            <MenuItem value={20}>뱅크 이체</MenuItem>
            <MenuItem value={30}>카카오페이</MenuItem>
          </Select>
        </FormControl>
      </div>
      {paymentStatus && (
        <Typography
          color="error"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          {paymentStatus}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
      //  onClick={saveOrderInformations}
        onClick={handlePayment}
        style={{ display: "block", margin: "20px auto", width: "100px" }}
      >
        결제하기
      </Button>
    </div>
  );
};

export default CheckoutForm;

// // 이 부분에서 서버에 결제 준비를 위한 요청을 보낸 후,
// // 서버는 카카오페이 API에 결제 준비 요청을 보내고,
// // 결제 페이지 URL을 받아 클라이언트에 전달해줍니다.
// try {
//   const requestData = {
//     // KakaoPayRequest 형식에 맞춰 데이터를 입력하세요. 예시:
//     item_name: "상품 이름",
//     total_amount: 10000,
//     tax_free_amount: 9000,
//     // ... 그 외 필요한 데이터
//   };
//   const config = {
//     headers: {
//       // Authorization: "Bearer " + localStorage.getItem("token"),
//       Authorization: localStorage.getItem("token"),
//     },
//   };
//   const response = await mainRequest.post(
//     "/payment/ready",
//     requestData,
//     config
//   );
//   console.log("response.data",response.data);

//   if (response.data && response.data.next_redirect_pc_url) {
//     window.location.href = response.data.next_redirect_pc_url;
//   } else {
//     console.error("카카오페이 URL을 받지 못했습니다.");
//   }
// } catch (error) {
//   console.error("결제 요청 중 에러 발생:", error);
// }
// };
