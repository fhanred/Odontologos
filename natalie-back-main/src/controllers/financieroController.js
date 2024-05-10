const {Financiero} = require("../db")

module.exports = {
    getFinanza: async () => {
        const finanza = await Financiero.findAll()
        return finanza
    },
    newPay: async (data) => {
        await Financiero.create(data)
        return "Creado exitosamente"
    }
}