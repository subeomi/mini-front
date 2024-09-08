import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const Index = lazy(() => import("../pages/IndexPage"));
const Search = lazy(() => import("../pages/SearchPage"));
const Character = lazy(() => import("../pages/CharInfoPage"));
const ServerStatus = lazy(() => import("../pages/ServerStatusPage"));

// suspense => 컴포넌트 로딩 전까지(비동기) 보여줄 화면(fallback).
// 캐릭터창 '서버'데이터 가져오는 동안에만 스켈레톤로딩 -> fallback 제거함
const router = createBrowserRouter([
    {
        path: "",
        element: <Suspense><Index /></Suspense>
    },
    {
        path: "character",
        element: <Suspense fallback={<LoadingPage />}><Character /></Suspense>
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