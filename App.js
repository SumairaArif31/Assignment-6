const express=require('express');
const bodyParser=require('body-parser');
const dbmodel=require('./config/database.config');
const mongoose=require('mongoose');

//Express App Creating
const app=express();

//content-type parse and encoding url
app.use(bodyParser.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//Database Configuring
mongoose.Promise=global.Promise;

//connecting with the database
mongoose.connect(dbmodel.url,{
    useNewUrlParser:true
}).then(()=>{
    console.log('Database Connected Successfully');
}).catch(err=>{
    console.log('Database Connection Failed',err);
    process.exit();
});

//defining welcome Route
app.get('/',(req, res)=>{
    res.json({"Message":"Welcome to USER Creating Panel"});
});

//Requiring the Routes
require('./app/routes/users.routes')(app);

//Defining listening for Requesting
app.listen('3080',()=>{
    console.log('Lis3tening to Port 3080');
});



