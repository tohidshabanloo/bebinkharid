import "../styles/globals.css";
import "../styles/font.css";

function MyApp({ Component, pageProps }) {
  return (
    <div dir="rtl">
      <main className="container">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
