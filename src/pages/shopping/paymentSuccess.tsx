// PaymentSuccess.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mainRequest from '../../api/mainRequest';
export type PaymentData = {
    tid: string;
  };
const PaymentSuccess = () => {
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    const pgToken = new URLSearchParams(window.location.search).get('pg_token');

    if (!pgToken) {
      console.error('pg_token is missing.');
      return;
    }
    const config = {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem("token"),
          Authorization: localStorage.getItem("token"),
        },
      };

    mainRequest.get('/payment/success', { params: { pg_token: pgToken } })
      .then(response => {
        setPaymentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching payment data:', error);
      });
  }, []);

  if (!paymentData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Payment ID: {paymentData.tid}</p>
    </div>
  );
};

export default PaymentSuccess;
