import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Category from "./page/Category";
import RequireAuth from "./components/RequireAuth";
import Home from "./page/Home";
import MyLayout from "./components/MyLayout";

const RouteerConfig = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* 巢狀驗證 */}
            <Route element={<RequireAuth />}>
                <Route element={<MyLayout />}>
                    <Route path="/category" element={<Category />}/>
                </Route>
            </Route>

        </Routes>
    )
}

export default RouteerConfig;