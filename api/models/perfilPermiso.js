module.exports = function(sequelize) {
    const {DataTypes} = require('sequelize');

    const baseModel = require('./base.js')(sequelize);

    class Entity extends baseModel {

        static assoc(modelos){
            const me = this;
            modelos[me.name].belongsTo(modelos.perfil,{as: 'Perfil', foreignKey:"perfil_id",targetKey:"id",hooks:true,contrains:false});
            modelos[me.name].belongsTo(modelos.permiso,{as: 'Permiso', foreignKey:"permiso_id",targetKey:"id",hooks:true,contrains:false});
        }
    }

    Entity.init(
        {
            ...baseModel.fields(),
            ...{
                perfil_id:{
                    type: DataTypes.STRING(24),
                    allowNull: false
                },
                permiso_id:{
                    type: DataTypes.STRING(24),
                    allowNull: false                    
                },
                valor:{
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            }
        },{
            sequelize,
            modelName: 'perfilPermiso',
            timestamps: true,
            tableName: 'perfilPermisos',
            paranoid: true,
            defaultScope: {
                attributes: {
                    exclude: ['createAt','updatedAt','deleteAt']
                },
                where: {
                    activo: true,
                }
            },
            indexes: [
                {
                    unique: true,
                    fields: ['perfil_id','permiso_id'],
                    where: {deletedAt: null}
                },
                {fields:["perfil_id"]},
                {fields:["permiso_id"]},

            ]   
        }
    );
    return Entity;
}