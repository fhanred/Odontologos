import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Panel from './components/Panel/Panel'
import Politicas from './components/Politicas/Politicas'
import Terminos from './components/Politicas/Terminos'
import Control from './components/Panel/Control/Control'
import Financiero from './components/Panel/Financiero/Financiero'
import ConsentimientoTable from './components/Panel/Pacientes/ConsentimientoTable'
import PacienteDetail from './components/Panel/Pacientes/PacienteDetail'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/control" element={<Control />} />
        <Route path="/financiero" element={<Financiero />} />
        <Route path="/consentimiento" element={<ConsentimientoTable />} />
        <Route path="/detallePaciente" element={<PacienteDetail />} />



      </Routes>
    </>
  )
}

export default App



