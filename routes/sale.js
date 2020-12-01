import routerx from 'express-promise-router';
import saleController from '../controllers/SaleController';
import auth from '../middlewares/auth';
const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise

// solo los administradores y vendedores pueden usar estas rutas
router.post('/add',auth.verifySeller ,saleController.add);
router.get('/query',auth.verifySeller ,saleController.query);
router.get('/list',auth.verifySeller ,saleController.list);
router.put('/activate',auth.verifySeller ,saleController.activate);
router.put('/deactivate',auth.verifySeller ,saleController.deactivate);
/*  router.put('/update',auth.verifySeller ,saleController.update);
router.delete('/remove',auth.verifySeller ,saleController.remove);
*/
export default router;