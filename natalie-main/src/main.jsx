import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = "https://natalieback.onrender.com/"
//axios.defaults.baseURL = "http://localhost:3001/"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
