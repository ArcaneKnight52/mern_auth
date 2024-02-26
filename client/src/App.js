import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Demo from './pages/Demo';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Demo />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/dashboard" exact element={<Dashboard/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
