import { useEffect, useState } from 'react';
import style from './Control.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from "axios"
import toast, {Toaster} from 'react-hot-toast';

const Control = () => {

  const [typeChart, setTypeChart] = useState(1)
  const [creator, setCreator] = useState(false)


  const [temp, setTemp] = useState([])
  const [tempForm, setTempForm] = useState({
    name: new Date().getDate(),
    date: "",
    type:1,
    mañana: 0,
    tarde: 0,
  })

  const [hume, setHume] = useState([])
  const [humeForm, setHumeForm] = useState({
    name: new Date().getDate(),
    date: "",
    type:2,
    mañana: 0,
    tarde: 0,
  })

  const [frio, setFrio] = useState([])
  const [frioForm, setFrioForm] = useState({
    name: new Date().getDate(),
    date: "",
    type:3,
    mañana: 0,
    tarde: 0,
  })

  const handleTempForm = (e) => {
    const { name, value } = e.target
    setTempForm({
      ...tempForm,
      [name]: value
    })
  }

  const createTemp = async () => {
    await axios.post("/temperatura", {...tempForm, name: tempForm.date.split("-")[2]})
    setTemp([
      ...temp,
      {...tempForm, name: tempForm.date.split("-")[2]}
    ])
    toast.success("Creado con exito")
  }

  const handleHumeForm = (e) => {
    const { name, value } = e.target
    setHumeForm({
      ...humeForm,
      [name]: value
    })
  }

  const createHume = async () => {
    await axios.post("/temperatura", {...humeForm, name: humeForm.date.split("-")[2]})
    setHume([
      ...hume,
      {...humeForm, name: frioForm.date.split("-")[2]}
    ])
    toast.success("Creado con exito")
  }

  const handleFrioForm = (e) => {
    const { name, value } = e.target
    setFrioForm({
      ...frioForm,
      [name]: value
    })
  }

  const createFrio = async () => {
    await axios.post("/temperatura", {...frioForm, name: frioForm.date.split("-")[2]})
    setFrio([
      ...frio,
      {...frioForm, name: frioForm.date.split("-")[2]}
    ])
    toast.success("Creado con exito")
  }

  const [humeFilter, setHumeFilter] = useState()
  const [tempFilter, setTempFilter] = useState()
  const [frioFilter, setFrioFilter] = useState()

  const [mes, setMes] = useState(new Date().getMonth()+1)
  const [año, setAño] = useState(new Date().getFullYear())

  const getData = async () => {
    const {data} = await axios.get("/temperatura")
    setTemp(data.temp)
    setHume(data.hume)
    setFrio(data.frio)
    const tempFil = data.temp.filter(t => t.date.split("-")[0] == año && t.date.split("-")[1] == mes)
    const humeFil = data.hume.filter(t => t.date.split("-")[0] == año && t.date.split("-")[1] == mes)
    const frioFil = data.frio.filter(t => t.date.split("-")[0] == año && t.date.split("-")[1] == mes)
    setHumeFilter(humeFil)
    setTempFilter(tempFil)
    setFrioFilter(frioFil)
  }




  const filtrar = () => {
    const tempFil = temp.filter(t => t.date.split("-")[0] == año && t.date.split("-")[1] == mes)
    const humeFil = hume.filter(t => t.date.split("-")[0] == año && t.date.split("-")[1] == mes)
    const frioFil = frio.filter(t => t.date.split("-")[0] == año && t.date.split("-")[1] == mes)
    setHumeFilter(humeFil)
    setTempFilter(tempFil)
    setFrioFilter(frioFil)
    console.log(humeFil)
  }

  useEffect(() => {
    filtrar()
  },[frio,temp,hume])

  useEffect(() => {
    getData()
  },[])



  return (
    <>
    <Toaster position='top-center'/>
      <div className={style.control}>
        <select onChange={(e) => setTypeChart(e.target.value)} className={style.select}>
          <option value={1} selected>Temperatura</option>
          <option value={2}>Humedad</option>
          <option value={3}>Cadena de frio</option>
        </select>
        {!creator && <button className={style.button} onClick={() => setCreator(true)}>Crear</button>}
        {!creator ? <div>
          <div className={style.inputContainer}>
          <select onChange={(e) => setMes(e.target.value)} className={style.input}>
          <option selected>Selecciona un mes</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
            </select>
          <label className={style.textInput}>Mes</label>
        </div>
        <div className={style.inputContainer}>
        <select onChange={(e) => setAño(e.target.value)} className={style.input}>
          <option selected>Selecciona un año</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            </select>
          <label className={style.textInput}>Año</label>
        </div>
        <button className={style.button} onClick={filtrar}>Filtrar</button>
          {typeChart == 1 && <div>
            <h4>Temperatura del mes</h4>
            <AreaChart
              className={style.chart}
              width={400}
              height={160}
              data={tempFilter?.sort((a, b) => a.name - b.name)}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, Math.max(...temp.map((item) => item.mañana))]}/>
              <Tooltip />
              <Area type="monotone" dataKey="mañana" stroke="#8884d8" fill="#8884d838" />
              <Area type="monotone" dataKey="tarde" stroke="#82ca9d" fill="#82ca9d38" />
            </AreaChart>
          </div>}
          {typeChart == 2 && <div>
            <h4>Humedad del mes</h4>
            <AreaChart
              className={style.chart}
              width={400}
              height={160}
              data={humeFilter?.sort((a, b) => a.name - b.name)}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, Math.max(...hume.map((item) => item.mañana))]}/>
              <Tooltip />
              <Area type="monotone" dataKey="mañana" stroke="#8884d8" fill="#8884d838" />
              <Area type="monotone" dataKey="tarde" stroke="#82ca9d" fill="#82ca9d38" />
            </AreaChart>
          </div>}
          {typeChart == 3 && <div>
            <h4>Cadena de frio del mes</h4>
            <AreaChart
              className={style.chart}
              width={400}
              height={160}
              data={frioFilter?.sort((a, b) => a.name - b.name)}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, Math.max(...frio.map((item) => item.mañana))]}/>
              <Tooltip />
              <Area type="monotone" dataKey="mañana" stroke="#8884d8" fill="#8884d838" />
              <Area type="monotone" dataKey="tarde" stroke="#82ca9d" fill="#82ca9d38" />
            </AreaChart>
          </div>}
        </div> :
          <div>
            {typeChart == 1 && <>
              <br></br>
              <div className={style.inputContainer}>
                <input type="date" name="date" onChange={handleTempForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Fecha</label>
              </div>
              <div className={style.inputContainer}>
                <input name="mañana" onChange={handleTempForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Mañana</label>
              </div>
              <div className={style.inputContainer}>
                <input name="tarde" onChange={handleTempForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Tarde</label>
              </div>
              <br></br>
              <button onClick={() => {setCreator(false); createTemp()}} className={style.button}>Guardar</button>
              <button onClick={() => setCreator(false)} className={style.button}>Volver</button>
            </>}
            {typeChart == 2 && <>
              {/* <h1>Humedad form</h1> */}
              <br></br>
              <div className={style.inputContainer}>
                <input type="date" name="date" onChange={handleHumeForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Fecha</label>
              </div>
              <div className={style.inputContainer}>
                <input name="mañana" onChange={handleHumeForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Mañana</label>
              </div>
              <div className={style.inputContainer}>
                <input name="tarde" onChange={handleHumeForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Tarde</label>
              </div>
              <br></br>
              <button onClick={() => {setCreator(false); createHume()}} className={style.button}>Guardar</button>
              <button onClick={() => setCreator(false)} className={style.button}>Volver</button>
            </>}
            {typeChart == 3 && <>
              {/* <h1>Cadena form</h1> */}
              <br></br>
              <div className={style.inputContainer}>
                <input type="date" name="date" onChange={handleFrioForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Fecha</label>
              </div>
              <div className={style.inputContainer}>
                <input name="mañana" onChange={handleFrioForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Mañana</label>
              </div>
              <div className={style.inputContainer}>
                <input name="tarde" onChange={handleFrioForm} className={style.input} placeholder=' '></input>
                <label className={style.textInput}>Tarde</label>
              </div>
              <br></br>
              <button onClick={() => {setCreator(false); createFrio()}} className={style.button}>Guardar</button>
              <button onClick={() => setCreator(false)} className={style.button}>Volver</button>
            </>}
          </div>
        }
      </div>
    </>
  )
};

export default Control