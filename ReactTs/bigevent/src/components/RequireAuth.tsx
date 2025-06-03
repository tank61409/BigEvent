import { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => { 
    const token = localStorage.getItem('token')
    console.log("這裡是保護液面 "+token)
    return token ? <Outlet/> : <Navigate to='/login' replace/>
}

export default RequireAuth