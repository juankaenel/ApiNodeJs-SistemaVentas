import routerx from 'express-promise-router';
import articleController from '../controllers/ArticleController';

const router = routerx(); // routerx usamos para que las rutas nos devuelvan un promise

router.post('/add', articleController.add);
router.get('/query', articleController.query);
router.get('/list', articleController.list);
router.put('/update', articleController.update);
router.put('/activate', articleController.activate);
router.put('/deactivate', articleController.deactivate);
router.delete('/remove', articleController.remove);

export default router;