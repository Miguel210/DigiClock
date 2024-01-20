module.exports = function(appModels){
    const {createId} = require("@paralleldrive/cuid2");

    class Controller {

        constructor(opts){
            this.baseRoute = opts.baseRoute;
            this.routes = {
                "get": [
                    {
                        "url": `/${this.baseRoute}`,
                        "action": this.onGetAll
                    },
                    {
                        "url": `/${this.baseRoute}/:id`,
                        "action": this.onGet
                    }

                ],
                "put": [
                    {
                        "url": `/${this.baseRoute}/:id`,
                        "action": this.onPut,
                    }
                ],
                "delete": [
                    {
                        "url": `/${this.baseRoute}/:id`,
                        "action": this.onDelete,
                    }
                ],
                "post":[
                    {
                        'url': `/${this.baseRoute}`,
                        'action': this.onPost,
                    }
                ]
            };
        }

        static createId(){
            return createId();
        }

        /**
         * Return all the requested records
         * @param {*} entityModel 
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
        async onGetAll(entityModel, req,res,next){
            res.json(await entityModel.findAll());
        }

        /**
         * Return one user by id
         * @param {*} entityModel 
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
        async onGet(entityModel, req,res,next){
            let id = req.params?.id || ''; 
            res.json(await entityModel.findByPk(id));
        }

        /**
         * Insert a record by ID and returns the created record
         * @param {*} entityModel 
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
        async onPost(entityModel, req,res,next){
            let record = await entityModel.create(req.body);
            if (record){
                res.json(record);
            }else{
                res.status(400);
            }
        }


        /**
         * Update a record by ID and returns the updated record
         * @param {*} entityModel 
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
        async onPut(entityModel, req,res,next){
            let record = await entityModel.findByPk(req.params?.id||'');
            if (record){
                record = {...req.body};
                await record.save();
                res.json(record);
            }else{
                res.status(404);
            }
        }

        /**
         * Deletes a user by id
         * @param {*} entityModel 
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */

        async onDelete(entityModel, req,res,next){
            try {
                let record = await entityModel.findByPk(req.params?.id||'');
                if (record){
                    await record.destroy();
                    res.status(202);
                }else{
                    res.status(404);
                }
            } catch (error) {
                res.status(400);
            }
        }
    }

    return Controller;
}
