import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";


const Index = lazy(() => import("../pages/IndexPage"));
const Character = lazy(() => import("../pages/cool/CharInfoPage"))
const ServerStatus = lazy(() => import("../pages/ServerStatusPage"))

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
        path: "server",
        element: <Suspense><ServerStatus /></Suspense>
    }
])

export default router;