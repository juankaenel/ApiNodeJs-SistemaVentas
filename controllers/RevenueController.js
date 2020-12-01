import models from '../models/index';

async function increaseStock(idarticle,quantity){ // aumentar stock
    let {stock} = await models.Article.findOne({_id: idarticle}); // extraigo el stock que pertenece a ese id 
    let newStock = stock + parseInt(quantity); // sumo el stock actual más la cantidad que ingresó
    const reg = await models.Article.findByIdAndUpdate({_id:idarticle},{stock:newStock}); // id del articulo a actualizar, campo a actualizar que es el stock
};

async function decreaseStock(idarticle,quantity){ // disminuir stock
    let {stock} = await models.Article.findOne({_id: idarticle}); // extraigo el stock que pertenece a ese id 
    let newStock = stock - parseInt(quantity); // sumo el stock actual más la cantidad que ingresó
    const reg = await models.Article.findByIdAndUpdate({_id:idarticle},{stock:newStock}); // id del articulo a actualizar, campo a actualizar que es el stock
};

export default {
    add: async (req,res,next) => {
        try {
            const reg = await models.Revenue.create( req.body );
            // Actualizamos stock
            let details = req.body.details; // traigo el array de detalles
            details.map( x => { // lo itero por cada articulo y le aumento el stock
                increaseStock(x._id, x.quantity); // llamo a la func stock y le paso el id y cantidad
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    } ,
    query: async (req,res,next) => {
        try {
            const reg = await models.Revenue.findOne( {_id : req.query._id} )
            .populate('user', {name:1}) // usr que registro la compra/ingreso
            .populate('person',{name:1}) // proveedor responsable del ingreso
            if (!reg) { // si no existe el ingreso
                res.status(404).send({
                    message: 'El registro no existe!',
                }); 
            }
            else{ // si existe
                res.status(200).json(reg )
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor = req.query.valor; 
            const reg = await models.Revenue.find({ $or:[ {'comprobantNumber': new RegExp(valor, 'i')}, {'voucherSeries': new RegExp(valor,'i')}] })
            .sort({'createdAt':-1}) // ordena los registros de manera descendente (-1) muestra los ultimos registros, asc (1)
            .populate('user',{nombre:1})
            .populate('person',{name:1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    /* 
    update: async (req,res,next) => {
        try {
            const reg = await models.Revenue.findByIdAndUpdate({_id:req.body._id},{name: req.body.name, description: req.body.description }); // primer parámetro la búsqueda, segundo los valores a cambiar en ese registro
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Revenue.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    }, 
    
    No podemos borrar o actualizar un ingreso, solo activar y desactivarlo, esto provocará que el stock cambie automáticamente
    */
    activate: async (req,res,next) => {
        try {
            const reg = await models.Revenue.findByIdAndUpdate({_id:req.body._id},{state:1});
            // Actualizamos stock
            let details = reg.details; // traigo el array de detalles
            details.map( x => { // lo itero por cada articulo y le aumento el stock
                increaseStock(x._id, x.quantity); // llamo a la func stock y le paso el id y cantidad 
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    deactivate: async (req,res,next) => {
        try {
            const reg = await models.Revenue.findByIdAndUpdate({_id:req.body._id},{state:0});
            // Actualizamos stock
            let details = reg.details; // traigo el array de detalles
            details.map( (x) => { // lo itero por cada articulo y le decremento el stock
                decreaseStock(x._id, x.quantity); // llamo a la func stock y le paso el id y cantidad
            });
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error!'
            });
            next(error);
        }
    },
    twelveMonthChart: async (req,res,next) => { // Gráfico estadístico de 12 meses
        // Nos retorna el total de ingresos de los ultimos 12 meses
        try{
            const reg = await models.Revenue.aggregate(
                [
                    {   // como agruparé...
                        $group:{
                            _id:{  // agrupación de ingresos por mes y año
                                month:{$month:"$createdAt"}, 
                                year:{$year:"$createdAt"}
                            },
                            total: {$sum:"$total"}, // sumame todo los totales de la propiedad total del modelo
                            number:{$sum:1} // sumame el nro de ventas de 1 en 1
                        }
                    },
                    {
                        // como ordenaré
                        $sort: {
                            "_id.year":-1,"_id.month":-1 // por año y por mes en orden descendente
                        }
                    }
                ]
            ).limit(12); // 12 ultimos meses o 12 ultimas estadísticas
            res.status(200).json(reg);
        }catch(error){
            res.status(500).send({
                message:'Ocurrió un error!'
            });
            next(error);
        }
    }
}
