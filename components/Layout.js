/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";

const Layout = ({ children, title }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART-RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      <Head>
        <title>{title ? title : "ببین خرید"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen w-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <div className="flex justify-between gap-4">
              <img width={25} height={20} src="/images/logo.png" alt="" />
              <Link href="/">
                <a className="text-lg font-bold flex">ببین خرید</a>
              </Link>
            </div>

            <div className="flex gap-4 px-4">
              <Link href="/cart">
                <a className="flex col mt-2">
                  {cartItemsCount > 0 && (
                    <span className="ml-0 mt-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>{" "}
                  کارت{" "}
                </a>
              </Link>

              {status === "loading" ? (
                <div className="flex col mt-2">پردازش ...</div>
              ) : session?.user ? (
                <div className="flex col mt-2">
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-yellow-600">
                      {session.user.name} عزیز خوش آمدید
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg text-black ">
                      <Menu.Item>
                        <DropdownLink href="/profile" className="dropdown-link">
                          پروفایل
                        </DropdownLink>
                      </Menu.Item>

                      <Menu.Item>
                        <DropdownLink href="/profile" className="dropdown-link">
                          گزارشات خرید
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          href="#"
                          className="dropdown-link"
                          onClick={logoutClickHandler}
                        >
                          خروج
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              ) : (
                <Link href="/login">
                  <a className="flex col mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    ورود | ثبت‌نام
                  </a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-2 pl-8">{children}</main>
        <footer className="h-10 justify-between items-center shadow-inner bg-green-50  pt-2">
          <div className="flex justify-between">
            <div className="mr-10">فروشگاه اینترنتی ببین خرید</div>
            <div className="ml-10">
              توسط {""}
              <a
                className="text-orange-700"
                href="https://www.tohidsh.com"
                target="_blank"
                rel="noreferrer"
              >
                توحید شعبانلو
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
