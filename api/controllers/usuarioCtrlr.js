module.exports = function( appModels ) {
    const baseCtrlr = require('./baseCtrlr')(appModels);
    const Bcrypt = require('bcryptjs');
    
    class Entity extends baseCtrlr {    
        constructor(opts){
            super(opts);

            this.routes.post.push({
                'url': `/${this.baseRoute}/login`,
                'action': this.onPostLogin,
            });
        }

        async onPostLogin(entityModel, req,res,next){

        }

        
    }

    return Entity;

}