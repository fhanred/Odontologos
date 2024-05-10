import style from './Pacientes.module.css'
import { useEffect, useState } from 'react';
import PacienteDetail from './PacienteDetail';
import PacienteForm from './PacienteForm';
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Pacientes = ({find}) => {

  const [pacienteId, setPacienteId] = useState(null)
  const [create, setCreate] = useState(false)


  const [pacientes, setPacientes] = useState()
  
  const [filterP, setFilterP] = useState()
  
  const newClient = () => {
    setPacienteId(null); 
  }
  
  useEffect(() => {
    axios.get("/client/all")
    .then(({data}) => {setPacientes(data); setFilterP(data)})
  },[])
  
  const updateUsers = () => {
    axios.get("/client/all")
    .then(({data}) => {setPacientes(data); setFilterP(data)})
  }

  useEffect(() => {
    if(!find?.length){
      return setFilterP(pacientes)
    }else{
      setFilterP(pacientes?.filter(p => p.cedula.includes(find)))
    }
  },[find])

  return(
    <>
    <Toaster position="top-center"/>
      <div className={style.pacientes}>
      { create == false && pacienteId == null && <><h1>Pacientes</h1>
      {window.innerWidth < 1300 ? <Table className={style.tabla}>
      <Thead>
        <Tr>
          <Th className={style.topTd}>Cedula</Th>
          <Th className={style.topTd}>Nombres</Th>
          <Th className={style.topTd}>Fecha</Th>
          <Th className={style.topTd}>Ultimo proc.</Th>
          <Th className={style.topTd}>Proxima cita</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filterP?.map( u =>
          <Tr className={style.tr} onClick={() => setPacienteId(u.id)}>
          <Td className={style.td}>{u.cedula}</Td>
          <Td className={style.td}>{u.name}</Td>
          <Td className={style.td}>{u.date}</Td>
          <Td className={style.td}>{u.ulpro}</Td>
          <Td className={style.td}>En proceso</Td>
          </Tr>)}
      </Tbody>
    </Table>:<table className={style.tabla}>
          <tr>
          <td className={style.topTd}>Cedula</td>
          <td className={style.topTd}>Nombre y apellido</td>
          <td className={style.topTd}>Fecha</td>
          <td className={style.topTd}>Ultimo procedimiento</td>
          <td className={style.topTd}>Proxima cita</td>
          </tr>
          {filterP?.map( u =>
          <tr className={style.tr} onClick={() => setPacienteId(u.id)}>
          <td className={style.td}>{u.cedula}</td>
          <td className={style.td}>{u.name}</td>
          <td className={style.td}>{u.date}</td>
          <td className={style.td}>{u.ulpro}</td>
          <td className={style.td}>En proceso</td>
          </tr>)}
        </table>}
    <br></br>
        <button onClick={() => setCreate(true)} className={style.button}>Nuevo paciente</button></>}
        {/* { create == false && pacienteId == null && <><h1>Pacientes</h1>
        <table className={style.tabla}>
          <tr>
          <td className={style.topTd}>Cedula</td>
          <td className={style.topTd}>Nombre y apellido</td>
          <td className={style.topTd}>Fecha</td>
          <td className={style.topTd}>Ultimo procedimiento</td>
          <td className={style.topTd}>Proxima cita</td>
          </tr>
          {filterP?.map( u =>
          <tr className={style.tr} onClick={() => setPacienteId(u.id)}>
          <td className={style.td}>{u.cedula}</td>
          <td className={style.td}>{u.name}</td>
          <td className={style.td}>{u.date}</td>
          <td className={style.td}>{u.ulpro}</td>
          <td className={style.td}>En proceso</td>
          </tr>)}
        </table>
        <br></br>
        <button onClick={() => setCreate(true)} className={style.button}>Nuevo paciente</button>
        </>} */}
        {create && <PacienteForm updateUsers={() => updateUsers()} back={() => setCreate(false)}/>}
        {pacienteId !== null && <PacienteDetail pacienteId={pacienteId} back={() => newClient()}/>}
        <br></br>
      </div>
    </>
  )
};

export default Pacientes