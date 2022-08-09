const mongoose = require('mongoose');

const dbConnection = async () =>{
    try{
        mongoose.connect(process.env.DB_CONNECT);
        console.log('DB_ONLINE')
    } catch(error){
        console.log(error);
        throw new Error('DB not connected!')
    }
}

module.exports = dbConnection