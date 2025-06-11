import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Category from "./page/Category";
import RequireAuth from "./components/RequireAuth";
import Home from "./page/Home";
import MyLayout from "./components/MyLayout";
import User from "./page/User";

const RouteerConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='/home' replace />} />

            <Route path="/login" element={<Login />} />
            {/* 巢狀驗證 */}
            <Route element={<RequireAuth />}>
                <Route path="/home" element={<Home />} />
                <Route element={<MyLayout />}>
                    <Route path="/category" element={<Category />} />
                    <Route path="/user" element={<User />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default RouteerConfig;