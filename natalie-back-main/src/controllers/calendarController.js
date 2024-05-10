const {Calendar} = require("../db")

module.exports = {
    getDates: async () => {
        const dates = await Calendar.findAll()
        return dates
    },
    getDatesById: async (id) => {
        const dates = await Calendar.findAll({where:{
            especialista:id
        }})
        return dates
    },
    postDate: async (data) => {
        await Calendar.create(data)
        return "Creado exitosamente"
    },
    deleteDate: async (id) => {
        const date = await Calendar.findOne({
            where:{
                id:id
            }
        })
        if(date){
            date.destroy()
            date.save()
            return "Eliminado exitosamente"
        }
        return "Date no encontrada"
    }
}