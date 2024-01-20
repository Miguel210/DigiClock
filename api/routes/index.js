module.exports = function(app,sequelize){

    const express = require('express');
    const router = express.Router();
    const path = require("path");
    const config = require('./config.js');
    const appModels = {};
    const appCotrollers = {};

    // load config models
    for(let modelo of config.modelos){
        const entityModel = require(path.join(__dirname,'..','models',modelo.name));
        appModels[modelo.name] = entityModel;
    }
    
    for(let modelo of config.modelos){
        const entityCtrlr = require(path.join(__dirname,'..','controllers',`${modelo.name}Ctrlr`))(appModels);
        appCotrollers[modelo.name] = new entityCtrlr({baseRoute: modelo.name });
        
        
        for (let method of Object.keys(appCotrollers[modelo.name].routes)){ 
            //entityCtrlr.routes
            
            // entityCtrlr.routes[method].each(r =>{
            //     router[method](r.url, r.action);
            // });
            console.log(method);
            router[method](
                appCotrollers[modelo.name].routes[method][0].url,
                appCotrollers[modelo.name].routes[method][0].action
            );
            
        }
        
    };
    // console.log(router)

    return router;

};

            

