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
                },
                identificador:{
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                numero: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                grupo: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    defaultValue: 'General'
                }
            }
        },{
            sequelize,
            modelName: 'permiso',
            timestamps: true,
            tableName: 'permisos',
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