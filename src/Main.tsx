import { createTheme, ThemeProvider } from "@mui/material";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  SolongWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { CookiesProvider } from 'react-cookie';
import { useMemo, useEffect, useCallback } from "react";

import Home from "./Home";
import Header from "./components/Header";
import { rpcHost, candyMachineId, network } from "./config";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: [
      'Sniglet !important',
    ].join(','),
  },
  // overrides: {
  //   MuiButtonBase: {
  //     root: {
  //       justifyContent: "flex-start",
  //     },
  //   },
  //   MuiButton: {
  //     root: {
  //       textTransform: undefined,
  //       padding: "12px 16px",
  //     },
  //     startIcon: {
  //       marginRight: 8,
  //     },
  //     endIcon: {
  //       marginLeft: 8,
  //     },
  //   },
  // },
});

const Main = ({}) => {
  // Custom RPC endpoint.
  const endpoint = useMemo(() => rpcHost, []);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
      new SafePalWalletAdapter(),
      new SlopeWalletAdapter({ network }),
      new SolflareWalletAdapter({ network }),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
      new SolongWalletAdapter(),
    ],
    []
  );

  useEffect(()=>{
    // import('bootstrap/dist/js/bootstrap')
    // import("bootstrap/dist/js/bootstrap");
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  const stickyHeader = useCallback(()=>{
    const header = document.getElementById("headerMain");

    const position = window.scrollY;
  
    if (position > 0) {
      return header?.classList.add("sticky");
    }
  
    header?.classList.remove("sticky");
  }, [])

  const toggleMobileMenu = useCallback(()=>{
    const menuBtn = document.getElementById("menuBtn");
    const menuBtnClose = document.getElementById("menuBtnClose");
    const navbar = document.getElementById("navbarMobile");

    function toggleNavbar() {
      navbar?.classList.toggle("show");
      document.body.classList.toggle("overflow-hidden");
    }

    menuBtn?.addEventListener("click", toggleNavbar);
    menuBtnClose?.addEventListener("click", toggleNavbar);
  }, [])

  useEffect(()=>{
    window.addEventListener("DOMContentLoaded", stickyHeader);
    window.addEventListener("DOMContentLoaded", toggleMobileMenu);
    window.addEventListener("scroll", stickyHeader);
  }, [stickyHeader, toggleMobileMenu]);

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={true}>
          <WalletModalProvider>
            <CookiesProvider>
              <Header></Header>
              <Home candyMachineId={candyMachineId} />
            </CookiesProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default Main;
