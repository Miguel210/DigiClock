module.exports = function(appModels) {
    const baseCtrlr = require('./baseCtrlr')(appModels);
    const bcrypt = require('bcryptjs');

    class Entity extends baseCtrlr {
        constructor(opts){
            super(opts);
        }

    }

    return Entity;
}