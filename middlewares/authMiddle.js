const jwt = require('jsonwebtoken')

const check = (req, res, next)=>{
    const headerAuth = req.headers['authorization']
    const token = headerAuth && headerAuth.split(" ")[1]
    if(!token){
        return res.json({msg:"acesso negado"})
    }

    try {
        const secret = process.env.SECRET 
        jwt.verify(token, secret)
        next()
    } catch (error) {
        return res.json({msg:"token inválido"})
    }
}

module.exports = check