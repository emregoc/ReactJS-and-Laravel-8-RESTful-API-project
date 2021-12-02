import React from 'react'
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Index from './views/index/Index';
import Login from './views/login/Login';
import Register from './views/register/Register'
import NotFound from './views/not-found-page/NotFound';
import AddOperation from './views/operation/OperationAdd'

export default function Router() {
    return (
        <div>
            <Routes>    
                <Route exact path = "/" element = {<Index></Index>}></Route>
                <Route exact path = "/login" element = {<Login></Login>}></Route>
                <Route exact path = "/register" element = {<Register></Register>}></Route>
                <Route exact path = "/add-operation" element={<AddOperation></AddOperation>}></Route>
                <Route exact path = "*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </div>
    )
}
