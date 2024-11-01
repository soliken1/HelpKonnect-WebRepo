"use client";
import React from "react";
import { useParams } from "next/navigation";

const PaymentStatus = () => {
  const { paymentStatus } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {paymentStatus === "success" ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg">
            Thank you for your payment. Your transaction has been completed.
          </p>
        </div>
      ) : paymentStatus === "failed" ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600">Payment Failed!</h1>
          <p className="mt-4 text-lg">
            Unfortunately, your payment could not be processed. Please try
            again.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold">Unknown Status</h1>
          <p className="mt-4 text-lg">
            The payment status could not be determined.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
