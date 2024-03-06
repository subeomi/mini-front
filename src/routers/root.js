import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";


const Index = lazy(() => import("../pages/IndexPage"));
const Search = lazy(() => import("../pages/cool/SearchPage"));
const Character = lazy(() => import("../pages/cool/CharInfoPage"));
const ServerStatus = lazy(() => import("../pages/ServerStatusPage"));

const router = createBrowserRouter([
    {
        path: "",
        element: <Suspense><Index /></Suspense>
    },
    {
        path: "character",
        element: <Suspense><Character /></Suspense>
    },
    {
        path: "search",
        element: <Suspense><Search /></Suspense>
    },
    {
        path: "server",
        element: <Suspense><ServerStatus /></Suspense>
    }
])

export default router;