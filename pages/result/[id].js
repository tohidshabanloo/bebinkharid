import { useRouter } from "next/router";

import axios from "axios";
import Layout from "../../components/Layout";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ProfileScreen() {
  const router = useRouter();

  const { id } = router.query;
  const { data, error } = useSWR(`/api/IDPay/${id}`, fetcher);

  if (error) {
    return <p>hello</p>;
  }
  console.log(data);
  return (
    <Layout title="Profile">
      <div>
        {data?.status === "100" ? <p>پرداخت شد </p> : <p>پرداخت نشد</p>}
      </div>

      <p>وضعیت: {data?.status}</p>
      <p>مبلغ: {data?.amount}</p>
      <p>آیدی: {data?.order_id}</p>
      <p>آیدی: {data?.id}</p>
      <p>کدرهگیری: {data?.track_id}</p>
      <p>نام: {data?.payer.name}</p>
    </Layout>
  );
}
