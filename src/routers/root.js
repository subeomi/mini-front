import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const Loading = <LoadingPage></LoadingPage>

const Index = lazy(() => import("../pages/IndexPage"));
const Search = lazy(() => import("../pages/cool/SearchPage"));
const Character = lazy(() => import("../pages/cool/CharInfoPage"));
const ServerStatus = lazy(() => import("../pages/ServerStatusPage"));

const router = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Index /></Suspense>
    },
    {
        path: "character",
        element: <Suspense fallback={Loading}><Character /></Suspense>
    },
    {
        path: "search",
        element: <Suspense fallback={Loading}><Search /></Suspense>
    },
    {
        path: "server",
        element: <Suspense fallback={Loading}><ServerStatus /></Suspense>
    }
])

export default router;