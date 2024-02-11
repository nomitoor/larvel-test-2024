import React from "react";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Login from "@/pages/login";
import Register from "@/pages/register";

const AppRoutes = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                           // element={<HomePage />}
                    >
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default AppRoutes;