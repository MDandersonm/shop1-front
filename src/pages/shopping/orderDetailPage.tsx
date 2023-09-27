import { Dispatch } from "redux";
import OrderDetailForm from "../../components/shopping/orderDetailForm";

import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchOrders } from "../../redux/shopping/shoppingActions";

const OrderDetailPage: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const order = useSelector((state: any) => state.shopping.selectedOrder);

    if (!order) {
      return <div>No order selected</div>;
    }
  
    const formatNumber = (num: number): string => {
        return new Intl.NumberFormat("ko-KR").format(num);
      };
    
    // useEffect(() => {
    //     dispatch(fetchOrders());
    //   }, [dispatch]);
    

  return (
    <div className="container mt-5">
    <OrderDetailForm order={order} formatNumber={formatNumber} onCardClick={() => {}}></OrderDetailForm>
    </div>
  );
};

export default OrderDetailPage;
