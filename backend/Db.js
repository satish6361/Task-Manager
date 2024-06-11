const mongoose = require('mongoose')

const connectDB = ()=>{
    const db_url = "mongodb+srv://ssatishbalathe:HbyMC18kMM41OU21@cluster0.skxybga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    mongoose.connect(db_url,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`MongoDB connected with server :${data.connection.host}`);
    })

}

module.exports = connectDB;