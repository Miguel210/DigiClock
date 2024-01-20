
module.exports = function(sequelize){
    const {DataTypes, Model} = require('sequelize');
    const {createId} = require('@paralleldrive/cuid2');

    class Entity extends Model {

        static fields(){
            return {
                id: {
                    type: DataTypes.STRING(24),
                    primaryKey: true,
                    unique: true,
                    defaultValue: function(){
                        return createId();
                    },
                    set(value){
                        if(!value){
                            this.setDataValue('id',createId());
                        }
                    }
                },

                activo: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },

                urlImagen: {
                    type: DataTypes.VIRTUAL,
                    get(){
                        return this.id;
                    }
                }
            }

        }

        static indexes() {
            return [];
        }
    }

    return Entity;
};