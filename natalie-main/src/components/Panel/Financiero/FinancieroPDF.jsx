import { Page, View, Document, Text, Image } from '@react-pdf/renderer'
import logo from "../../../assets/logonatalie2.png"

const FinancieroPDF = ({financiero,desde,hasta, tipo}) => {

    return (
        <>
        <Document>
            <Page>
            <Image
                    source={{uri:logo}}
                    style={{width:"100px", margin:"30px auto", textAlign:"center"}}
                    />
                <Text style={{marginBottom:"6px", textAlign:"center", fontSize:"17px"}}>Registro financiero</Text>
                <Text style={{textAlign:"center", fontSize:"12px"}}>Desde: {desde}</Text>
                <Text style={{textAlign:"center", fontSize:"12px"}}>Hasta: {hasta}</Text>
                <Text style={{textAlign:"center", fontSize:"12px"}}>Pago por: {tipo}</Text>
            <View style={{marginTop:"50px"}}>
            <View style={{display:"flex", flexDirection:"row", fontSize:"12px", padding:"4px 0px", marginTop:"0px", textAlign:"center", borderBottom:"2px solid black", borderTop:"2px solid black"}}>
            <Text style={{width:"120px"}}>FECHA</Text>
            <Text style={{width:"120px"}}>CAUSANTE</Text>
            <Text style={{width:"120px"}}>PROCEDIMIENTO</Text>
            <Text style={{width:"120px"}}>VALOR</Text>
            <Text style={{width:"120px"}}>METODO DE PAGO</Text>
            </View>
            {financiero?.map( u => {
            return(
            <View style={{display:"flex", height:"50px", alignItems:"center", flexDirection:"row", fontSize:"12px", margin:"0 auto", textAlign:"center", borderBottom:"1px solid gray"}}>
               <Text style={{width:"120px"}}>{u.date}</Text>
              <Text style={{width:"120px"}}>{u.user}</Text>
              <Text style={{width:"120px"}}>{u.reason}</Text>
              <Text style={{width:"120px"}}>${Number(u.monto).toLocaleString()}</Text>
              <Text style={{width:"120px"}}>{u.tipo}</Text>
            </View>)})}
          </View>
            </Page>
        </Document>
        </>
    )
}

export default FinancieroPDF