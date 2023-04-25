import React from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/main.css";
import '../styles/main.res.css';
// import '../styles/modal.css';

const App = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  )
};

export default App; 
