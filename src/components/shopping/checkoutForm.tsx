// CheckoutPage.tsx
import React, { useRef, useState } from "react";
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

const CheckoutForm: React.FC = () => {
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setAddress(data.address);
        setPostCode(data.zonecode);
      },
    }).open();
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <CartForm isCheckout={true} />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Typography variant="h5">배송지 정보</Typography>
        <TextField fullWidth label="이름" style={{ marginBottom: "10px", marginTop: "20px" }} />

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
            style={{ marginLeft: "30px", width:"150px",height:"50px"}} 
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
          style={{ marginBottom: "10px" }}
        />
        <TextField fullWidth label="전화번호" />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Typography variant="h5">결제 방법</Typography>
        <FormControl fullWidth variant="outlined" style={{ marginTop: "20px" }}>
          <InputLabel>결제 방법 선택</InputLabel>
          <Select>
            <MenuItem value={10}>신용 카드</MenuItem>
            <MenuItem value={20}>뱅크 이체</MenuItem>
            <MenuItem value={30}>PayPal</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        variant="contained"
        color="primary"
        style={{ display: "block", margin: "20px auto", width: "100px" }}
      >
        결제하기
      </Button>
    </div>
  );
};

export default CheckoutForm;
