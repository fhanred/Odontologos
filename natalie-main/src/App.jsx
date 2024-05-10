import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Panel from './components/Panel/Panel'
import Politicas from './components/Politicas/Politicas'
import Terminos from './components/Politicas/Terminos'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>
    </>
  )
}

export default App



