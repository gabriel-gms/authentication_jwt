const User = require('../schemas/user')

const functionsService = {
    getUser: (email)=>{
        return User.findOne({
            email: email
        })
    },
    postUser: async (name, email, passHash)=>{
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
    }
}

module.exports = functionsService