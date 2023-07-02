const express = require('express');
const serverConfig = require('./configs/server.config');
const { default: mongoose } = require('mongoose');
const dbConfig = require('./configs/db.config');
const userModel = require('./models/user.model');

const app = express();
/**
 * Logic to connect to MongoDB and create an Admin user
 */

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to DB");
});
db.once("open", () => {
  console.log("DB is connected");
  init();
});

async function  init(){
    
    /**
     * Check if the admin user is already present
     */
    let admin = await userModel.findOne({
        userId : "admin"
    })

    if(admin){
        console.log("Admin user already present");
        return;
    }

    admin = await userModel.create( {
        name : "Vikarn Jha",
        userId : "admin",
        email : "vikarnjha91@gmail.com",
        userType : "Admin",
        password : "Welcome"
    });
    console.log(admin);

    
}



app.listen(serverConfig.PORT, ()=>{
    console.log(`server started on the port number ${serverConfig.PORT}` );
})