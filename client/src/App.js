import { getAuth, getIdToken } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login } from './components'
import { app } from './config/firebase.config'
import { AnimatePresence } from 'framer-motion'
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider"
import { actionType } from "./context/reducer"

const App = () => {
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [{user}, dispatch] = useStateValue();

    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") ===
        "true")

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    validateUser(token).then((data) => {
                        dispatch({
                            type : actionType.SET_USER,
                            user : data,
                        });
                    });
                });
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                navigate("/login")
                dispatch({
                    type : actionType.SET_USER,
                    user : null,
                });
            }
        })
    }, [])
    return (
        <AnimatePresence mode='wait'>
            <div className='h-auto min-w-[680px] bg-primary flex justify-center items-center'>
                <Routes>
                    <Route path='/login' element={<Login setAuth={setAuth} />} />
                    <Route path='/*' element={<Home />} />
                </Routes>
            </div>
        </AnimatePresence>

    )
}

export default App