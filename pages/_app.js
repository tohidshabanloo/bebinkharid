import "../styles/globals.css";
import "../styles/font.css";
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvide } from "../utils/Store";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div dir="rtl">
      <ThemeProvider attribute="class">
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
      </ThemeProvider>
    </div>
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
