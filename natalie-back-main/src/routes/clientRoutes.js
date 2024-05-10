const {Router} = require("express")
const clientRoutes = Router()
const {getClientId, getClients, createClient, editClient, newEvolucion, newCompromiso, findConsen, newCotizacion, findCoti, getCoti} = require("../controllers/clientController")

clientRoutes.get("/:id", async (req,res) => {
    const {id} = req.params
    if(id !== "all"){
        try{
        const client = await getClientId(id)
        res.json(client)
        }
        catch(error){
            console.log(error)
        }
    }else{
        try{
        const clients = await getClients()
        res.json(clients)
    }
    catch(error){
        console.log(error)
    }
    }
})

clientRoutes.post("/", async (req,res) => {
    try{
    const newClient = await createClient(req.body)
    res.json({status:newClient})
    }
    catch(error){
        console.log(error)
    }
})

clientRoutes.put("/", async (req,res) => {
    try{
        const response = await editClient(req.body)
        res.json({status:response})
    }catch(error){
        console.log(error)
    }
})

clientRoutes.post("/evolucion", async (req,res) => {
    try{
        const response = await newEvolucion(req.body)
        res.json({status:response})
    }catch(error){
        console.log(error)
    }
})

clientRoutes.post("/compromiso", async (req,res) => {
    try{
        const response = await newCompromiso(req.body)
        res.json({status:response})
    }catch(error){
        console.log(error)
    }
})

clientRoutes.post("/cotizacion", async (req,res) => {
    try{
        const response = await newCotizacion(req.body)
        res.json({status:response})
    }catch(error){
        console.log(error)
    }
})

clientRoutes.get("/cotizacion/:id", async (req,res) => {
    try{
        const response = await findCoti(req.params.id)
        res.json(response)
    }catch(error){
        console.log(error)
    }
})

clientRoutes.get("/consen/:id", async (req,res) => {
    try{
        const response = await findConsen(req.params.id)
        res.json(response)
    }catch(error){
        console.log(error)
    }
})

clientRoutes.get("/cotizaciones/all", async (req,res) => {
    try{
        const response = await getCoti()
        res.json(response)
    }catch(error){
        console.log(error)
    }
})

module.exports = clientRoutes