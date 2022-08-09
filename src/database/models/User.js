const {Schema,model} = require('mongoose');

const UserSchema = Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    active:{
        type:Boolean,
        default:false
    }
})

module.exports = model('User',UserSchema)