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
        default:true
    }
})

UserSchema.methods.toJSON = function(){
    const{__v, password, active, ...user} = this.toObject()
    return user
}

module.exports = model('User',UserSchema)