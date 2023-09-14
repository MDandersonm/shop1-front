import React, { useState } from "react";
import { Button, TextField, Box, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../redux/types/productTypes";
import { useDispatch } from 'react-redux';
import { saveProduct } from '../../redux/actions/productActions';


import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from "@/redux/reducers";

import { useNavigate } from 'react-router-dom';
const ProductRegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const [product, setProduct] = useState<IProduct>({
    id: 0,
    name: "",
    brand: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);

    setProduct((prev) => ({
      ...prev,
      [name]: value,//동적으로 객체의 속성 이름을 생성하고 업데이트
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageFile(file);  // 파일 상태 업데이트
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = () => {
    // 이미지와 상품 정보를 saveProduct 액션에 전달
    dispatch(saveProduct(product, imageFile, navigate));
  };




  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: "40px" }}>
        상품 등록
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {/* 이미지 업로드 및 미리보기 */}
        <Box>
          <input
            accept="image/*"  //이미지 파일만 선택할 수 있도록 제한
            id="contained-button-file"
            type="file"
            onChange={handleImageChange}
            hidden
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              이미지 업로드
            </Button>
          </label>
          {previewImage && (
            <CardMedia
              component="img"
              sx={{ width: "200px", height: "200px", marginTop: 2 }}
              image={previewImage as string}
              title="상품 이미지"
            />
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
          <TextField
            label="상품명"
            variant="outlined"
            name="name"
            value={product.name}
            onChange={handleChange}
          // margin="normal"
          />
          <TextField
            label="브랜드"
            variant="outlined"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="가격"
            variant="outlined"
            name="price"
            value={product.price}
            onChange={handleChange}
            margin="normal"
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 10 }}
      >
        상품 등록
      </Button>
    </Box>
  );
};

export default ProductRegisterForm;
