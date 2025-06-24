const authServices = require('../services/authServices')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    },
    loginController: async (req, res)=>{
        const {email, password} = req.body

        //validações
        if(!email || !password){
            return res.json({msg:"voce nao preencheu todos os campos"})
        }

        //conferecias de existencia e de senha
        const user = await authServices.getUser(email)
        if(!user){
            return res.json({msg: "usuario nao existe"})
        }

        const passCheck = await bcrypt.compare(password, user.password)
        if(!passCheck){
            return res.json({msg: "senha incorreta"})
        }

        //criação de token
        try {
            const secret = process.env.SECRET 
            const token = jwt.sign({
                id: user.id
            }, secret,)
            return res.json({msg: "token: "+token})
        } catch (error) {
            return res.json({msg: "acesso negado"})
        }
    }
}

module.exports = functionsController