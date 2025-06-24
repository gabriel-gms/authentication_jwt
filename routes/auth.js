const Router = require('express')
const authControler = require('../controllers/authController')

const routes = Router()

routes.get('/ping', (req, res)=>{
    res.json({msg: "pong"})
})

routes.post('/register', authControler.registerController)

module.exports = routes