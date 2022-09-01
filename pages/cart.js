import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <Layout title="سبد خرید">
      <h1 className="mb-4 text-xl">سبد خرید</h1>
      {cartItems.length === 0 ? (
        <div>
          سبد شما خالی است. <Link href="/">بازگشت به صفحه محصولات</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px=5 text-right">نوع کالا</th>
                  <th className="p-5 text-right">تعداد</th>
                  <th className="p-5  text-right">قیمت کالا (تومان)</th>
                  <th className="p-5  text-right">حذف کالا</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center p-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={70}
                            height={70}
                          ></Image>
                          &nbsp;
                          <div className="pr-2">{item.name}</div>
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-left">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-5" text-left>
                      {item.price} تومان
                    </td>
                    <td className="p-5" text-center>
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-8 w-8"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 ">
            <ul>
              <li>
                <div className="pb-3 text-xl ">
                  قیمت نهایی تعداد (
                  {cartItems.reduce((a, c) => a + c.quantity, 0)} محصول) :{" "}
                  <div className="text-center pt-10 text-red-500 ">
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}{" "}
                    تومان
                  </div>
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("/shipping")}
                  className="primary-button w-full text-black"
                >
                  پرداخت
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
