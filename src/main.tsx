import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./RouteLayout";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

const router = Router();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AbstraxionProvider
      config={{
        treasury:
          "xion1ec2vfqsxpj36uwe05ahszvnapnm2f9vgfe6sjy50yuc9zey4w28qy0gpfv",
        rpcUrl: "https://rpc.xion-testnet-2.burnt.com:443",
        restUrl: "https://api.xion-testnet-2.burnt.com/",
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster expand visibleToasts={9} position="top-center" />
        </PersistGate>
      </Provider>
    </AbstraxionProvider>
  </StrictMode>
);
