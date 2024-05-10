import style from './Panel.module.css'
import Perfil from "./Perfil/Perfil"
import Financiero from './Financiero/Financiero';
import { useEffect, useState } from 'react';
import Agenda from './Agenda/Agenda';
import Control from './Control/Control';
import Pacientes from './Pacientes/Pacientes';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logonata.jpeg"
import axios from "axios"
import {HiMenu} from "react-icons/hi"
import {GrClose} from "react-icons/gr"
import toast , { Toaster } from 'react-hot-toast';
//import Cotizacion from './Cotizacion/Cotizacion';
import Usuarios from './Usuarios/Usuarios';
import precios from '../../precios';

const Panel = () => {

  const [page, setPage] = useState(1)
  const [changePass, setChangePass] = useState(false)
  const [changeDate, setChangeDate] = useState(null)
  const [newDate, setNewDate] = useState(false)
  const [find, setFind] = useState(null)
  const [createUser, setCreateUser] = useState(false)
  const [usuarios, setUsuarios] = useState()


  const navigate = useNavigate()

  const editarEvento = (id) => {
    setChangeDate(id)
  }

  const auth = async () => {
    if(!localStorage.getItem("token")) return navigate("/login")
    const {data} = await axios.post("/user/auth", {token:localStorage.getItem("token")})
      if(data.status){
        localStorage.setItem("image", data.user?.image)
        localStorage.setItem("user",JSON.stringify(data.user))
        return
      }
      return navigate("/login")
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("image")
    navigate("/login")
  }
  
  useEffect(() => {
    auth()
  },[])

  const [date, setDate] = useState([{id:"a"},{id:1}])

  const getDates = async () => {
    var data;
    if(JSON.parse(localStorage.getItem("user"))?.role == 2) {
      data = await axios.get("/calendar/all")
    }else{
      data = await axios.get("/calendar/"+JSON.parse(localStorage.getItem("user"))?.id)
    }
    console.log(data)
    const fechas = data?.data?.map(d => {
      return{
        id:d.id,
        title:d.title,
        start:new Date(d.start),
        end: new Date(d.end),
        resourceId:1,
        procedimiento:d.procedimiento
      }
      })
    setDate(fechas)
  }

  const nuevaFecha = async () => {
    await axios.post("/calendar", {
      title: form.title,
      start: new Date(form.start + "T" + form.hour + ":" + form.min),
      end: new Date(form.start + "T" + form.endhour + ":" + form.endmin),
      procedimiento: form.procedimiento,
      especialista:form.especialista
    })
    toast.success("Cita creada con exito")
    getDates()
  }

  useEffect(() => {
    getDates()
  },[])

  const [form, setForm] = useState({
    title: "",
    start: "",
    resourceId: 1,
    hour:"01",
    min:"00",
    endhour:"01",
    endmin:"00",
    especialista: 1,
  })

  const [formPass, setFormPass] = useState({
    id:JSON.parse(localStorage.getItem("user"))?.id,
    newpass:"",
    newpass2:"",
    oldpass:""
  })

  const handleForm = (name, value) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  const deleteDate = async () => {
    await axios.delete("/calendar/"+changeDate)
    setChangeDate(false)
    toast.success("Cita eliminada con exito")
    getDates()
  } 

  const handleFormPass = (e) => {
    setFormPass({
      ...formPass,
      [e.target.name]:e.target.value
    })
  }

  const [formCreateUser, setFormCreateUser] = useState()

  const handleFormCreateUser = (e) => {
    setFormCreateUser({
      ...formCreateUser,
      [e.target.name]:e.target.value
    })
  }

  const saveChangePass = async () => {
    if(formPass.newpass !== formPass.newpass2) return toast.error("Las contraseñas no coinciden")
    const {data} = await axios.put("/user", formPass)
    setChangePass(false)
    toast(data.users)
  }

  const [pacientes, setPacientes] = useState()

  useEffect(() => {
    axios.get("/client/all").then(({ data }) => setPacientes(data))
    axios.get("/user").then(({ data }) => setEspecialista(data))
  }, [])

  const [dateSelected, setDateSelected] = useState()

  const [especialista, setEspecialista] = useState()

  useEffect(() => {
    const dateSelect = date.find(d => d.id == changeDate)
    setDateSelected(dateSelect)
  },[changeDate])

  const [visible, setVisible] = useState(false)

  const createNewUser = async () => {
    if(formCreateUser.newpass !== formCreateUser.newpass2) return alert("Las contraseñas no coinciden")
    await axios.post("/user", {...formCreateUser, password:formCreateUser.newpass})
    setCreateUser(false)
    const {data} = await axios.get("/user")
    setUsuarios(data) 
    console.log(data)
    alert("Creado con exito")
  }

  return (
    <>
    <Toaster position='top-center'/>
      {changePass && <div className={style.modal}>
        <div className={style.windows}>
          <h2 className={style.title}>Cambiar contraseña</h2>
          <div className={style.inputContainer}>
            <input type="password" onChange={handleFormPass} name="oldpass" value={formPass.oldpass} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Contraseña anterior</label>
          </div>
          <div className={style.inputContainer}>
            <input type="password" onChange={handleFormPass} name="newpass" value={formPass.newpass} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Nueva contraseña</label>
          </div>
          <div className={style.inputContainer}>
            <input type="password" onChange={handleFormPass} name="newpass2" value={formPass.newpass2} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Repite la contraseña</label>
          </div>
          <button className={style.button} onClick={saveChangePass}>Confirmar</button>
          <br></br>
          <br></br>
          <button className={style.button} onClick={() => setChangePass(false)}>Atras</button>
        </div>
      </div>}
      {createUser && <div className={style.modal}>
        <div className={style.windows}>
          <h2 className={style.title}>Crear usuario</h2>
          <div className={style.inputContainer}>
            <input type="text" onChange={handleFormCreateUser} name="name" value={formCreateUser?.name} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Nombre</label>
          </div>
          <div className={style.inputContainer}>
            <input type="text" onChange={handleFormCreateUser} name="lastname" value={formCreateUser?.lastname} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Apellido</label>
          </div>
          <div className={style.inputContainer}>
            <input type="text" onChange={handleFormCreateUser} name="email" value={formCreateUser?.email} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Email</label>
          </div>
          <div className={style.inputContainer}>
        <select name="role" onChange={handleFormCreateUser} className={style.input}>
          <option selected>Selecciona un rol</option>
            <option value="1">Especialista</option>
            <option value="2">Administrador</option>
            <option value="3">Super admin</option>
            </select>
          <label className={style.textInput}>Rol</label>
        </div>
          <div className={style.inputContainer}>
            <input type="password" onChange={handleFormCreateUser} name="newpass" value={formCreateUser?.newpass} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Contraseña</label>
          </div>
          <div className={style.inputContainer}>
            <input type="password" onChange={handleFormCreateUser} name="newpass2" value={formCreateUser?.newpass2} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Repite la contraseña</label>
          </div>
          <button className={style.button} onClick={createNewUser}>Confirmar</button>
          <br></br>
          <br></br>
          <button className={style.button} onClick={() => setCreateUser(false)}>Atras</button>
        </div>
      </div>}
      {changeDate && <div className={style.modal}>
        <div className={style.windows}>
          <h2 className={style.title}>{dateSelected?.title}</h2>
          <p className={style.title}><b>Procedimiento:</b> {dateSelected?.procedimiento}</p>
          <p className={style.title}><b>Hora:</b> {new Date(dateSelected?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: true })} - {new Date(dateSelected?.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: true })}</p>
          <div className={style.buttons}>
            <button className={style.button} onClick={() => setChangeDate(false)}>Cerrar</button>
            <button className={style.buttonDelete} onClick={deleteDate}>Eliminar</button>
          </div>
        </div>
      </div>}
      {newDate && <div className={style.modal}>
        <div className={style.windows}>
          <h2 className={style.title}>Nuevo evento</h2>
          <div className={style.inputContainer}>
            <select name="title" onChange={(e) => handleForm(e.target.name, e.target.value)} className={style.input} placeholder=' '>
              <option selected value={null}>Seleccionar</option>
              {pacientes.map(p => <option value={`${p.name}`}>{p.name}</option>)}
            </select>
            <label className={style.textInput}>Paciente</label>
          </div>
          <div className={style.inputContainer}>
            <select name="procedimiento" onChange={(e) => handleForm(e.target.name, e.target.value)} className={style.input}>
              {precios?.map (p => <option value={p.label}>{p.label}</option>)}
            </select>
            <label className={style.textInput}>Procedimiento</label>
          </div>
          <div className={style.inputContainer}>
            <input type="date" name="start" onChange={(e) => handleForm(e.target.name, e.target.value)} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Fecha</label>
          </div>
          <div className={style.inputContainer}>
          <input type="time" className={style.input} name="hour" onChange={(e) => handleForm(e.target.name, e.target.value)}/>
          <label className={style.textInput}>Hora inicio</label>
          </div>
          <div className={style.inputContainer}>
          <input type="time" className={style.input} name="endhour" onChange={(e) => handleForm(e.target.name, e.target.value)}/>
          <label className={style.textInput}>Hora fin</label>
          </div>
          <div className={style.inputContainer}>
            <select name="especialista" onChange={(e) => handleForm(e.target.name, e.target.value)} className={style.input} placeholder=' '>
              <option selected value={null}>Seleccionar</option>
              {especialista.filter(e => e.role == 1 || e.role == 3).map(p => <option value={p.id}>{p.name} {p.lastname}</option>)}
            </select>
            <label className={style.textInput}>Especialista</label>
          </div>
            <button className={style.button} onClick={() => {nuevaFecha(); setNewDate(false)}}>Guardar</button>
            <button className={style.buttonDelete} onClick={() => setNewDate(false)}>Cerrar</button>
        </div>
      </div>}

      {window.innerWidth > 1300 ? <nav className={style.nav}>
        <h3 className={style.title}>Mi perfil</h3>
        <ul className={style.ul}>
        {/* <li onClick={() => setPage(0)} className={style.li}><AiOutlineUser className={style.icon}/> Información</li>
        <li onClick={() => setPage(1)} className={style.li}><MdPayment className={style.icon}/> Mis compras</li>
        { user?.role == 3 && <li onClick={() => {setPage(2); dispatch(setPagina(1))}} className={style.li}><FiUsers className={style.icon}/> Usuarios</li>}        
        { user?.role == 3 &&<li onClick={() => {setPage(3) ; dispatch(setPagina(1))}} className={style.li}><BsBoxSeam className={style.icon}/> Paquetes</li>}
        { user?.role == 3 &&<li onClick={() => setPage(4)} className={style.li}><MdOutlineLocalOffer className={style.icon}/> Promocion</li>}
        { user?.role >= 2 &&<li onClick={() => {setPage(5) ; dispatch(setPagina(1))}} className={style.li}><FaChalkboardTeacher className={style.icon}/> Capacitaciones</li>}
        <li onClick={() => navigate("/")} className={style.li}><FaChalkboardTeacher className={style.icon}/> Volver</li>
        <li onClick={() => {navigate("/"); localStorage.removeItem("token"); dispatch(setUser(false))}} className={style.li}><MdExitToApp className={style.icon}/> Cerrar sesion</li> */}
        </ul>
      </nav>: ( visible ? <nav className={style.navMobile}>
        <h3 className={style.titleMobile} onClick={() => setVisible(false)}><GrClose/></h3>
        <ul className={style.ul}>
        <li className={page == 1 ? style.liSelected : style.li} onClick={() => {setPage(1); setVisible(false)}}>Perfil</li>
            {JSON.parse(localStorage.getItem("user"))?.role >= 2 && <li className={page == 2 ? style.liSelected : style.li} onClick={() => {setPage(2); setVisible(false)}}>Control financiero</li>}
            <li className={page == 3 ? style.liSelected : style.li} onClick={() => {setPage(3); setVisible(false)}}>Agenda</li>
            {JSON.parse(localStorage.getItem("user"))?.role >= 2 && <li className={page == 4 ? style.liSelected : style.li} onClick={() => {setPage(4); setVisible(false)}}>Control ambiental y limpieza</li>}
            <li className={page == 5 ? style.liSelected : style.li} onClick={() => {setPage(5); setVisible(false)}}>Pacientes</li>
            {JSON.parse(localStorage.getItem("user"))?.role >= 2 && <li className={page == 6 ? style.liSelected : style.li} onClick={() => {setPage(6); setVisible(false)}}>Usuarios</li>}
            {JSON.parse(localStorage.getItem("user"))?.role >= 2 && <li className={page == 7 ? style.liSelected : style.li} onClick={() => {setPage(7); setVisible(false)}}>Cotizaciones</li>}
            <li className={style.li} onClick={logout}>Cerrar sesion</li>
        </ul>
      </nav> : <h1 className={style.close} onClick={() => setVisible(true)}><HiMenu/></h1>)}

      {window.innerWidth > 1300 && <nav className={style.nav}>
        <img className={style.logo} src={logo} />
        <h1 className={style.saludo}>Hola {JSON.parse(localStorage.getItem("user"))?.name}! 👋</h1>
        <input placeholder="Buscar paciente" onChange={(e) => {setFind(e.target.value); setPage(5)}} className={style.findInput} />
        {/* <button onClick={() => setPage(5)}>Buscar</button> */}
      </nav>}
      <div className={style.flexContainer}>
        {window.innerWidth > 1300 && <div className={style.navigator}>
          <ul className={style.ul}>
            <li className={page == 1 ? style.liSelected : style.li} onClick={() => setPage(1)}>Perfil</li>
            {JSON.parse(localStorage.getItem("user"))?.role >= 2 && <li className={page == 2 ? style.liSelected : style.li} onClick={() => setPage(2)}>Control financiero</li>}
            <li className={page == 3 ? style.liSelected : style.li} onClick={() => setPage(3)}>Agenda</li>
            {JSON.parse(localStorage.getItem("user"))?.role >= 2 && <li className={page == 4 ? style.liSelected : style.li} onClick={() => setPage(4)}>Control ambiental y limpieza</li>}
            <li className={page == 5 ? style.liSelected : style.li} onClick={() => setPage(5)}>Pacientes</li>
            {JSON.parse(localStorage.getItem("user"))?.role >= 2 && <li className={page == 6 ? style.liSelected : style.li} onClick={() => setPage(6)}>Usuarios</li>}
            {JSON.parse(localStorage.getItem("user"))?.role >= 2 && <li className={page == 7 ? style.liSelected : style.li} onClick={() => setPage(7)}>Cotizaciones</li>}
            <li className={style.li} onClick={logout}>Cerrar sesion</li>
          </ul>
        </div>}
        <div className={style.panelContainer}>
          {page == 1 && <Perfil fn={() => setChangePass(true)} />}
          {page == 2 && <Financiero />}
          {page == 3 && <Agenda fn={editarEvento} date={date} newDate={() => setNewDate(true)} />}
          {page == 4 && <Control />}
          {page == 5 && <Pacientes find={find} />}
          {page == 6 && <Usuarios users={usuarios} createUser={() => setCreateUser(true)}/>}
          {page == 7 && <Cotizacion />}
        </div>
      </div>
    </>
  )
};

export default Panel