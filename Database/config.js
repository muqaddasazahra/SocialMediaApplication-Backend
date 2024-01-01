import { Sequelize } from "sequelize";



const sequelize= new Sequelize("socialapp","postgres","admin",
{
    host:"localhost",
    port:5432,
    dialect:"postgres",
    logging: false,

});

export const connectDB=async()=>
{try{
    await sequelize.authenticate();
    console.log("Database Connected");
}
catch(error)
{
    console.log("Database not connected",+error);
}}



export default sequelize;