import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="دسترسی محدود">
      <h1 className="text-xl  flex justify-center mt-20">
        شما به این قسمت دسترسی ندارید
      </h1>
      {message && (
        <div className="mb-4 flex justify-center text-red-500">{message}</div>
      )}
    </Layout>
  );
}
