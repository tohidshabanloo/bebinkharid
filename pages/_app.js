import "../styles/globals.css";
import "../styles/font.css";
import { StoreProvide } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <div dir="rtl">
      <main className="container">
        <StoreProvide>
          <Component {...pageProps} />
        </StoreProvide>
      </main>
    </div>
  );
}

export default MyApp;
