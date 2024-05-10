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
import PacienteForm from './components/Panel/Pacientes/PacienteForm'
import Pacientes from './components/Panel/Pacientes/Pacientes'
import Perfil from './components/Panel/Perfil/Perfil'
import Usuarios from './components/Panel/Usuarios/Usuarios'
import Agenda from './components/Panel/Agenda/Agenda'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/control" element={<Control />} />
        <Route path="/financiero" element={<Financiero />} />
        <Route path="/consentimiento" element={<ConsentimientoTable />} />
        <Route path="/detallePaciente" element={<PacienteDetail />} />
        <Route path="/pacienteForm" element={<PacienteForm/>} />
        <Route path="/pacientes" element={<Pacientes/>} />


      </Routes>
    </>
  )
}

export default App



