const User = require("../database/models/User");

module.exports = {
    async userExists(email){
        const user = await User.findOne({ email});
        if (user) {
            throw new Error('El usuario ya existe')
        }

    }
}