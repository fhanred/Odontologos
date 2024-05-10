const {User} = require("../db")
const jwt = require("jsonwebtoken")

module.exports = {
    newUser: async (data) => {
        await User.create(data)
        return "Usuario creado"
    },
    verifyUser: async (data) => {
       const user = await User.findAll({
            where:{
                email:data.email,
                password: data.password
            }
        })
        // console.log(user.lenght)
        if(user.length){
            const token = jwt.sign({id:user[0].id, email:user[0].email, role:user[0].role, name:user[0].name,lastname:user[0].lastname, image:user[0].image}, "natalie")
            // console.log(user)
            // console.log(token)
            if(user.length) return {status:true, token:token, user:{id:user[0].id, email:user[0].email, role:user[0].role, name:user[0].name,lastname:user[0].lastname, image:user[0].image}}
        }
        return {status:false}
    },
    authUser: (data) => {
        const res = jwt.verify(data.token,"natalie")
        if(res) return {status:true, user:res}
        return false
    },
    putUser: async (data) => {
        let user;
        if(data.newpass){
            user = await User.findOne({
                where:{
                    id:data.id,
                    password:data.oldpass
                }
            })
        }else{
            user = await User.findOne({
                where:{
                    id:data.id,
                    // password:data.oldpass
                }
            })
        }
        if(user){
            user.password = data.newpass
            user.image = data.image
            user.save()
            return "Contraseña actualizada"
        }
        return "Contraseña anterior invalida"
    },
    getUsers: async () => {
        const users = await User.findAll()
        return users
    },
    deleteUser: async (id) => {
        const user = await User.findOne({where:{id:id}})
        await user.destroy()
        return "Usuario eliminado"
    }
}