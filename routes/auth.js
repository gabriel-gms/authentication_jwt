const Router = require('express')
const authController = require('../controllers/authController')

const routes = Router()

routes.get('/ping', (req, res)=>{
    res.json({msg: "pong"})
})

routes.post('/register', authController.registerController)
routes.post('/login', authController.loginController)

module.exports = routes