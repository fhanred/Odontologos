import style from './Usuarios.module.css'
import { useEffect, useState } from 'react';
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Usuarios = ({find, createUser, users}) => {

  const [filterP, setFilterP] = useState()
  
  
  useEffect(() => {
    axios.get("/user")
    .then(({data}) => {setFilterP(data)})
  },[])

  useEffect(() => {
    setFilterP(users)
  },[users])
  
  // const reloadUser = () => {
  //   axios.get("/user")
  //   .then(({data}) => {setFilterP(data)})
  // }

  const deleteUser = async (id) => {
    await axios.delete("/user/"+id)
    alert("Eliminado con exito")
    axios.get("/user")
    .then(({data}) => {setFilterP(data)})
  }

  return(
    <>
    <Toaster position="top-center"/>
      <div className={style.pacientes}>
      <><h1>Usuarios</h1>
      {window.innerWidth < 1300 ? <Table className={style.tabla}>
      <Thead>
        <Tr>
          <Th className={style.topTd}>ID</Th>
          <Th className={style.topTd}>Nombres</Th>
          <Th className={style.topTd}>Rol</Th>
          <Th className={style.topTd}>Email</Th>
          <Th className={style.topTd}>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filterP?.map( u =>
          <Tr className={style.tr}>
          <Td className={style.td}>{u.id}</Td>
          <Td className={style.td}>{u.name} {u.lastname}</Td>
          {u.role == 1 && <Td className={style.td}>Especialista</Td>}
          {u.role == 2 && <Td className={style.td}>Administrador</Td>}
          {u.role == 3 && <Td className={style.td}>Super admin</Td>}
          <Td className={style.td} onClick={() => deleteUser(u.id)}>Borrar</Td>
          </Tr>)}
      </Tbody>
    </Table>:<table className={style.tabla}>
          <tr>
          <td className={style.topTd}>ID</td>
          <td className={style.topTd}>Nombres</td>
          <td className={style.topTd}>Rol</td>
          <td className={style.topTd}>Email</td>
          <td className={style.topTd}>Acciones</td>
          </tr>
          {filterP?.map( u =>
          <tr className={style.tr}>
          <td className={style.td}>{u.id}</td>
          <td className={style.td}>{u.name} {u.lastname}</td>
          {!u.role && <Td className={style.td}>Indefinido</Td>}
          {u.role == 1 && <td className={style.td}>Especialista</td>}
          {u.role == 2 && <td className={style.td}>Administrador</td>}
          {u.role == 3 && <Td className={style.td}>Super admin</Td>}
          <td className={style.td}>{u.email}</td>
          <td className={style.td} onClick={() => deleteUser(u.id)}>Borrar</td>
          </tr>)}
        </table>}
    <br></br>
        <button onClick={createUser} className={style.button}>Nuevo usuario</button></>
        <br></br>
      </div>
    </>
  )
};

export default Usuarios