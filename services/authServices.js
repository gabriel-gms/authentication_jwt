const User = require('../schemas/user')

const functionsService = {
    getUser: (email)=>{
        return User.findOne({
            email: email
        })
    },
    postUser: (name, email, passHash)=>{
        const user = new User({
            name,
            email,
            password: passHash
        })
        try {
            user.save()
            return user
        } catch (error) {
            return false
        }
    },
    getUserById: (id, pass) => {
        try {
            return User.findById(id, pass) 
        } catch (error) {
            return false
        }
    }
}

module.exports = functionsService