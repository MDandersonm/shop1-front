import React, { useState, useEffect } from "react";
import { Button, TextField, Box, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../types/productTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  updateProduct,
} from "../../redux/product/productActions";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "@/redux/reducers";

import { useNavigate, useParams } from "react-router-dom";

type RouteParams = {
  [key: string]: string | undefined;
};
const ProductUpdateForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { id } = useParams<RouteParams>();
  const productId = Number(id);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const fetchedProduct = useSelector(
    (state: RootState) => state.product.product
  );

  useEffect(() => {
    if (fetchedProduct) {
      setProduct({
        ...fetchedProduct,
        price: fetchedProduct.price.toString(), // Double을 문자열로 변환
      });
      if (fetchedProduct.image) {
        setPreviewImage(`/images/product/${fetchedProduct.image}`);
      } else {
        setPreviewImage(null);
      }

      // detailImages가 ProductDetailImage[] 타입이라면, 해당 리스트를 문자열 배열로 변환
      const detailImageURLs =
        fetchedProduct.detailImages?.map(
          (detailImage) => `/images/product/${detailImage.detailImageUrl}`
        ) || [];
      setDetailPreviews(detailImageURLs);
    }
  }, [fetchedProduct]);

  const [product, setProduct] = useState<IProduct>({
    id: 0,
    name: "",
    brand: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);

  const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);

    setProduct((prev) => ({
      ...prev,
      [name]: value, //동적으로 객체의 속성 이름을 생성하고 업데이트
    }));
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setImageFile(file); //
    }
  };

  const handleDetailImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files!;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setDetailImageFiles(fileArray);

      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setDetailPreviews(imageUrls);
    }
  };

  const handleUpdate = () => {
    dispatch(updateProduct(product, imageFile, detailImageFiles, navigate));
  };

  return (
    <>
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
              accept="image/*" //이미지 파일만 선택할 수 있도록 제한
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

          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
          >
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

        {/* 상세 이미지 업로드 및 미리보기 */}
        <Box sx={{ marginTop: 10, marginBottom: 10 }}>
          <input
            accept="image/*"
            id="detail-images"
            type="file"
            onChange={handleDetailImagesChange}
            multiple // 다중 파일 선택 허용
            hidden
          />
          <label htmlFor="detail-images">
            <Button variant="contained" color="primary" component="span">
              상세 이미지 업로드
            </Button>
          </label>
          <Box
            sx={{ display: "flex", flexDirection: "row", gap: 2, marginTop: 2 }}
          >
            {detailPreviews.map((preview, index) => (
              <CardMedia
                key={index}
                component="img"
                sx={{ width: "100px", height: "100px" }}
                image={preview}
                title={`상세 이미지 ${index + 1}`}
              />
            ))}
          </Box>
        </Box>

        <Button variant="contained" color="primary" onClick={handleUpdate}>
          상품 수정
        </Button>
      </Box>
    </>
  );
};

export default ProductUpdateForm;
