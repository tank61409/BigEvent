import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Category from "./page/Category";
import RequireAuth from "./components/RequireAuth";

const RouteerConfig = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />


            {/* 巢狀驗證 */}
            <Route  element={<RequireAuth />}>
                <Route path="/category" element={<Category />} />
            </Route>

        </Routes>
    )
}

export default RouteerConfig;