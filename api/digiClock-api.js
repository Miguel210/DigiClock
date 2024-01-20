const argv = require('process-argv')();
const fs = require('fs');
const path = require('path');
const envFile  = (argv.options||{})["env-file"] || '.\env';

if(!fs.existsSync(path.join(__dirname, envFile))){
    console.log("No existe");
    process.exit(1);
}


require('dotenv').config({path:path.join(__dirname, envFile)});

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
let appRoutes = null;

app.use(compression());
app.use(bodyParser.urlencoded({'extended': true,limit: process.env.MAX_BODY_SIZE || '50mb' }));
app.use(bodyParser.json({limit: process.env.MAX_BODY_SIZE || '50mb', type: 'application/vnd.api+json' }));

const port = parseInt(process.env.APP_PORT || '8000');

let sequelize = null;

const run = async()=> {
    return new Promise(async(resolve, reject) => {
        try {
            const {Sequelize,DataTypes} = require('sequelize');
            const appInfoDB = {
                hostname: process.env.APP_DB_HOSTNAME,
                port: process.env.APP_DB_PORT,
                name: process.env.APP_DB_NAME,
                user: process.env.APP_DB_USER,
                password: process.env.APP_DB_PASSWORD,
                dialect: process.env.APP_DB_DIALECT
            };
            sequelize = new Sequelize(appInfoDB.name, appInfoDB.user, appInfoDB.password, {
                "host" : appInfoDB.hostname,
                "port" : appInfoDB.port,
                dialect: appInfoDB.dialect
            });
            await sequelize.authenticate();
            resolve(sequelize);
        } catch (error) {
            reject(error);
        }
    })
}

const connectDB = function(app){
    run(app).then((sequelize) => {
        appRoutes = require("./routes")(app, sequelize);
        app.use("/api/v1", appRoutes);
        app.listen(port,function(){console.log(`corriendo en el puerto ${port} con un máximo de entrada de ${process.env.MAX_BODY_SIZE}`)});
    }).catch((error) => {
        console.log(error.message);
    });
}

connectDB(app);