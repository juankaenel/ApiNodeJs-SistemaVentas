import routerx from 'express-promise-router';
import articleController from '../controllers/ArticleController';
import auth from '../middlewares/auth';

const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise

// solo los administradores y almaceneros tienen acceso a estas rutas
router.post('/add',auth.verifyGrocer ,articleController.add);
router.get('/query',auth.verifyGrocer ,articleController.query);
router.get('/queryCode',auth.verifyUser ,articleController.queryCode); // puede consultar un adm, vendedor, almacenero
router.get('/list',auth.verifyGrocer ,articleController.list);
router.put('/update',auth.verifyGrocer ,articleController.update);
router.put('/activate',auth.verifyGrocer ,articleController.activate);
router.put('/deactivate',auth.verifyGrocer ,articleController.deactivate);
router.delete('/remove',auth.verifyGrocer ,articleController.remove);

export default router;