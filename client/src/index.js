import React from "react";
import { BrowserRouter as Router } from "react-router-dom"

import "./index.css";
import App from './App';

import { createRoot } from 'react-dom/client';
import { StateProvider } from "./context/StateProvider"
import { initialState } from "./context/initialState"
import  reducer from "./context/reducer";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Router>
            <StateProvider initialState={initialState} reducer={reducer}>
                <App />
            </StateProvider>
        </Router>
    </React.StrictMode>);