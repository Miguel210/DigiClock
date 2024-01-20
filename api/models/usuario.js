module.exports = function(sequelize) {
    const {DataTypes} = require('sequelize');
    const Bcrypt = require("bcryptjs");

    const baseModel = require('./base.js')(sequelize);

    class Entity extends baseModel {

        static assoc(modelos){
            const me = this;
            modelos[me.name].belongsTo(modelos.perfil,{as: 'Perfil', foreignKey:"perfil_id",targetKey:"id",hooks:true,contrains:false});
        }
    }

    const hashPwd = (usuario,opts)=>{
        if (!(usuario.changed('contrasena'))) {
            return usuario;
        }
        const salt = Bcrypt.genSaltSync(10);
        usuario.contrasena = Bcrypt.hashSync(usuario.contrasena,salt);
        return usuario;
    }

    Entity.init(
        {
            ...baseModel.fields(),
            ...{
                nombre:{
                    type: DataTypes.STRING(250),
                    allowNull: false
                },
                correo:{
                    type: DataTypes.STRING(250),
                    allowNull: false
                },
                contrasena:{
                    type: DataTypes.STRING(250),
                    allowNull: false
                },
                telefono:{
                    type: DataTypes.STRING(20),
                    allowNull: false
                },
                perfil_id:{
                    type: DataTypes.STRING(24),
                    allowNull: false
                },
                
            }
        },{
            sequelize,
            modelName: 'usuario',
            timestamps: true,
            tableName: 'usuarios',
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
                    fields: ['correo'],
                    where: {deletedAt: null}
                },
                {fields:["perfil_id"]},
                

            ],
            hooks:{
                beforeCreate: hashPwd,
                beforeUpdate: hashPwd
            }
        }
    );
    return Entity;
}