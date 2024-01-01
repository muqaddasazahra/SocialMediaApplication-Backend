import sequelize from "./config.js";
import Session from "express-session";
import SequelizeStore from "connect-session-sequelize";


const sequelizeStore=SequelizeStore(Session.Store);
const mysequelizeStore=new sequelizeStore({db:sequelize});

export default mysequelizeStore;