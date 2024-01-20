module.exports = function(sequelize) {
    const {DataTypes} = require('sequelize');

    const baseModel = require('./base.js')(sequelize);

    class Entity extends baseModel {}

    Entity.init(
        {
            ...baseModel.fields(),
            ...{
                nombre:{
                    type: DataTypes.STRING(250),
                    allowNull: false
                }
            }
        },{
            sequelize,
            modelName: 'perfil',
            timestamps: true,
            tableName: 'perfiles',
            paranoid: true,
            defaultScope: {
                attributes: {
                    exclude: ['createAt','updatedAt','deleteAt']
                },
                where: {
                    activo: true,
                }
            }   
        }
    );
    return Entity;
}