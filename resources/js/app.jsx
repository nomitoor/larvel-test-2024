import './bootstrap';
import '../css/app.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/login/index.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/index.tsx";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);