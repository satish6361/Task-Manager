const mongoose = require('mongoose')

const connectDB = ()=>{
    const db_url = process.env.DB_URL
    mongoose.connect(db_url,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`MongoDB connected with server :${data.connection.host}`);
    })

}

module.exports = connectDB;