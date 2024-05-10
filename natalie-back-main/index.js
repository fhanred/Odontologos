const app = require("./src/app")
const {conn} = require("./src/db")

conn.sync({alter:true}).then(() => {
    console.log("Conectado a la base de datos")
    app.listen(3001, () => {
        console.log("Servidor en linea en el puerto 3001")
    })
})