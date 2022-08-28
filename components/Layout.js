/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title ? title : "ببین خرید"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <div className="flex justify-between gap-4">
              <img width={25} height={20} src="/images/logo.png" alt="" />
              <Link href="/">
                <a className="text-lg font-bold flex">ببین خرید</a>
              </Link>
            </div>

            <div>
              <Link href="/cart">
                <a className="p-2">کارت</a>
              </Link>
              <Link href="/login">
                <a className="p-2">ورود</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>فروشگاه ببین خرید - 1401</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
