import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./page/Layout";
import ErrorBoundary from "./page/ErrorBoundary";
import Preload from "./components/shared/Preload";
import ProtectedRoutes from "./page/ProtectedRoutes";
import { Roles } from "./@types/types";
import CategoryPage from "./page/CategoryPage";
import PropertyDetailPage from "./page/PropertyDetailPage";
import SellerProduct from "./components/Seller/SellerProduct";
import PropertyListing from "./components/Seller/PropertyListing";
import SellerSetting from "./components/Seller/SellerSetting";
import ProtectedSellerRoutes from "./page/ProtectedSellerRoutes";

const App = lazy(() => import("./App"));
const Seller = lazy(() => import("./page/Seller"));
const AuthPage = lazy(() => import("./page/AuthPage"));
const ListingPage = lazy(() => import("./page/ListingPage"));
const Kyc = lazy(() => import("./page/Kyc"));
// const NotFound = lazy(() => import("./page/NotFound"));

const LazyWrapper = (Component: React.ComponentType) => (
  <Suspense fallback={<Preload />}>
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  </Suspense>
);
export default function RouteLayout() {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={LazyWrapper(App)} />
          <Route path="kyc" element={LazyWrapper(Kyc)} />
          <Route path="auth" element={LazyWrapper(AuthPage)} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/property">
            <Route index element={<PropertyDetailPage />} />
            <Route path=":id" element={<PropertyDetailPage />} />
          </Route>


          <Route
            element={<ProtectedRoutes allowedRoles={[Roles.SELLER]} />}
            path="seller"
          >
            <Route index element={LazyWrapper(Seller)} />
            <Route element={<ProtectedSellerRoutes />}>
              <Route path="settings" element={<SellerSetting />} />
              <Route path="listing">
                <Route index element={LazyWrapper(ListingPage)} />
                <Route path=":id" element={<SellerProduct />} />
                <Route path="PostAds" element={<PropertyListing />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Optional 404 fallback */}
        {/* <Route path="*" element={LazyWrapper(NotFound)} /> */}
      </>
    )
  );
}
