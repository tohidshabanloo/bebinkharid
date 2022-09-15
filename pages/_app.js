import "../styles/globals.css";
import "../styles/font.css";
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvide } from "../utils/Store";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) =>
      url == router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    router.events.on("routerChangeStart", handleStart);
    router.events.on("routerChangeComplete", handleComplete);
    router.events.on("routerChangeError", handleComplete);

    return () => {
      router.events.off("routerChangeStart", handleStart);
      router.events.off("routerChangeComplete", handleComplete);
      router.events.off("routerChangeError", handleComplete);
    };
  });
  return (
    loading && (
      <div className="h-screen w-screen flex justify-center items-center fixed top-0 left-0 bg-white">
        <div className="absolute h-16 w-16" />
      </div>
    )
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Loading />
      <div dir="rtl">
        <main className="container">
          <SessionProvider session={session}>
            <StoreProvide>
              <PayPalScriptProvider deferLoading={true}>
                {Component.auth ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </PayPalScriptProvider>
            </StoreProvide>
          </SessionProvider>
        </main>
      </div>
    </>
  );
}
function Auth({ children }) {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=ابتدا باید وارد سایت شوید");
    },
  });
  if (status === "loading") {
    return <div>بارگزاری...</div>;
  }
  // if (adminOnly && !session.user.isAdmin) {
  //   router.push("/unauthorized?message=admin login required");
  // }

  return children;
}
export default MyApp;
