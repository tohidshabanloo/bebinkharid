import "../styles/globals.css";
import "../styles/font.css";
import { SessionProvider } from "next-auth/react";
import { StoreProvide } from "../utils/Store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div dir="rtl">
      <main className="container">
        <SessionProvider session={session}>
          <StoreProvide>
            <Component {...pageProps} />
          </StoreProvide>
        </SessionProvider>
      </main>
    </div>
  );
}

export default MyApp;
