import { useNavigate } from 'react-router-dom'
import style from './PacienteForm.module.css'
import CanvasDraw from 'react-canvas-draw'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'

const PacienteForm = ({ back, updateUsers }) => {

  const refCanva = useRef()

  const [user,setUser]= useState()

  const [form, setForm] = useState()
  var formCheck = []

  const uploadImage = async (e) => {
    const files = e.target.files;
    const dato = new FormData();
    dato.append("file", files[0]);
    dato.append("upload_preset","natalie")
    dato.append("api_key","612393625364863")
    dato.append("timestamp", 0)
    const res = await axios.post("https://api.cloudinary.com/v1_1/dftvenl2z/image/upload", dato)
    setForm({...form, image:res.data.secure_url})
    console.log(res.data.secure_url)
  }

  const handleForm = (e) => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
  }

  const handleFormCheck = (e) => {
    const {name,checked} = e.target
    formCheck[name] = checked
  }

  useEffect(() => {
    axios.get("/client/1")
    .then(({data}) => setUser(data))
  },[])

  const createClient = async () => {
    await axios.post("/client", {...form, form: formCheck, firma: refCanva.current.getSaveData(), date:new Date()})
    updateUsers()
    back()
    toast.success("Creado con exito")
  }

  return (
    <>
    <Toaster/>
<div className={style.clinicHistory}>
        <button className={style.button} onClick={back}>Volver</button>
        <br></br>
        <br></br>
        <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}>
          <div className={style.column}>
            <div className={style.inputContainer}>
              <input value={form?.cedula} name="cedula" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Cedula</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.name} name="name" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Nombre y apellido</label>
            </div>
            <div className={style.inputContainer}>
              <input type="number" value={form?.edad} name="edad" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Edad</label>
            </div>
            <div className={style.inputContainer}>
              <select className={style.input} value={form?.sexo} name="sexo" onChange={handleForm}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <label className={style.textInput}>Sexo</label>
              {/* <input value={form?.sexo} name="sexo" onChange={handleForm} className={style.input} placeholder=' '></input> */}
            </div>
            <div className={style.inputContainer}>
              <input value={form?.nacimiento} type="date" name="nacimiento" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Fecha de nacimiento</label>
            </div>
            <div className={style.inputContainer}>
              <input type="file" name="image" onChange={uploadImage} className={style.input} placeholder=' '></input>
            </div>
          </div>
          <div className={style.column}>
            <div className={style.inputContainer}>
              <input value={form?.direccion} name="direccion" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Direccion</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.departamento} name="departamento" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Departamento</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.ciudad} name="ciudad" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Ciudad</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.celular} name="celular" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Celular</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.email} name="email" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Email</label>
            </div>
          </div>
        </div>

        <h2>Aspecto del paciente</h2>
        <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}>
          <div className={style.column}>
            <div className={style.inputContainer}>
              <input value={form?.cara} name="cara" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Cara</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.labios} name="labios" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Labios y comisuras</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.palpiganglios} name="palpiganglios" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Palpitacion de ganglios</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.regio} name="regio" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Regio hiodea y tiroidea</label>
            </div>
          </div>
          <div className={style.column}>
            <div className={style.inputContainer}>
              <input value={form?.ganglios} name="ganglios" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Ganglios</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.atm} name="atm" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>ATM</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.orejas} name="orejas" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Orejas</label>
            </div>
              {/* <input type="file" className={style.inputContainer} placeholder=' '></input> */}
          </div>
        </div>

        <h2>Examen clinico intrabucal</h2>
        <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}>
          <div className={style.column}>
            <div className={style.inputContainer}>
              <input value={form?.carillas} name="carillas" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Carillas</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.mucosa} name="mucosa" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Mucosa</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.encia} name="encia" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Encia</label>
            </div>
          </div>
          <div className={style.column}>
            <div className={style.inputContainer}>
              <input value={form?.lengua} name="lengua" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Lengua</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.paladar} name="paladar" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Paladar</label>
            </div>
          </div>
        </div>

        <h2>Examen complementario</h2>
        <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}>
          <div className={style.column}>
            <div className={style.inputContainer}>
              <input value={form?.rx} name="rx" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Rx</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.panoramica} name="panoramica" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Panoramica</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.coronal} name="coronal" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Coronal</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.periapical} name="periapical" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Periapical</label>
            </div>
          </div>
          <div className={style.column}>
            <div className={style.inputContainer}>
              <input value={form?.laboratorio} name="laboratorio" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Laboratorio</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.modelo} name="modelo" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Modelo</label>
            </div>
            <div className={style.inputContainer}>
              <input value={form?.tension} name="tension" onChange={handleForm} className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Tension arterial</label>
            </div>
          </div>
        </div>
        <h3>Observaciones</h3>
        <textarea value={form?.observaciones} name="observaciones" onChange={handleForm} className={style.input} style={{minWidth:"582px", maxWidth:"582px", maxHeight:"100px",minHeight:"100px", position:"relative"}}/>
        <br></br>
        <br></br>
        <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}>
          <div className={style.column}>
            <p>¿Le han practicado alguna intervención quirúrgica?<input name="0" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Toma algún medicamento <input name="1" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Esta usted bajo tratamiento medico??<input name="2" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Ha recibido alguna transfusión de sangre?<input name="3" onChange={handleFormCheck} type='checkbox' /></p>
            <p><b>¿Sufre de tensión arterial?</b><input name="4" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Alta<input name="5" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Baja<input name="6" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Sangra excesivamenteal cortase?<input name="7" onChange={handleFormCheck} type='checkbox' /></p>
            <b>¿Padece o padeció algún problema sanguíneo?<input name="8" onChange={handleFormCheck} type='checkbox' /></b>
            <p>Leucemia<input name="9" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Anemia<input name="10" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Hemofilio<input name="11" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Deficit Vitaminico<input name="12" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Ha tenido limitacion para abrir  o cerrar la boca?<input name="13" onChange={handleFormCheck} type='checkbox' /></p>
            <b>¿ha presentado reacción alérgica a alguno de estos medicamentos?</b>
            <p>Penicilina<input name="14" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Anestesia<input name="15" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Yodo<input name="16" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Aspirina<input name="17" onChange={handleFormCheck} type='checkbox' /></p>
          </div>
          <div className={style.column}>
            <p>¿Ha consumido o consume drogas?<input name="18" onChange={handleFormCheck} type='checkbox' /></p>
            <b>Sufre o ha sufrido de:</b>
            <p>Enfermedades venéreas<input name="19" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Problemas de corazón<input name="20" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Hepatitis<input name="21" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Asma<input name="22" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Diabetes<input name="23" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Ulcera gástrica<input name="24" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Tiroides<input name="25" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Sufre de Herpes o altos recurrentes?<input name="26" onChange={handleFormCheck} type='checkbox' /></p>
            <b>¿Presenta alguno de los siguientes habitos?</b>
            <p>Morderse los labios o las uñas<input name="27" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Fumar<input name="28" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Consumir Alimentos cítricos<input name="29" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Apretamiento dental<input name="30" onChange={handleFormCheck} type='checkbox' /></p>
            <p>Respiracion bucal<input name="31" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Siente ruidos en la mandíbula al abrir o cerrar la boca?<input name="32" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Es usted VIH +?<input name="33" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Toma algun tratamiento retroviral?<input name="34" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Esta usted embarazada?<input name="35" onChange={handleFormCheck} type='checkbox' /></p>
            <p>¿Esta tomando actualmente pastillas anticonceptivas?<input name="36" onChange={handleFormCheck} type='checkbox' /></p>
          </div>
        </div>
        <div className={style.inputContainer}>
        <select name="especialista" onChange={handleForm} className={style.input}>
          <option value="Periodoncia">Periodoncia</option>
          <option value="Endodoncia">Endodoncia</option>
          <option value="Cirugia">Cirugia</option>
          <option value="Radiologia">Radiologia</option>
          <option value="Otro">Otro</option>
        </select>
        <label className={style.textInput}>Especialista</label>
        </div>
        <CanvasDraw
        // onChange={handleSave}
        lazyRadius={0}
        // imgSrc={foto}
        brushRadius={1.5}
        
        hideInteenablePanAndZoom={true}
        ref={refCanva}
        brushColor="black"
        loadTimeOffset={0}
        style={{width:"400px", height:"180px", margin:"0 auto"}}
        />
        <button className={style.button} style={{display:"flex", margin:"20px auto"}} onClick={createClient}>Crear paciente</button>
      </div>
    </>
  )
}

export default PacienteForm