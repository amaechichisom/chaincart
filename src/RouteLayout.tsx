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

const App = lazy(() => import("./App"));
const Shop = lazy(() => import("./page/Shop"));
const Cart = lazy(() => import("./page/Cart"));
const Product = lazy(() => import("./page/Product"));
const Seller = lazy(() => import("./page/Seller"));
const Buyer = lazy(() => import("./page/Buyer"));
const AuthPage = lazy(() => import("./page/AuthPage"));
const Listing = lazy(() => import("./page/Listing"));
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
        <Route path="auth" element={LazyWrapper(AuthPage)} />
         <Route path="/category" element={<CategoryPage />} />
          <Route path="/property">
            <Route index element={<PropertyDetailPage />} />
            <Route path=":id" element={<PropertyDetailPage />} />
          </Route>

        <Route element={<ProtectedRoutes allowedRoles={[Roles.BUYER, Roles.SELLER]} />} path="shop">
          <Route index element={LazyWrapper(Shop)} />
          <Route path="buyer_cart" element={LazyWrapper(Buyer)} />
          <Route path=":productId" element={LazyWrapper(Product)} />
          <Route path="product/:productId" element={LazyWrapper(Cart)} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={[Roles.SELLER]} />} path="seller">
          <Route index element={LazyWrapper(Seller)} />
          <Route path="listing" element={LazyWrapper(Listing)} />
        </Route>
      </Route>

      {/* Optional 404 fallback */}
      {/* <Route path="*" element={LazyWrapper(NotFound)} /> */}
    </>
  )
)
 };


