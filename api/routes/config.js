const configuracion = {
    modelos: [

        {
            name: 'permiso',
            methods: ['get']
        },

        {
            name: 'perfil',
            methods: ['get','post','put','delete']
        },

        {
            name: 'usuario',
            methods: ['get','post','put','delete']
        },

        {
            name: 'perfilPermiso',
            methods: ['get','post','put','delete']
        }

] }
module.exports = configuracion;