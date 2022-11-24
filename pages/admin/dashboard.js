import axios from "axios";
import Link from "next/link";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <Layout title="داشبورد مدیر - ببین خرید">
      <div className="grid border md:grid-cols-4 md:gap-5 p-10">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <a className="mr-4 font-bold text-gray-900 dark:text-gray-200">
                  {">"} داشبورد
                </a>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="text-gray-900 dark:text-gray-200"
              >
                <a className="font-bold text-gray-900 dark:text-gray-200">
                  - سفارشات
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/products">
                <a className="font-bold text-gray-900 dark:text-gray-200">
                  - محصولات
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <a className="font-bold text-gray-900 dark:text-gray-200">
                  - کاربران
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3 ">
          <h1 className="mb-4 text-xl text-gray-900 dark:text-gray-200">
            داشبورد مدیر{" "}
          </h1>
          {loading ? (
            <div className="text-gray-900 dark:text-gray-200">
              درحال راه اندازی...
            </div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 ">
                <div className="card m-5 p-5 text-center bg-yellow-200">
                  <p className="text-xl"> {summary.ordersPrice} تومان</p>
                  <p>فروش داشته ایم</p>
                  <Link href="/admin/orders">مشاهده فروش ها</Link>
                </div>
                <div className="card m-5 p-5 text-center bg-red-200">
                  <p className="text-xl">{summary.ordersCount} بار سفارش </p>

                  <Link href="/admin/orders">مشاهده سفارشات</Link>
                </div>
                <div className="card m-5 p-5 text-center bg-green-200">
                  <p className="text-xl">
                    {summary.productsCount} عدد محصول موجود در سایت{" "}
                  </p>

                  <Link href="/admin/products">مشاهده محصولات</Link>
                </div>
                <div className="card m-5 p-5 text-center bg-orange-200">
                  <p className="text-xl">{summary.usersCount} کاربر سایت </p>

                  <Link href="/admin/users">مشاهده کاربران</Link>
                </div>
              </div>
              <h2 className="text-xl text-gray-900 dark:text-gray-200">
                گزارشات فروش
              </h2>
              <Bar
                options={{
                  legend: { display: true, position: "right" },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
