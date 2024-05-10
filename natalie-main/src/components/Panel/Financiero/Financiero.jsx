import { useEffect, useState } from 'react';
import style from './Financiero.module.css'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FinancieroPDF from './FinancieroPDF';


const Financiero = () => {

  const [chartType, setChartType] = useState(1)
  const [creatorPay, setCreatorPay] = useState(false)
  const [creatorGasto, setCreatorGasto] = useState(false)
  const [detail, setDetail] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  const [pagos, setPagos] = useState()

  const getPagos = async () => {
    const { data } = await axios.get("/financiero")
    setPagos(data)
    setPagoFilter(data)
  }

  const newPay = async () => {
    if (creatorGasto) {
      setCreatorGasto(false)
      const { data } = await axios.post("/financiero", { ...formPay, monto: "-" + formPay.monto, user: `${user.name} ${user.lastname}` })
      setFormPay({
        user: "",
        monto: "",
        reason: "",
        tipo: "Bancolombia"
      })
      // alert(data.status)
      getPagos()
      toast.success('Gasto creado con exito')
      return;
    }
    if (formPay.user == "" || formPay.user == "null") return alert("Debes seleccionar un paciente")
    setCreatorPay(false)
    const { data } = await axios.post("/financiero", formPay)
    setFormPay({
      user: "",
      monto: "",
      reason: "",
      tipo: "Bancolombia"
    })
    toast.success('Pago creado con exito')
    getPagos()
  }

  const [formPay, setFormPay] = useState({
    user: "",
    monto: "",
    reason: "",
    tipo: "Bancolombia"
  })

  const handleForm = (name, value) => {
    setFormPay({ ...formPay, [name]: value })
  }

  useEffect(() => {
    getPagos()
  }, [])

  const days = pagos?.reduce((accumulator, pago) => {
    const today = new Date()
    const day = pago.date?.split("-")[2];
    const month = pago.date?.split("-")[1];
    const year = pago.date?.split("-")[0];

    if (year == new Date().getUTCFullYear() && month == new Date().getMonth() + 1) {
      if (today.getDate() >= day && day > today.getDate() - 3) {
        const existingMonth = accumulator.find((item) => item.name === day);
        if (existingMonth) {
          if (existingMonth[pago.tipo] === undefined) {
            existingMonth[pago.tipo] = 0; // Inicializa como 0 si es undefined
          }
          existingMonth[pago.tipo] += Number(pago.monto);
        } else {
          accumulator.push({
            name: day,
            [pago.tipo]: Number(pago.monto),
          });
        }
      }
    }

    return accumulator;
  }, []);

  days?.sort((a, b) => parseInt(a.name) - parseInt(b.name));

  const years = pagos?.reduce((accumulator, pago) => {
    const year = pago.date?.split("-")[0];
    const existingMonth = accumulator.find((item) => item.name === year);

    if (existingMonth) {
      if (existingMonth[pago.tipo] === undefined) {
        existingMonth[pago.tipo] = 0; // Inicializa como 0 si es undefined
      }
      existingMonth[pago.tipo] += Number(pago.monto);
    } else {
      accumulator.push({
        name: year,
        [pago.tipo]: Number(pago.monto),
      });
    }

    return accumulator;
  }, []);

  years?.sort((a, b) => parseInt(a.name) - parseInt(b.name));

  const months = pagos?.reduce((accumulator, pago) => {
    const year = pago.date?.split("-")[0];
    const month = pago.date?.split("-")[1];

    if (year == new Date().getUTCFullYear()) {
      const existingMonth = accumulator.find((item) => item.name === month);
      if (existingMonth) {
        if (existingMonth[pago.tipo] === undefined) {
          existingMonth[pago.tipo] = 0; // Inicializa como 0 si es undefined
        }
        existingMonth[pago.tipo] += Number(pago.monto);
      } else {
        accumulator.push({
          name: month,
          [pago.tipo]: Number(pago.monto),
        });
      }
    }

    return accumulator;
  }, []);
  // Ordenar los meses por número (1 al 12)
  months?.sort((a, b) => parseInt(a.name) - parseInt(b.name));

  const [pacientes, setPacientes] = useState()

  useEffect(() => {
    axios.get("/client/all").then(({ data }) => setPacientes(data))
  }, [])


  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    const formattedValue = Number(payload.value).toLocaleString(); // Agrega los puntos de separación de miles
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fontSize={12} textAnchor="end" fill="#666">
          {`$${formattedValue}`}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className={style.tooltip}>
          <p className="label">{`${label}`}</p>
          {payload.map((p) => {
            const formattedValue = Number(p.value).toLocaleString(); // Formatea el valor con puntos de separación de miles
            return (<>
              <p className={style.intro} style={{ color: p.fill }}>{`${p.name}: $${formattedValue}`}</p>
            </>)
          })}
        </div>
      );
    }
    return null;
  };

  const [desde, setDesde] = useState("2022-10-20")
  const [hasta, setHasta] = useState("2025-10-20")
  const [tipo, setTipo] = useState("Todos")
  const [pagoFilter, setPagoFilter] = useState(pagos)


  const filtradoPago = () => {
    var fechasEnRango = pagos.filter((pago) => pago.date >= desde && pago.date <= hasta);
    if(tipo !== "Todos"){
      fechasEnRango = fechasEnRango.filter(pago => pago.tipo == tipo)
    }
    return setPagoFilter(fechasEnRango)
  }

  return (
    <>
    <Toaster position='top-center'/>
      {(!creatorPay && !creatorGasto && !detail) && <div className={style.financiero}>
        <h1 className={style.titleSection}>Financiero</h1>
        <div className={style.doblePage} style={window.innerWidth < 600 ? {display:"initial"}:{display:"flex"}}>
          <div>
            <select onChange={(e) => setChartType(e.target.value)} className={style.select}>
              <option value={1} selected>Diario</option>
              {/* <option value={2}>Semanal</option> */}
              <option value={2}>Mensual</option>
              <option value={3}>Anual</option>
            </select>
              <div>
                {chartType == 1 && days?.length ? <BarChart
                  className={style.grafica}
                  // style={{width:"100vw"}}
                  width={window.innerWidth < 1300 ? window.innerWidth-window.innerWidth/3 : 500}
                  height={window.innerWidth > 900 ? 350 : 250}
                  data={days}
                  // onClick={(e) => alert("Mostrar detalles de " + e.activeTooltipIndex)}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tick={CustomYAxisTick} />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Bar dataKey="Bancolombia" fill="#8884d8" />
                  <Bar dataKey="Efectivo" fill="#82ca9d" />
                  <Bar dataKey="TDC" fill="#FF5733" />
                </BarChart> : null}
                {chartType == 2 && months?.length ? <BarChart
                  className={style.grafica}
                  width={600}
                  height={350}
                  data={months}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tick={CustomYAxisTick} />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Bar dataKey="Bancolombia" fill="#8884d8" />
                  <Bar dataKey="Efectivo" fill="#82ca9d" />
                  <Bar dataKey="TDC" fill="#FF5733" />
                </BarChart> : null}
                {chartType == 3 && years?.length ? <BarChart
                  className={style.grafica}
                  width={600}
                  height={350}
                  data={years}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tick={CustomYAxisTick} />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Bar dataKey="Bancolombia" fill="#8884d8" />
                  <Bar dataKey="Efectivo" fill="#82ca9d" />
                  <Bar dataKey="TDC" fill="#FF5733" />
                </BarChart> : null}
              </div>
            <br></br>
            <button className={style.button} onClick={() => setDetail(true)}>Detalles</button>
          </div>
          <div className={style.buttones} style={window.innerWidth < 600 ? {margin:"20px auto"}:{margin:"0 50px"}}>
            <button className={style.button} onClick={() => { setCreatorPay(true); setFormPay({ ...formPay, user: "" }) }}>Nuevo pago</button>
            <button className={style.button} onClick={() => setCreatorGasto(true)}>Nuevo gasto</button>
          </div>
        </div>
      </div>}
      {(creatorPay && !detail) && <div className={style.financiero}>
        <h1 onClick={() => setCreatorPay(false)}>Nuevo pago</h1>
        <div className={style.inputContainer}>
          <select name="user" onChange={(e) => { handleForm(e.target.name, e.target.value) }} className={style.input} placeholder=' '>
            <option value="null" selected>Seleccionar</option>
            {pacientes?.map((p) => <option value={`${p.name}`}>{p.name}</option>)
            }
          </select>
          <label className={style.textInput}>Nombre</label>
        </div>
        <div className={style.inputContainer}>
          <input onChange={(e) => handleForm(e.target.name, e.target.value)} type="date" name="date" className={style.input} placeholder=' '></input>
          <label className={style.textInput}>Fecha</label>
        </div>
        {/* <div className={style.inputContainer}>
          <input type="time" className={style.input} name="hour"/>
          <label className={style.textInput}>Hora</label>
          </div> */}
        <div className={style.inputContainer}>
          <input type="number" min={0} name="monto" className={style.input} onChange={(e) => handleForm(e.target.name, e.target.value)} placeholder=' '></input>
          <label className={style.textInput}>Monto</label>
        </div>
        <div className={style.inputContainer}>
          <input name="reason" className={style.input} onChange={(e) => handleForm(e.target.name, e.target.value)} placeholder=' '></input>
          <label className={style.textInput}>Procedimiento</label>
        </div>
        <div className={style.inputContainer}>
          {/* <input name="reason" className={style.input} onChange={(e) => handleForm(e.target.name, e.target.value)} placeholder=' '></input> */}
          <select onChange={(e) => setFormPay({ ...formPay, tipo: e.target.value })} className={style.input}>
            <option value="Bancolombia">Bancolombia</option>
            <option value="Nequi">Nequi</option>
            <option value="Daviplata">Daviplata</option>
            <option value="Efectivo">Efectivo</option>
            <option value="TDC">TDC</option>
          </select>
          <label className={style.textInput}>Metodo</label>
        </div>
        <div className={style.buttons}>
          <button className={style.button} onClick={newPay}>Guardar</button>
          <button className={style.button} onClick={() => setCreatorPay(false)}>Volver</button>
        </div>
      </div>}
      {(creatorGasto && !detail) && <div className={style.financiero}>
        <h1 onClick={() => setCreatorPay(false)}>Nuevo gasto</h1>
        {/* <div className={style.inputContainer}>
          <input name="user" onChange={(e) => handleForm(e.target.name, e.target.value)} className={style.input} placeholder=' '></input>
          <label className={style.textInput}>Causante</label>
        </div> */}
        <div className={style.inputContainer}>
          <input onChange={(e) => handleForm(e.target.name, e.target.value)} type="date" name="date" className={style.input} placeholder=' '></input>
          <label className={style.textInput}>Fecha</label>
        </div>
        {/* <div className={style.inputContainer}>
          <input type="time" className={style.input} name="hour"/>
          <label className={style.textInput}>Hora</label>
          </div> */}
        <div className={style.inputContainer}>
          <input type="number" min={0} name="monto" className={style.input} onChange={(e) => handleForm(e.target.name, e.target.value)} placeholder=' '></input>
          <label className={style.textInput}>Monto</label>
        </div>
        <div className={style.inputContainer}>
          <input name="reason" className={style.input} onChange={(e) => handleForm(e.target.name, e.target.value)} placeholder=' '></input>
          <label className={style.textInput}>Procedimiento</label>
        </div>
        <div className={style.inputContainer}>
          {/* <input name="reason" className={style.input} onChange={(e) => handleForm(e.target.name, e.target.value)} placeholder=' '></input> */}
          <select onChange={(e) => setFormPay({ ...formPay, tipo: e.target.value })} className={style.input}>
            <option value="Bancolombia">Bancolombia</option>
            <option value="Nequi">Nequi</option>
            <option value="Daviplata">Daviplata</option>
            <option value="Efectivo">Efectivo</option>
            <option value="TDC">TDC</option>
          </select>
          <label className={style.textInput}>Metodo</label>
        </div>
        <div className={style.buttons}>
          <button className={style.button} onClick={newPay}>Guardar</button>
          <button className={style.button} onClick={() => setCreatorGasto(false)}>Volver</button>
        </div>
      </div>}
      {(!creatorPay && detail) && <div className={style.financiero}>
        <h2>Detalle financiero</h2>
        <div className={style.inputContainer}>
          <input type="date" name="user" onChange={(e) => setDesde(e.target.value)} className={style.input} placeholder=' '></input>
          <label className={style.textInput}>Desde</label>
        </div>
        <div className={style.inputContainer}>
          <input type="date" name="user" onChange={(e) => setHasta(e.target.value)} className={style.input} placeholder=' '></input>
          <label className={style.textInput}>Hasta</label>
        </div>
        <div className={style.inputContainer}>
          <select className={style.input} onChange={(e) => setTipo(e.target.value)}>
            <option value="Todos" selected>Todos</option>
            <option value="Bancolombia">Bancolombia</option>
            <option value="Nequi">Nequi</option>
            <option value="Daviplata">Daviplata</option>
            <option value="TDC">TDC</option>
            <option value="Efectivo">Efectivo</option>
          </select>
          <label className={style.textInput}>Tipo de pago</label>
        </div>
        <button className={style.button} onClick={filtradoPago}>Filtrar</button><br></br><br></br>
        <PDFDownloadLink document={<FinancieroPDF financiero={pagoFilter} desde={desde} hasta={hasta} tipo={tipo}/>} fileName='registrofinanciero.pdf'>
          <button className={style.button}>Descargar PDF</button>
        </PDFDownloadLink>
        <br></br><br></br>
        <table className={style.tabla}>
          <tr>
            <td className={style.topTd}>Fecha</td>
            <td className={style.topTd}>Causante</td>
            <td className={style.topTd}>Procedimiento</td>
            <td className={style.topTd}>Valor pagado</td>
            <td className={style.topTd}>Metodo de pago</td>
          </tr>
          {pagoFilter?.map(u =>
            <tr key={u.id} className={style.tr}>
              <td className={style.td}>{u.date}</td>
              <td className={style.td}>{u.user}</td>
              <td className={style.td}>{u.reason}</td>
              <td className={style.td}>${Number(u.monto).toLocaleString()}</td>
              <td className={style.td}>{u.tipo}</td>
            </tr>)}
        </table>
        <br></br>
        <button className={style.button} onClick={() => setDetail(false)}>Volver</button>
      </div>}
    </>
  )
};

export default Financiero