import style from './Perfil.module.css'
import natalie from "../../../assets/natalieperfil.jpg"
import axios from "axios"
import { useState } from 'react';
 
const Perfil = ({fn, createUser}) => {

  const [image, setImage] = useState(localStorage.getItem("image") || JSON.parse(localStorage.getItem("user"))?.image)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  const uploadUserImage = async (e) => {
    const files = e.target.files;
    const dato = new FormData();
    dato.append("file", files[0]);
    dato.append("upload_preset","natalie")
    dato.append("api_key","612393625364863")
    dato.append("timestamp", 0)
    const res = await axios.post("https://api.cloudinary.com/v1_1/dftvenl2z/image/upload", dato)
    await axios.put("/user", {id:JSON.parse(localStorage.getItem("user")).id, image:res.data.secure_url})
    localStorage.setItem("image", res.data.secure_url)
    setImage(res.data.secure_url)
  }


  return(
    <>
    <div className={style.container}>
      <div className={style.perfilContainerTop}>
        <div>
        <input onChange={uploadUserImage} className={style.inputFile} type="file"/>
        <img src={image ? image : natalie} className={style.img}/>
        </div>
        <div className={style.dataUser}>
          <h3>Datos del perfil</h3>
          {(user?.role == 1 || user?.role == 3) && <p><b>Nombre:</b> Doc. {user?.name} {user?.lastname}</p>}
          {user?.role == 2 && <p><b>Nombre:</b> {user?.name} {user?.lastname}</p>}
          {user?.role == 3 && <p><b>Rol:</b> Super admin</p>}
          {user?.role == 2 && <p><b>Rol:</b> Administrador</p>}
          {user?.role == 1 && <p><b>Rol:</b> Especialista</p>}
          {/* <p>Odontologa Estetica</p> */}
          {/* <p>Tarjeta profesional XXXXX</p> */}
          <p><b>Email:</b> {user?.email}</p>
        </div>
      </div>
      <div className={style.perfilContainerBottom}>
        <button className={style.button} onClick={fn}>Cambiar contraseña</button>
        {/* <button className={style.button} onClick={createUser}>Crear usuario</button> */}
      </div>
      </div>
    </>
  )
};

export default Perfil