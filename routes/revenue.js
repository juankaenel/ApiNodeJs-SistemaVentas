import routerx from 'express-promise-router';
import revenueController from '../controllers/RevenueController';
import auth from '../middlewares/auth';
const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise

router.post('/add',auth.verifyGrocer ,revenueController.add); // solo los administradores y almaceneros pueden acceder
router.get('/query',auth.verifyGrocer ,revenueController.query);
router.get('/list',auth.verifyGrocer ,revenueController.list);
router.get('/twelveMonthChart',auth.verifyUser,revenueController.twelveMonthChart); // el gráfico lo puede ver cualquier usuario
router.get('/checkDates',auth.verifyUser ,revenueController.checkDates);
router.put('/activate',auth.verifyGrocer ,revenueController.activate);
router.put('/deactivate',auth.verifyGrocer ,revenueController.deactivate);
/*  router.put('/update',auth.verifyGrocer ,revenueController.update);
router.delete('/remove',auth.verifyGrocer ,revenueController.remove);
*/
export default router;