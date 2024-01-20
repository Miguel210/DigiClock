module.exports = function( appModels) {
    const baseCtrlr = require('./baseCtrlr')(appModels);
    const Bcrypt = require('bcryptjs');

    class Entity extends baseCtrlr {
        constructor(opts){
            super(opts);
            this.baseRoute = 'permisos';
            this.routes = {
                "get": [
                    {
                        "url": `/${this.baseRoute}`,
                        "action": this.onGetAll,
                    }
                ]
            };
        }

    }
    return Entity;
}
