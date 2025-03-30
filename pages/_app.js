import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from "react";
import Layout from "../components/layout/layout";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const { title } = pageProps;
  
  return(
    <Layout title={title}>
      <Component {...pageProps} />
    </Layout>
  );
}
