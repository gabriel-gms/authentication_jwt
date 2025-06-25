const Router = require('express')
const authController = require('../controllers/authController')
const checkToken = require('../middlewares/authMiddle')

const routes = Router()

routes.get('/ping', (req, res)=>{
    res.json({msg: "pong"})
})

routes.post('/register', authController.registerController)
routes.post('/login', authController.loginController)
routes.get('/user/:id', checkToken, authController.privateRoute) //Rota privada

module.exports = routes