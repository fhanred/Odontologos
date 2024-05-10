import { useRef } from 'react'
import style from './Pacientes.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import CanvasDraw from "react-canvas-draw";
import foto from "../../../assets/diagrama.jpg"
import documentos from "../../../assets/documentos.png"
import { HexColorPicker } from 'react-colorful';
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import ConsentimientoTable from './ConsentimientoTable';
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const PacienteDetail = ({pacienteId, back}) => {


    const [paciente, setPaciente] = useState()
    const refCanvaFirm = useRef(null)
    const refCanva = useRef(null)


    const [category, setCategory] = useState(1)
    const [color, setColor] = useState("#aabbcc");

    const uploadUserImage = async (e) => {
      const files = e.target.files;
      const dato = new FormData();
      dato.append("file", files[0]);
      dato.append("upload_preset","natalie")
      dato.append("api_key","612393625364863")
      dato.append("timestamp", 0)
      const res = await axios.post("https://api.cloudinary.com/v1_1/dftvenl2z/auto/upload", dato)
      // await axios.put("/user", {id:JSON.parse(localStorage.getItem("user")).id, image:res.data.secure_url})
      // localStorage.setItem("image", res.data.secure_url)
      setFormEvo({...formEvo, url:res.data.secure_url})
    }

    const reloadUser = () => {
      axios.get("/client/"+pacienteId)
      .then(({data}) => {setPaciente(data) ;setTimeout(() => {refCanvaFirm.current.loadSaveData(data.firma,true); refCanva.current.loadSaveData(data.diagrama,true)},1000)})
    }

    useEffect(() => {
      reloadUser()
      },[])
  
      const [tipo, setTipo] = useState(1)

      const [formEvo, setFormEvo] = useState()

      const handleFormEvo = (e) => {
        const {name,value} = e.target
        setFormEvo({...formEvo, [name]:value})
      }

      const newEvolution = () => {
        if(tipo == 2){
          axios.post("/client/evolucion", {...formEvo,evolucion:"Procedimiento", abono:null,precio:formEvo.abono, clientId:pacienteId})
          .then(() => reloadUser())
          axios.put("/client", {ulpro:formEvo.date, id:pacienteId, saldo:paciente.saldo-formEvo.abono})
          .then(() => reloadUser())
          setFormEvo({})
          toast.success("Evolucion creada con exito")
        }else{
          axios.post("/client/evolucion", {...formEvo, clientId:pacienteId})
          .then(() => reloadUser())
          axios.put("/client", {ulpro:formEvo.date, id:pacienteId, saldo:Number(paciente.saldo)+Number(formEvo.abono)})
          .then(() => reloadUser())
          axios.post("/financiero", {user:paciente.name, date:formEvo.date, monto:formEvo.abono, reason:formEvo.evolucion, tipo:"Bancolombia"})
          .then(() => reloadUser())
          setFormEvo({})
          toast.success("Evolucion creada con exito")
        }
      }

      const [consen, setConsen] = useState(false)

      const handleSave = () => {
        axios.put("/client", {id:pacienteId, diagrama: refCanva.current.getSaveData()})
      }
      const [evolucion, setEvolucion] = useState(false)
      const [nuevaEvolucion, setNuevaEvolucion] = useState(false)
    
      const [consenId, setConsenId] = useState()

      if(consen) return <ConsentimientoTable fn={() => setConsen(false)} firma={refCanvaFirm} paciente={paciente} id={consenId}/>
    return (
        <>
        <Toaster/>
        { !evolucion ? 
        <div className={style.detailPaciente}>
          <br></br>
          <br></br>
        <button className={style.button} onClick={back}>Volver</button>
        <br></br><br></br><br></br>
            <img className={style.imageClient} src={paciente?.image}/>
            <br></br>
            <button className={style.button} onClick={() => setEvolucion(true)}>Evolucion</button>
            <div className={style.clinicHistory}>
          <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}>
          <div className={style.column}>
          { JSON.parse(localStorage.getItem("user"))?.role >= 2 && <><p><b>Cedula:</b> {paciente ? paciente.cedula : <span style={{color:"grey"}}>Cargando..</span>}</p>
            <p><b>Nombres:</b> {paciente ? paciente.name : <span style={{color:"grey"}}>Cargando..</span>}</p>
            <p><b>Edad:</b> {paciente ? paciente.edad : <span style={{color:"grey"}}>Cargando..</span>}</p>
            <p><b>Sexo:</b> {paciente ? paciente.sexo : <span style={{color:"grey"}}>Cargando..</span>}</p>
            <p><b>Fecha nacimiento:</b> {paciente ? paciente.nacimiento : <span style={{color:"grey"}}>Cargando..</span>}</p></>}
          </div>
          <div className={style.column}>
          { JSON.parse(localStorage.getItem("user"))?.role >= 2 && <><p><b>Direccion:</b> {paciente ? paciente.direccion : <span style={{color:"grey"}}>Cargando..</span>}</p>
            <p><b>Departamento:</b> {paciente ? paciente.departamento : <span style={{color:"grey"}}>Cargando..</span>}</p>
            <p><b>Ciudad:</b> {paciente ? paciente.ciudad : <span style={{color:"grey"}}>Cargando..</span>}</p>
            <p><b>Celular:</b> {paciente ? paciente.celular : <span style={{color:"grey"}}>Cargando..</span>}</p>
            <p><b>Email:</b> {paciente ? paciente.email : <span style={{color:"grey"}}>Cargando..</span>}</p></>}
            <br></br>
          </div>
        </div>
        <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}>
          <div className={style.column}>
          <h2>Aspecto del paciente</h2>
        <p><b>Cara:</b> {paciente ? paciente.cara : <span style={{color:"grey"}}>Cargando..</span>}</p>
        <p><b>Labios y comisuras:</b> {paciente ? paciente.labios : <span style={{color:"grey"}}>Cargando..</span>}</p>
        <p><b>Palpitacion de ganglios:</b> {paciente ? paciente.palpiganglios : <span style={{color:"grey"}}>Cargando..</span>}</p>
        <p><b>Regio hiodea y tiroidea:</b> {paciente ? paciente.regio : <span style={{color:"grey"}}>Cargando..</span>}</p>
        <p><b>Ganglios:</b> {paciente ? paciente.ganglios : <span style={{color:"grey"}}>Cargando..</span>}</p>
        <p><b>ATM:</b> {paciente ? paciente.atm : <span style={{color:"grey"}}>Cargando..</span>}</p>
        <p><b>Orejas:</b> {paciente ? paciente.orejas : <span style={{color:"grey"}}>Cargando..</span>}</p>
          </div>
          <div className={style.column}>
          <h2>Examen complementario</h2>
          <p><b>RX:</b> {paciente ? paciente.rx : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Panoramica:</b> {paciente ? paciente.panoramica : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Coronal:</b> {paciente ? paciente.coronal : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Periapical:</b> {paciente ? paciente.periapical : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Laboratorio:</b> {paciente ? paciente.laboratorio : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Modelo:</b> {paciente ? paciente.modelo : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Tension Arterial:</b> {paciente ? paciente.tension : <span style={{color:"grey"}}>Cargando..</span>}</p>
          </div>
        </div>
        <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}>
          <div className={style.column}>
          <h2>Examen clinico intrabucal</h2>
          <div className={style.column}>
          <p><b>Carillas:</b> {paciente ? paciente.carillas : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Mucosa:</b> {paciente ? paciente.mucosa : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Encias:</b> {paciente ? paciente.encia : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Lengua:</b> {paciente ? paciente.lengua : <span style={{color:"grey"}}>Cargando..</span>}</p>
          <p><b>Paladar:</b> {paciente ? paciente.paladar : <span style={{color:"grey"}}>Cargando..</span>}</p>
        </div>
          </div>
        </div>
            <div className={style.row} style={window.innerWidth > 1300 ? {flexDirection:"row"} : {flexDirection:"column"}}> 
            <div className={style.column}> 
            <p>¿Le han practicado alguna intervención quirúrgica?<input checked={paciente?.form[0]} type='checkbox'/></p>
            <p>Toma algún medicamento <input checked={paciente?.form[1]} type='checkbox'/></p>
            <p>¿Esta usted bajo tratamiento medico??<input checked={paciente?.form[2]} type='checkbox'/></p>
            <p>¿Ha recibido alguna transfusión de sangre?<input checked={paciente?.form[3]} type='checkbox'/></p>
            <p><b>¿Sufre de tensión arterial?</b><input checked={paciente?.form[4]} type='checkbox'/></p>
            <p>Alta<input checked={paciente?.form[5]} type='checkbox'/></p>
            <p>Baja<input checked={paciente?.form[6]} type='checkbox'/></p>
            <p>¿Sangra excesivamenteal cortase?<input checked={paciente?.form[7]} type='checkbox'/></p>
            <b>¿Padece o padeció algún problema sanguíneo?<input checked={paciente?.form[8]} type='checkbox'/></b>
            <p>Leucemia<input checked={paciente?.form[9]} type='checkbox'/></p>
            <p>Anemia<input checked={paciente?.form[10]} type='checkbox'/></p>
            <p>Hemofilio<input checked={paciente?.form[11]} type='checkbox'/></p>
            <p>Deficit Vitaminico<input checked={paciente?.form[12]} type='checkbox'/></p>
            
            <p>¿Ha tenido limitacion para abrir  o cerrar la boca?<input checked={paciente?.form[13]} type='checkbox'/></p>
            <b>¿ha presentado reacción alérgica a alguno de estos medicamentos?</b>
            <p>Penicilina<input checked={paciente?.form[14]} type='checkbox'/></p>
            <p>Anestesia<input checked={paciente?.form[15]} type='checkbox'/></p>
            <p>Yodo<input checked={paciente?.form[16]} type='checkbox'/></p>
            <p>Aspirina<input checked={paciente?.form[17]} type='checkbox'/></p>

            <h3>Observaciones</h3>
        <textarea value={paciente?.observaciones} name="observaciones" className={style.input} style={{minWidth:"582px", maxWidth:"582px", maxHeight:"100px",minHeight:"100px", position:"relative"}}/>
          </div>
          <div className={style.column}>
            <p>¿Ha consumido o consume drogas?<input checked={paciente?.form[18]} type='checkbox'/></p>
            <b>Sufre o ha sufrido de:</b>
            <p>Enfermedades venéreas<input checked={paciente?.form[19]} type='checkbox'/></p>
            <p>Problemas de corazón<input checked={paciente?.form[20]} type='checkbox'/></p>
            <p>Hepatitis<input checked={paciente?.form[21]} type='checkbox'/></p>
            <p>Asma<input checked={paciente?.form[22]} type='checkbox'/></p>
            <p>Diabetes<input checked={paciente?.form[23]} type='checkbox'/></p>
            <p>Ulcera gástrica<input checked={paciente?.form[24]} type='checkbox'/></p>
            <p>Tiroides<input checked={paciente?.form[25]} type='checkbox'/></p>
            <p>¿Sufre de Herpes o altos recurrentes?<input checked={paciente?.form[26]} type='checkbox'/></p>
            <b>¿Presenta alguno de los siguientes habitos?</b>
            <p>Morderse los labios o las uñas<input checked={paciente?.form[27]} type='checkbox'/></p>
            <p>Fumar<input checked={paciente?.form[28]} type='checkbox'/></p>
            <p>Consumir Alimentos cítricos<input checked={paciente?.form[29]} type='checkbox'/></p>
            <p>Apretamiento dental<input checked={paciente?.form[30]} type='checkbox'/></p>
            <p>Respiracion bucal<input checked={paciente?.form[31]} type='checkbox'/></p>
            <p>¿Siente ruidos en la mandíbula al abrir o cerrar la boca?<input checked={paciente?.form[32]} type='checkbox'/></p>
            <p>¿Es usted VIH +?<input checked={paciente?.form[33]} type='checkbox'/></p>
            <p>¿Toma algun tratamiento retroviral?<input checked={paciente?.form[34]} type='checkbox'/></p>
            <p>¿Esta usted embarazada?<input checked={paciente?.form[35]} type='checkbox'/></p>
            <p>¿Esta tomando actualmente pastillas anticonceptivas?<input checked={paciente?.form[36]} type='checkbox'/></p>
            </div>
          </div>
        </div>
        <h3>Odontodiagrama</h3>
        <div className={style.buttons}>
        <button className={style.button} onClick={handleSave}>Guardar</button>
        { JSON.parse(localStorage.getItem("user"))?.role >= 2 && <button className={style.button} onClick={() => refCanva.current.clear()}>Limpiar</button>}
        </div>
        <HexColorPicker color={color} onChange={setColor} style={{margin:"50px auto"}}/>
        <CanvasDraw
        // onChange={handleSave}
        lazyRadius={0}
        imgSrc={foto}
        brushRadius={4}
        hideInteenablePanAndZoom={true}
        ref={refCanva}
        brushColor={color}
        loadTimeOffset={0}
        style={{width:"700px", margin:"0 auto"}}
        />
        <div className={style.consentimientos}>
          <div>
          <h3>Diagnostico y plan de tratamiento</h3>
          <textarea className={style.textarea}/>
          <h4 className={style.textFe}>Doy fe que la información suministrada es verídica y autorizo a la Dra. Natalie Ariza y su equipo de trabajo a realizar los tratamientos pertinentes</h4>
          <CanvasDraw
        // onChange={handleSave}
        lazyRadius={0}
        disabled
        // imgSrc={foto}
        brushRadius={1.5}
        hideInteenablePanAndZoom={true}
        ref={refCanvaFirm}
        brushColor="black"
        loadTimeOffset={0}
        style={{width:"400px", height:"180px", margin:"0 auto"}}
        />
          </div>
          <div className={style.inputContainer}>
              <input type="date" className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Proxima cita</label>
            </div>
            <div className={style.inputContainer}>
              <input readOnly value={paciente?.especialista} onChange={null} type="text" className={style.input} placeholder=' '></input>
              <label className={style.textInput}>Especialista</label>
            </div>
            <button className={style.button} onClick={() => {setConsen(true)}}>Ver consentimientos</button>
        </div>
        <br></br>
        <button className={style.button} onClick={back}>Guardar</button>
        </div>
        :
        <div>
        {!nuevaEvolucion ? 
        <div>
        <h1 onClick={() => setEvolucion(false)}>Evolucion</h1>
        
        
        
        <table className={style.evolucion}>
          <tr>
          <td className={style.topTd}>Fecha</td>
          <td className={style.topTd}>Hora</td>
          <td className={style.topTd}>Evolucion</td>
          <td className={style.topTd}>Abono</td>
          <td className={style.topTd}>Precio</td>
          <td className={style.topTd}>Url</td>
          </tr>
          {paciente?.evolucions?.map(e => <tr>
          <td className={style.td}>{e.date}</td>
          <td className={style.td}>{e.time}</td>
          <td className={style.td}>{e.evolucion}</td>
          <td className={style.td}>${Number(e.abono).toLocaleString()}</td>
          <td className={style.td}>${Number(e.precio).toLocaleString()}</td>
          <td className={style.td}><a className={style.button} href={e.url} target='blank'>Ver</a></td>
          </tr>)}
        </table>
        <br></br>
        <p><b>Saldo:</b> ${Number(paciente?.saldo).toLocaleString()}</p>
        <div className={style.buttons}>
        <button className={style.button} onClick={() => setNuevaEvolucion(true)}>Agregar</button>
        <button className={style.button} onClick={() => setEvolucion(false)}>Volver</button>
        </div>
        </div>
        :   
            <div className={style.form}>
                <h1 onClick={() => setNuevaEvolucion(false)}>Nueva evolucion</h1>
                <label>
                <input type='radio' onClick={(e) => setTipo(1)} name="tipo"/>
                Abono
                </label>
                <br></br>
                <label>
                <input type='radio' onClick={(e) => setTipo(2)} name="tipo"/>
                Procedimiento
                </label>
                {tipo == 1 && <div>
                <div className={style.inputContainer}>
            <input type="date" name="date" onChange={handleFormEvo} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Fecha</label>
          </div>
          <div className={style.inputContainer}>
            <input type="time" name="time" step="60" onChange={handleFormEvo} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Hora</label>
          </div>
          <div className={style.inputContainer}>
            <input name="evolucion" onChange={handleFormEvo} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Evolucion</label>
          </div>
          <div className={style.inputContainer}>
            <input type="number" name="abono" value={formEvo?.abono} onChange={handleFormEvo} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Abono</label>
          </div>
          <input type="file" onChange={uploadUserImage} style={{width:"200px"}}></input>
                </div>}
                {tipo == 2 && <div>
                <div className={style.inputContainer}>
            <input type="date" name="date" onChange={handleFormEvo} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Fecha</label>
          </div>
          <div className={style.inputContainer}>
            <input type="time" name="time" step="60" onChange={handleFormEvo} className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Hora</label>
          </div>
          <div className={style.inputContainer}>
          <select onChange={(e) => setCategory(e.target.value)} className={style.input}>
            <option value={1}>Prevencion</option>
            <option value={2}>Operatoria en posteriores</option>
            <option value={3}>Operatoria en interiores</option>
            <option value={4}>Protesis Flexis</option>
            <option value={5}>Nucleos </option>
            <option value={6}>Corona Metal Porcelana</option>
            <option value={7}>Corona libre Metal </option>
            <option value={8}>Cirugía oral</option>
          </select>
          <label className={style.textInput}>Categoria</label>
          </div>
          <div className={style.inputContainer}>
          {category == 1 && <select onChange={(e) => setFormEvo({...formEvo, abono:e.target.value})} className={style.input}>
          <option value="30000">Valoración</option>
          <option value="90000">Destartraje</option>
          <option value="50000">profilaxis</option>
          <option value="20000">Flour</option>
          <option value="70000">Resina preventiva </option>
          <option value="110000">Sesion de Fluor 3M</option>
          </select>}
          {category == 2 && <select className={style.input} onChange={(e) => setFormEvo({...formEvo, abono:e.target.value})}>
          <option  value="30000">Cemento temporal</option>
          <option  value="80000">Urgencia</option>
          <option  value="95000">Resina 1  superficie</option>
          <option  value="120000">Resina 2 superficie</option>
          <option  value="150000">Resina 3  superficie</option>
          <option  value="180000">Reconstrucción</option>
          <option  value="250000">Reconstrucción + poste fibra</option>
          <option  value="280000">Incrustación técnica indirecta</option>
          <option  value="40000">Lonomero vidrio </option>
          </select>}
          {category == 3 && <select className={style.input} onChange={(e) => setFormEvo({...formEvo, abono:e.target.value})}>
          <option  value="80000">Resina ángulo incisal</option>
          <option  value="120000">Resina 2 superficies</option>
          <option  value="150000">Resina 3 superficies</option>
          <option  value="120000">Bordes incisales</option>
          <option  value="680000">Bordent total </option>
          <option  value="640000">Brodent Parcial</option>
          </select>}
          {category == 4 && <select className={style.input} onChange={(e) => setFormEvo({...formEvo, abono:e.target.value})}>
          <option  value="1040000">Brodent </option>
          <option  value="1120000">Super C</option>
          <option  value="1200000">Duratone</option>
          <option  value="680000">Acker Brodent</option>
          <option  value="720000">Acker Super C</option>
          <option  value="800000">Acker Duratone</option>
          <option  value="1760000">Isoiid Total</option>
          </select>}
          {category == 5 && <select className={style.input} onChange={(e) => setFormEvo({...formEvo, abono:e.target.value})}>
          <option  value="280000">Metal base </option>
          <option  value="320000">Metal base con apacador </option>
          <option  value="0000">En oro</option>
          </select>}
          {category == 6 && <select className={style.input} onChange={(e) => setFormEvo({...formEvo, abono:e.target.value})}>
          <option  value="600000">Corona IPS Style </option>
          <option  value="780000">Coronas IPS Style + Hombro ceramico</option>
          </select>}
          {category == 7 && <select className={style.input} onChange={(e) => setFormEvo({...formEvo, abono:e.target.value})}>
          <option  value="1400000">Zirconio </option>
          <option  value="1200000">E-max</option>
          <option  value="640000">Ceromero</option>
          </select>}
          {category == 8 && <select className={style.input} onChange={(e) => setFormEvo({...formEvo, abono:e.target.value})}>
          <option  value="180000">Gingivectomía convencional</option>
          <option  value="350000">Gingivectomía con fresado</option>
          <option  value="90000">Exodoncia simple</option>
          <option  value="170000">Exodoncia + regeneración ósea</option>
          <option  value="0000">Diseños de sonrisa</option>
          <option  value="250000">Blanqueamiento 3 sesiones</option>
          <option  value="500000">Cantos en cerámica</option>
          <option  value="1000000">Cementacion Corona Unidad con Fosfato</option>
          <option  value="1120000">Empress alto estética</option>
          <option  value="180000">Carillas Renna convencional </option>
          <option  value="80000">Cuellos</option>
          <option  value="30000">Cementacion Corona Unidad con Fosfato</option>
          <option  value="50000">Con lanomero</option>
          <option  value="450000">Diseño de sonrisa Blanqueamento 3 sesiones</option>
          <option  value="520000">Diseño de sonrisa Carillas en Ceromero</option>
          <option  value="1000000">Diseño de sonrisa Carillas en E-max monoliticas </option>
          <option  value="1120000">Diseño de sonrisa Carillas en E-max estratificadas</option>
          <option  value="280000">Diseño de sonrisa Carillas en E-max Alta estetica</option>
          </select>}
          <label className={style.textInput}>Procedimiento</label>
          </div>
          <div className={style.inputContainer}>
            <input type="number" name="abono" value={formEvo?.abono} onChange={handleFormEvo} disabled className={style.input} placeholder=' '></input>
            <label className={style.textInput}>Precio</label>
          </div>
          <input type="file" onChange={uploadUserImage} style={{width:"200px"}}></input>
                </div>}
          <br></br><br></br>
          
          <div className={style.buttons}>
          <button className={style.button} onClick={() => {setNuevaEvolucion(false); newEvolution()}}>Guardar</button>
          <button className={style.button} onClick={() => setNuevaEvolucion(false)}>Volver</button>
          </div>
            </div>
            }
        </div>
        }
        </>
    )
}

export default PacienteDetail