import { useRouter } from "next/router";
import React from "react";import Layout from "../components/Layout";
import axios from "axios";

export default function PaymentScreen() {

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('/api/IDPay/checkout', {
        amount: '500000',
      })
      .then((response) => {
        console.log(JSON.stringify(response.data))
        router.push(response.data.link);
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <Layout title="روش پرداخت">
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
      <button
            type="submit"
            className="flex w-full flex-row justify-center gap-2 rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <div>پرداخت</div>
        </button>
      </form>
    </Layout>
  );
}
