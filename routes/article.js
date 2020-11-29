import routerx from 'express-promise-router';
import articleController from '../controllers/ArticleController';
import auth from '../middlewares/auth';

const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise

// solo los administradores y vendedores tienen acceso a estas rutas
router.post('/add',auth.verifySeller ,articleController.add);
router.get('/query',auth.verifySeller ,articleController.query);
router.get('/queryCode',auth.verifyUser ,articleController.queryCode); // puede consultar un adm, vendedor, almacenero
router.get('/list',auth.verifySeller ,articleController.list);
router.put('/update',auth.verifySeller ,articleController.update);
router.put('/activate',auth.verifySeller ,articleController.activate);
router.put('/deactivate',auth.verifySeller ,articleController.deactivate);
router.delete('/remove',auth.verifySeller ,articleController.remove);

export default router;