import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 300000 ? 0 : 25000;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title=" سفارش نهایی -  ببین خرید">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">سفارش</h1>
      {cartItems.length === 0 ? (
        <div>
          سبد خرید شما خالی است.
          <div className="bg-green-700 p-2 rounded-lg">
            <Link href="/">بازگشت به فروشگاه</Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">آدرس</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </div>
              <div>
                <Link href="/shipping">ویرایش</Link>
              </div>
            </div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">روش پرداخت</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">ویرایش</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">سفارشات محصول</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-right">محصول</th>
                    <th className="    p-5 text-right">تعداد</th>
                    <th className="  p-5 text-right">قیمت</th>
                    <th className="p-5 text-right">قیمت کل</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">{item.price} تومان</td>
                      <td className="p-5 text-right">
                        {item.quantity * item.price} تومان
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">ویرایش</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">جزئیات سفارش</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>قیمت محصول</div>
                    <div>{itemsPrice} تومان </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>مالیات</div>
                    <div>{taxPrice} تومان </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>هزینه ارسال</div>
                    <div>{shippingPrice} تومان </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>قیمت نهایی</div>
                    <div>{totalPrice} تومان </div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? "در حال پردازش ..." : "ثبت نهایی سفارش"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
