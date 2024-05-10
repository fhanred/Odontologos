import { useEffect, useState } from 'react'
import style from './Pacientes.module.css'
//import CanvasDraw from 'react-canvas-draw'
import axios from "axios"

const Consentimiento = () => {

//     const [consenId, setConsenId] = useState(null)
//     const [newConsen, setNewConsen] = useState(false)
//     const user = JSON.parse(localStorage.getItem("user"))
//     const [type, setType] = useState(1)
//     const [hoy, setHoy] = useState()

//     const [form, setForm] = useState()

//     const handleForm = (e) => {
//         const {name, value} = e.target
//         setForm({...form, [name]:value})
//     }

    
//     useEffect(() => {
//         const today = new Date();
        
//         const day = today.getDate().toString().padStart(2, '0');
//         const month = (today.getMonth() + 1).toString().padStart(2, '0');
//         const year = today.getFullYear().toString().slice(-2);
        
//         const formattedDate = `${day}/${month}/${year}`;
//         setHoy(formattedDate)
//     },[])
    
//     if(consenId) return <Consentimiento fn={() => setConsenId(null)} paciente={paciente} id={consenId}/>
//     const crearConsen = async () => {
//         await axios.post("/client/compromiso", {...form,clientId:paciente?.id, type:type, profesional:`${user?.name} ${user?.lastname}`})
//         alert("Creado")
//     }

//     return (
//         <>
//         { !newConsen ? <div>
//         <h1>Consentimientos</h1> 
//         <table className={style.evolucion}>
//           <tr>
//           <td className={style.topTd}>ID</td>
//           <td className={style.topTd}>Fecha</td>
//           <td className={style.topTd}>Tipo</td>
//           <td className={style.topTd}>Firmado</td>
//           </tr>
//           {paciente?.compromisos?.map (consen => <tr onClick={() => setConsenId(consen.id)}>
//           <td className={style.td}>{consen.id}</td>
//           <td className={style.td}>{consen.date}</td>
//           {consen.type == 1 && <td className={style.td}>INDICACIONES MINI IMPLANTES</td>}
//           {consen.type == 2 && <td className={style.td}>ENDODONCIA</td>}
//           {consen.type == 3 && <td className={style.td}>ORTODONTICOS CON MINI-IMPLANTES</td>}
//           {consen.type == 4 && <td className={style.td}>OPERATORIA DENTAL</td>}
//           {consen.type == 5 && <td className={style.td}>ANESTESIA LOCAL</td>}
//           {consen.type == 6 && <td className={style.td}>URGENCIAS ODONTOLOGICAS</td>}
//           <td className={style.td}>Si</td>
//           </tr>)}
//         </table>
//         <br></br>
//         <div className={style.buttons}>
//         <button className={style.button} onClick={() => setNewConsen(true)}>Agregar</button>
//         <button className={style.button} onClick={fn}>Volver</button>
//         </div>
//         </div>:
//         <div className={style.form}>
//         <h1 onClick={() => setNewConsen(false)}>Nueva evolucion</h1>
//         <div className={style.inputContainer}>
//     {/* <input type="date" name="date" className={style.input} placeholder=' '></input> */}
//     <select className={style.input} onChange={(e) => setType(e.target.value)}>
//         <option value={1}>INDICACIONES MINI IMPLANTES</option>
//         <option value={2}>ENDODONCIA</option>
//         <option value={3}>ORTODONTICOS CON MINI-IMPLANTES</option>
//         <option value={4}>OPERATORIA DENTAL</option>
//         <option value={5}>ANESTESIA LOCAL</option>
//         <option value={6}>URGENCIAS ODONTOLOGICAS</option>
//     </select>
//     <label className={style.textInput}>Tipo</label>
//   </div>
//   <div style={{textAlign:"justify", margin:"0 auto", width:"700px"}}>
//   {type == 1 && <p className={style.consen}><h3>INDICACIONES DE CUIDADOS PRE y POST-OPERATORIOS PARA PACIENTES ORTODONTICOS CON MINI IMPLANTES</h3>
//                 estimado paciente, como es de su conocimiento , para el exito de lis mini implantes, son necesarios algunos
//                 cuidados entre los cuales figuran:

//                 <h4>CUIDADOS OPERATORIOS</h4>

//                 *Tomar la medicacion antes del procedimiento, segun lo indicado.
//                 *Concurrir al consultorio con acompañante.

//                 <h4>CUIDADOS POST-OPERATORIOS</h4>

//                 <p>*Continuar con la medicación según receta del profesional.</p>
//                 <p>*Aplicar hilo en el are las primeras 24 horas.</p>
//                 <p>*Ingerir, durante este primer dia una dieta fria o helada</p>
//                 <p>*Evitar alimentos calientes o duros.</p>
//                 <p>*Evitar cualquier tipo de contacto al mini-implante (tirar o empujar el tornillo, forzar con la
//                     lengua entre otros).</p>
//                 <p>*Observación: el ceplilado dental no es un traumatismo y debe realizarse.</p>
//                 <p>*Evitar esfuerzos fisicos excesivos (ejercicio, levantar peso, caminar al sol por 48 horas)</p>
//                 <p>*Seguir el protocolo de higlenización.</p>

//                 <h4>PROTOCOLO DE HIGIENIZACION</h4>

//                 +  CEPILLADO: Higenización del área del mini-implante con cepillo de tamaño pequeño y
//                 cerdas suaves o ultra suaves (poliéster) para impedir la acumulación de alimentos.
//                 Â» PRIMERA SEMANA-APLICACIÃ“N DE GEL O BUCHES: Aplicar en el rea del mini- implante
//                 según la receta del profesional. Gel de clorhexidina al 0,2 % (DENTAGEL) dos veces por
//                 día, por siete días, o buches con solución de gluconato de clorhexidina al 0,12 % durante el
//                 mismo periodo (si no se dispone de gel).
//                 Â» DESPUES DE LA PRIMERA SEMANA, Luego de los siete días, sustitulr el gel o los buches de
//                 clorhexidina por un antiséptico bucal (buches) convencional durante 30 segundos, tres
//                 veces por día, durante todo el tratamiento:

//                 + CUIDADOS CONTINUOS: Mientras el mini-implante este instalado cepillarse los dientes
//                 con un cepillo pequeño de cerdas suaves, humedecido en sol
//                 clorhexidina (la misma utilizada para buches en la primera semana)

//                 Â» CONTROLES: Concurrir a las consultas de control, establecidas.</p>}

//             {type == 2 && <p className={style.consen}><h3>CONSENTIMIENTO INFORMADO DE ENDODONCIA</h3>

//                 Ciudad: <input value={paciente.ciudad} disabled type="text" className={style.inputCon} /> fecha : <input type="date" name="date" onChange={handleForm} className={style.inputCon} /> Yo: <input value={paciente.name} disabled type="text" className={style.inputCon} /> identificado con CC <input value={paciente.cedula} disabled type="text" className={style.inputCon} />
//                 actuando en nombre propio o como representante legal del menor de edad o persona con incapacidad mental para tomar
//                 decisiones cuyo nombre es: <input type="text" name="menorname" onChange={handleForm} className={style.inputCon} /> con documento de identidad No. <input type="text" onChange={handleForm} name="menorcedula" className={style.inputCon} />

//                 <h4>DECLARO QUE SE ME HA INFORMADO</h4>

//                 <p>*Mi responsabilidad como usuario de asistir a las citas de revision o control programadas.</p>
//                 <p>* En caso de recibir anestesia, la recomendación de evitar morder el labio o carrillo de la(s) área(s) anestesiada(s).</p>
//                 <p>*Se requiere informar la odontólogo, en caso de alergico(a) a algun medicamento o tenido antecedentes de alergias a la anestesia local</p>
//                 <p>*La necesidad de presentar Información verídica y real sobre antecedentes al odontólogo y cualquier cambio en el estado de la salud.</p>


//                 ENDODONCIA: actividad que se busca del nervio afectado en el diente y la posterior preparación y selle del conducto o todo procedimiento
//                 o intervención que este relacionado con el nervio (pulpa) dental.


//                 <h4>RIESGOS Y/O COMPLICACIONES</h4>

//                 <p>*Perforaciones dentales</p>
//                 <p>*Aumento o aparición de lesión en el hueso, que puede llegar o requerir cirugía apical.</p>
//                 <p>*Dolor post operatorio, aparición de absceso o fÃ­stula, inflamación o edema.</p>
//                 <p>*Material de obturación sobrepasado hueso, no puede ser removido durante el procedimiento, puede llegar a necesitar cirugía apical.</p>
//                 <p>*Debilidad del diente con mayor riesgo de fractura que un diente vital.</p>
//                 <p>*Infección o dolor en caso de Interrumpir el tratamiento antes de finalizada la endodoncia.</p>
//                 <p>*Recidiva de reabsorción interna o externa.</p>
//                 <p>*Fractura de instrumentos dentro del conducto.</p>
//                 <p>*Cambio de color en el diente.</p>
//                 <p>*Ingestión de materiales o instrumental durante el procedimiento.</p>
//                 <p>*Sub-extensión de material de selle.</p>
//                 <p>*Sangrado, laceraciones o quemaduras en tejidos productos del instrumental o quimicos usados en el procedimiento.</p>
//                 <p>*Laceración de estructuras orales próximas al diente (nervio, tejido blando, rostro).</p>

//                 RECOMENDACIONES QUE LE APLICAN
//                 *En el tratamiento de endodoncia no dejar destapado a no ser que sea prescripción del odontólogo.
//                 *Realizar la restauración definitiva del diente tratado con endodoncia a mas tardar un mes después de terminado el tratamiento.
//                 *En tratamientos de endodoncia, no interrumpir el tratamiento y cumplir las citas hasta finalizar el tratamiento. </p>}

//             {type == 3 && <p className={style.consen}><h3>CONSENTIMIENTO INFORMADO PARA PACIENTES ORTODONTICOS CON MINI-IMPLANTES</h3>

//                 NOMBRE Y APELLIDO DEL PROFESIONAL:<input type="text" name="profesional" onChange={handleForm} value={`${user?.name} ${user?.lastname}`} disabled className={style.inputCon} />
//                 <br></br>
//                 CONSULTORIO:<input type="text" name="consultorio" onChange={handleForm} className={style.inputCon} />

//                 <h4>¿Que son los mini-Implantes?</h4>
//                 Los mini-implantes son pequeños tornillos de titanio que pueden ser empleados en el tratamiento ortodontico
//                 con el objetivo de apoyar en la base osea (maxilar o mandibula) las fuerzas necesarias para mover los dientes


//                 <h4>Ventajas del uso de estos dispositivos en su tratamiento:</h4>
//                 Cuando utilizamos, evitamos apoyar las fuerzas en los dientes que no queremos mover, lo que acelera el tratamiento
//                 y evita efectos indeseados en estos dientes. Con los mini-implantes ampliamos las posibilidades de movimientos.


//                 <h4>¿Como se instalan los mini-implantes?</h4>
//                 Luego de la planificación bucal por medio de un examen clínico, radiográfico/tomográfico, se selecciona el sitio de colocación.
//                 La Instalación del mini-implante es quirúrgica, por lo general, rápida y con anestesia local.

//                 <h4>Riesgos por el uso de mini-implantes:</h4>

//                 1-Perdida del mini-implante por falta de higienización de la zona por parte del paciente, por una calidad
//                 inadecuada de hueso en el sitio (no siempre determinar antes de la colocación) o por la fuerza aplicada.
//                     <br></br>
//                 2-Necesidad de reposicionamiento del mini-implante en función del movimiento (para evitar el contacto
//                 de la raiz del diente en el movimiento)
//                 <br></br>
//                 3-Contacto del mini-implante con la raiz del diente en la instalacion (En caso puede ser necesario
//                 reinstalar el mini-implante)
//                 <br></br>
//                 4-Fractura del mini-implante durante la instalación, el tratamiento o la remoción. En caso de fractura
//                 del mini-implante, puede haber necesidad de un control radiográfico del dispositivo, mantener el fragmento o
//                 evaluar si es necesario extraerlo por medio de una cirugía
//                 <br></br>
//                 5- Si se prevee la aparición de Inflamación o dolor, puede estar indicado el uso de antinflamatorios o
//                 analgésicos
//                 <br></br>
//                 6-Falta de firmeza del mini-implante y necesidad de ajustarlo o reposicionarlo nuevamente.
//                 <br></br>
//                 7-Aftas, inflamación en el sitio de la colocación, crecimiento de la mucosa que rodea al mini-implante o,
//                 en casos mas raros, infecciones locales u óseas (osteomielitis)
//                 <br></br><br></br>
//                 ¿Usted sabia que el uso de mini-mplantes plantea riesgos?
//                 <br></br>
//                 Si ( ) No ( )
//                 <br></br><br></br>
//                 Certifico que he leído y comprendido la información, el profesional ha discutido el tratamiento conmigo
//                 y tuve la oportunidad de preguntarle todas mis dudas sobre los mini-implantes y sobre la Información
//                 contenida en el folleto explicativo. Estoy consciente de la necesidad de Higienización correcta y de las
//                 citas regulares para control y evaluación de los mini-implantes, además de reconocer que no hay
//                 garantías de éxito en el uso de los dispositivos, pues depende de la respuesta del organismo. Autorizo el
//                 uso de mini-implantes en el paciente citado a continuación.
//                 <br></br>
//                 Si ( ) No ( )
//                 <br></br><br></br>
//                 Autorizo también la utilización de fotografías y radiografías en medios de divulgación cientifica y
//                 publicaciones 
//                 <br></br>
//                 Si ( ) No ( )
//                 <br></br><br></br>
//                 Nombre y apellido del paciente:<input type="text" value={paciente.name} disabled className={style.inputCon} /> 
//                 <br></br>
//                 Edad: <input type="text" value={paciente.edad} disabled className={style.inputCon} />
//                 <br></br>
//                 Fecha: <input type="date" onChange={handleForm} className={style.inputCon} />
//             </p>}
//             {type == 4 && <p className={style.consen}><h3>CONSENTIMIENTO INFORMADO DE OPERATORIA DENTAL</h3>

//                 Ciudad: <input value={paciente.ciudad} disabled type="text" className={style.inputCon} /> 
//                 <br></br>
//                 Fecha: <input type="date" name="date" onChange={handleForm} className={style.inputCon} /> 
//                 <br></br><br></br>
//                 Yo: <input value={paciente.name} disabled type="text" className={style.inputCon} /> identificado con CC <input value={paciente.cedula} disabled type="text" className={style.inputCon} /> actuando en nombre propio o como representante legal del menor de edad o persona con incapacidad mental para tomar
//                 decisiones cuyo nombre es: <input type="text" name="menorname" onChange={handleForm} className={style.inputCon} /> con documento de identidad No. <input type="text" name="menorcedula" onChange={handleForm} className={style.inputCon} />
//                 <br></br>
//                 <br></br>
//                 <h4>DECLARO QUE SE ME HA INFORMADO</h4>
//                 <br></br>

//                 * Mi responsabilidad como usuario de asistir a las citas de revision o control programadas.
//                 <br></br>
//                 * En caso de recibir anestesia, la recomendación de evitar morder el labio o carrillo de la(s) área(s) anestesiada(s).
//                 <br></br>
//                 * Se requiere informar la odontólogo, en caso de alergico(a) a algun medicamento o tenido antecedentes de alergias a la anestesia local
//                 <br></br>
//                 * La necesidad de presentar Información verídica y real sobre antecedentes al odontólogo y cualquier cambio en el estado de la salud.

//                 <br></br><br></br>
//                 Operatoria: actividades realizadas en las superficies de los dientes que tiene como finalidad eliminar la caries o
//                 reconstruir superficies fracturada, incluye la eliminacion de las partes de la estructura dentaria o en su defecto la remodelación adecuada para recibir
//                 posteriormente los materiales restauradores. Dichos materiales pueden ser temporales o definitivos (calza o cemento temporal)
//                 <br></br><br></br>
//                 <h4>RIESGOS Y/O COMPLICACIONES</h4>
//                 <br></br>
//                 * Fractura de la restauración debido a su extensión:<br></br>
//                 * Desalojo de la restauración debido a su extensión y/o dificil retención<br></br>
//                 * Fractura de la estructura dental permanente cuando la perdida sea mayor al 65% o por debilidad de las paredes.<br></br>
//                 * Sensibilidad dental leve a cambios térmicos (calor o frio) que disminuya con el tiempo<br></br>
//                 * Sangrado, laceraciones de tejidos orales con fresa o instrumentos utilizados en el procedimiento.<br></br>
//                 * Posibilidad de requerir tratamiento endodontico y/o protésico posterior.<br></br>
//                 * Cambio de color en la restauración.<br></br>
//                 * Ingestión de materiales o instrumentos utilizados durante el procedimiento.<br></br>
//                 <br></br><br></br>
//                 <h4>RECOMENDACIONES QUE APLICAN</h4>
//                 <br></br>
//                 * Acatar las instrucciones sobre técnicas e implementos para mantener una higiene oral.<br></br>
//                 * No consumir alimentos durante las primeras dos horas<br></br>
//                 * No consumir alimentos duros o pegajosos las primeras 72 horas.<br></br>
//                 * Evitar golpes en los dientes.<br></br>
//                 * Tomar los medicamentos ordenados por el odontólogo como esta en la prescripción, si
//                 ocurre reacciones (brotes, rasquiña, dolor estomacal) debe suspenderlos y consultar con el odontólogo.<br></br>
//                 * Acudir al odontólogo si presenta dolor agudo o fuerte.<br></br>
//             </p>}
//             {type == 5 && <p className={style.consen}>

//                 <h3>FORMULARIO DE CONSENTIMIENTO INFORMADO PARA ANESTESIA LOCAL</h3>

//                 {paciente.edad > 17 ? <p>El Sr(a)<input type="text" disabled value={paciente.name} className={style.inputCon} />  de <input type="text" value={paciente.edad} disabled className={style.inputCon} />años de edad,
//                     con cedula de ciudadanía No. <input value={paciente.cedula} disabled type="text" className={style.inputCon} /> de <input type="text" value={paciente.departamento} disabled className={style.inputCon} /> con domicilio en la <input value={paciente.direccion} disabled type="text" className={style.inputCon} /> de <input value={paciente.ciudad} disabled type="text" className={style.inputCon} /></p>
//                     :
//                     <p>El Sr(a) <input type="text" value={paciente.name} disabled className={style.inputCon} /> de <input type="text" disabled value={paciente.edad} className={style.inputCon} /> años de edad,  con cedula
//                         de ciudadania No. <input type="text" disabled value={paciente.cedula} className={style.inputCon} /> de <input type="text" value={paciente.departamento} disabled className={style.inputCon} /> con domicilio  en la <input type="text" value={paciente.direccion} className={style.inputCon} /> de <input type="text" value={paciente.ciudad} className={style.inputCon} /> en calidad de
//                         acudiente de el Sr(a) <input type="text" name="menorname" onChange={handleForm} className={style.inputCon} />.</p>}
//                         <br></br>
//                         <h4>DECLARO</h4>
//                 <br></br>
//                 Que el/la Dr.(a) <input type="text" name="profesional" onChange={handleForm} value={`${user?.name} ${user?.lastname}`} disabled className={style.inputCon} /> me ha
//                 explicado que el tratamiento que voy a recibir Implica a administración de ANESTESIA LOCAL.
//                 <br></br><br></br>
//                 * El propósito principal de la anestesia es interrumpir transitoriamente la función
//                 sensitiva con el fin de realizar el tratamiento sin dolor.
//                 <br></br>
//                 * Le anestesia consiste en proporcionar, mediante una inyección, sustancias que
//                 provocan un bloqueo reversible de los impulsos nervioso, de tal manera que se
//                 interrumpa transitoriamente la función sensitiva.
//                 <br></br>
//                 * El/la profesional me ha explicado que voy a tener la sensación de adormecimiento del
//                 labio o de la cara, que normalmente van a desaparecer espontáneamente entre una y
//                 cuatro horas, de acuerdo con la velocidad que mi organismo metabolice el anestésico,
//                 durante este tiempo debo cuidarme de no morderme ni lastimarme, para no crear
//                 lesiones traumáticas por mordeduras ya que por el adormecimiento presente en los
//                 tejidos puedo auto lastimarme sin darme cuenta.
//                 <br></br>
//                 * También me ha explicado que la administración de la anestesia puede provocar, en el
//                 lugar o zona en que se administre la inyección, ulceración de la mucosa y dolor y con
//                 menos frecuencia, limitaciones en el momento de apertura o cierre en la boca
//                 (trismo) que puede requerir tratamiento ulterior, también la anestesia puede provocar
//                 Una baja en la presión arterial o sensación de mareo Y en muy pocas ocasiones puede
//                 provocar una parestesia prolongada (sensación de adormecimiento), que puede ir de
//                 unos días hasta varios meses, en caso de pincharse un nervio.
//                 <br></br>
//                 * Comprendo que, aunque según se me ha explicado, de mis antecedentes personales
//                 no se deducen posibles alergias o hipersensibilidad al agente anestésico. La anestesia
//                 puede provocar urticaria, dermatitis por contacto o generar, asma, edema
//                 angioneurotico, que en caso extremos, puede fequerir tratamiento URGENTE ,
//                 <br></br><br></br>
//                 El/la profesional me ha explicado que de acuerdo a mis antecedentes personales<br></br><br></br>
//             </p>}
//             {type == 6 && <p className={style.consen}><h3>CONSENTIMIENTO INFORMADO PARA URGENCIAS ODONTOLOGICAS</h3>


//                 Ciudad:<input type="text" value={paciente?.ciudad} disabled className={style.inputCon} />
//                 <br></br>
//                 Fecha: <input type="date" name="date" className={style.inputCon} />
//                 <br></br><br></br>

//                 Yo: <input type="text" value={paciente.name} disabled className={style.inputCon} />  identificado con  CC <input type="text" disabled value={paciente.cedula} className={style.inputCon} />
//                 Actuando en nombre propio  o como represent legal del menor de edad o de la persona con
//                 incapacidad mental para tomar decisiones cuyo nombre es: <input type="text" className={style.inputCon} />
//                 con documento de identidad No <input type="text" className={style.inputCon} />
//                 <br></br><br></br>
//                 <h4>DECLARO QUE SE ME HA INFORMADO</h4>
//                 <br></br>
//                 * Mi responsabilidad como usuario de asistir cumplidamente a las citas de remisión y/o
//                 control posteriores a la atencion de urgencias.
//                 <br></br>
//                 * En caso de requirir anestesia, la recomendaciones para evitar morderme el labio o
//                 carrillo del (las) áreas(s) anestestada(s).
//                 <br></br>
//                 * Solicitar cita en caso de presentarse signos o síntomas posteriores a la realización del
//                 tratamiento.
//                 <br></br>
//                 * Necesidad de informar al odontólogo, en caso de ser alérgico(a) a algún medicamento o
//                 teniendo antecedentes de alergia a la anestesia local.
//                 <br></br>
//                 * La necesidad de presentar la información verídica y real sobre antecedentes médicos,
//                 odontológicos y cualquier cambio en el estado de la salud.
//                 <br></br>
//                 * Seguir recomendaciones pre quirúrgicas, suspensión o tomas de medicamentos,
//                 exámenes de laboratorio, dietas recomendadas etc. En caso de ser remitido a una
//                 intervención quirúrgica o procedimiento programado posteriormente.
//                 <br></br>
//                 * Asistir cumplidamente a las citas de control
//                 <br></br><br></br>
//                 <h4>ATENCION DE URGENCIAS</h4>
//                 <br></br>
//                 Atención de urgencias: atención clínica que requiere y recibe un paciente por presentar una
//                 condición clínica aguda, o de aparición súbita, que no da espera a la consulta programada o
//                 electiva como solución de procesos agudos, dolorosos, hemorrágicos, traumáticos o
//                 infecciosos. En esta atención se brinda la solución preliminar del caso clínico sin practicar el
//                 tratamiento definitivo, salvo cuando la condición clínica permite practicar el mismo.
//                 <br></br>
//                 Urgencia no accidental: entendido como la atención urgida por causa de un dolor, edema,
//                 sangrado o situación que amerite atención inmediata, siendo eliminado el dolor o el factor
//                 inicial del evento sin realizar tratamiento definitivo.
//                 <br></br>
//                 Urgencia accidental: entendida esta por la lesión causada por un accidente sobre los tejidos
//                 propios del paciente.
//                 <br></br><br></br>
//                 <h4>RIESGOS Y/O COMPLICACIONES</h4>
//                 <br></br>
//                 * Hemorragias, infección, alveoltis, edemas, perdida de la sensibilidad dental o de zonas
//                 de cavidad oral y cara
//                 <br></br>
//                 * Fracturas Oseas, comunicación con seno, Paretesa, equimosis, rismos, Imitación de la apertura, fractura dental
//                 <br></br>
//                 * Desplazamiento de las piezas dentales al interior del tejido, laceracion de los tejidos.
//                 <br></br>
//                 * Ingestión de piezas dentarias o de instrumentaria. </p>}
//                 <br></br>
//     </div>  
//   <div className={style.buttons}>
//   <button className={style.button} onClick={() => {setNewConsen(false); crearConsen()}}>Firmar</button>
//   <button className={style.button} onClick={() => setNewConsen(false)}>Volver</button>
//   </div>
//     </div>
//         }
//         </>
//     )
// }
}

export default Consentimiento