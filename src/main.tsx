import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./RouteLayout";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from 'sonner';
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "./index.css";

//? new treasure
//? xion1ec2vfqsxpj36uwe05ahszvnapnm2f9vgfe6sjy50yuc9zey4w28qy0gpfv
// const seatContractAddress =
//   "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka";

// // Legacy config with individual params for stake, bank and contracts
// export const legacyConfig = {
//   contracts: [
//     // Usually, you would have a list of different contracts here
//     seatContractAddress,
//     {
//       address: seatContractAddress,
//       amounts: [{ denom: "uxion", amount: "1000000" }],
//     },
//   ],
//   stake: true,
//   bank: [
//     {
//       denom: "uxion",
//       amount: "1000000",
//     },
//   ],
//   // Optional params to activate mainnet config
//   // rpcUrl: "https://rpc.xion-mainnet-1.burnt.com:443",
//   // restUrl: "https://api.xion-mainnet-1.burnt.com:443",
// };

/**
 * Treasury 1: xion17d2029pa5p9u392ja4etyg6smvdk6lsnh64mu66rs075jrs4nevs37cn3s
Treasury 2: xion1pznw0ptf2gfkvc6u7tu6k09sm26m99dlfksen5cm2gqfp4qkmjgqzhgr4k
 Treasury 3:xion1uyq35hcqnfqcgygkrvkee3slx58wwc357zpqdk7hcd78fz4wtyqqtm3c76
 */
const router = Router();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
       <AbstraxionProvider
        config={
        {
          // treasury: "xion17d2029pa5p9u392ja4etyg6smvdk6lsnh64mu66rs075jrs4nevs37cn3s",
          // treasury: "xion1pznw0ptf2gfkvc6u7tu6k09sm26m99dlfksen5cm2gqfp4qkmjgqzhgr4k",
          treasury: "xion1ec2vfqsxpj36uwe05ahszvnapnm2f9vgfe6sjy50yuc9zey4w28qy0gpfv",
          rpcUrl: "https://rpc.xion-testnet-2.burnt.com:443",
          restUrl: "https://api.xion-testnet-2.burnt.com/",
          
                  
        }
        }
        // config={treasuryConfig}
        >    
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster expand visibleToasts={9} position="top-center"  />
    </Provider>
       </AbstraxionProvider>
  </StrictMode>
);
