import express from "express";
import sequelize from "./Database/config.js";
import {connectDB} from "./Database/config.js";
import allRoutes from "./Routes/allRoutes.js";
import init from "./Database/init.js";
import Session from "express-session";
import mysequelizeStore from "./Database/sessionconfig.js";
import cors from 'cors';

const app=express();
connectDB();

app.use(Session(
    {
    secret:"secret",
    store: mysequelizeStore,
    saveUninitialized: true,
    resave: false,
    proxy: false,
    })
);

mysequelizeStore.sync({});
init();


app.use(express.json());
app.use('/',allRoutes);
const port=5000;



let corsOptions=cors({
    origin:"http://localhost:5173"
})

app.use(corsOptions)
app.listen(port,(error)=>{
    if(error)
    return console.log("Server not started. "+error);
    console.log("Server started at port "+port);
    
});

app.get('/getget',corsOptions,(req,res)=>
res.send("you got"));

;