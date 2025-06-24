const authServices = require('../services/authServices')
const bcrypt = require('bcrypt')

const functionsController = {
    registerController: async (req, res)=>{
        const {name, email, password} = req.body

        //validação
        if(!name || !email || !password){
            return res.json({msg:"voce nao preencheu todos os campos"})
        }

        //consulta ao banco
        const userExist = await authServices.getUser(email)
        if(userExist){
            return res.json({msg:"usuario existe"})
        }

        //hash
        const hash = await bcrypt.genSalt(15)
        const passHash = await bcrypt.hash(password, hash)

        //criação no banco
        const user = await authServices.postUser(name, email, passHash)
        if(user){
            return res.json({msg: user})
        }
        return res.json({msg: "nao foi possivel criar usuario"})
    }
}

module.exports = functionsController