import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="سفارشات کاربران - ببین خرید">
      <div className="grid md:grid-cols-4 md:gap-5 text-gray-900 dark:text-gray-200">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <a className=" text-gray-900 dark:text-gray-200">- داشبورد</a>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="text-gray-900 dark:text-gray-200"
              >
                <a className="mr-4 font-bold  text-gray-900 dark:text-gray-200">
                  > سفارشات
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/products">
                <a className=" text-gray-900 dark:text-gray-200">- محصولات</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <a className=" text-gray-900 dark:text-gray-200">- کاربران</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl">سفارشات کاربران</h1>

          {loading ? (
            <div>در حال پردازش...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-right">شناسه</th>
                    <th className="p-5 text-right">کاربر</th>
                    <th className="p-5 text-right">تاریخ</th>
                    <th className="p-5 text-right">قیمت</th>
                    <th className="p-5 text-right">وضعیت پرداخت</th>
                    <th className="p-5 text-right">وضعیت ارسال</th>
                    <th className="p-5 text-right">جزئیات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-5">{order._id.substring(20, 24)}</td>
                      <td className="p-5">
                        {order.user ? order.user.name : "کاربر حذف شده"}
                      </td>
                      <td className="p-5">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-5">${order.totalPrice}</td>
                      <td className="p-5">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : "پرداخت نشده"}
                      </td>
                      <td className="p-5">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : "ارسال نشده"}
                      </td>
                      <td className="p-5">
                        <Link href={`/order/${order._id}`} passHref>
                          <a>نمایش جزئیات</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
