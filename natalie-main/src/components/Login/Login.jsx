import style from './Login.module.css'
import logo from "../../assets/logonata.jpeg"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState } from 'react';

const Login = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email:"",
    password:""
  })

  const authenticate = async () => {
    const {data} = await axios.post("/user/verify", form)
    if(data.status) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      return navigate("/panel")
    }
    alert("Credenciales invalidas")
  }

  const auth = async () => {
    if(!localStorage.getItem("token")) return
    const {data} = await axios.post("/user/auth", {token:localStorage.getItem("token")})
      if(data.status) {
        navigate("/panel")
        localStorage.setItem("user",JSON.stringify(data.user))
        return
      }
      return
  }
  
  useEffect(() => {
    auth()
  },[])

  return(
    <div className={style.login}>
      <div className={style.loginContainer}>
        <img className={style.logo} src={logo}/>
        {/* <h1 className={style.title}>Iniciar sesion</h1> */}
        <div className={style.inputContainer}>
        <input name="email" value={form?.email} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} className={style.input} placeholder=' '></input>
        <label className={style.textInput}>Email</label>
        </div>
        <div className={style.inputContainer}>
        <input type="password" name="password" value={form?.password} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})} className={style.input} placeholder=' '></input>
        <label className={style.textInput}>Contraseña</label>
        </div>
        <button className={style.button} onClick={authenticate}>Ingresar</button>
        {/* <br></br> */}
        {/* <br></br> */}
        {/* <button className={style.button} onClick={() => navigate("/")}>Volver</button> */}
        <p className={style.olvidemipass}>Olvide mi contraseña</p>
        <p className={style.text}>¿Aun no tienes cuenta?</p>
        <p className={style.registro}>Registrate</p>
      </div>
    </div>
  )
};

export default Login