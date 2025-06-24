const Router = require('express')

const routes = Router()

routes.get('/ping', (req, res)=>{
    res.json({msg: "pong"})
})

routes.post

module.exports = routes