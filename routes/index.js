import routerx from 'express-promise-router';
import categoryRouter from './category';
import articleRouter from './article';

const router = routerx();
/* /api/ruta */
router.use('/category', categoryRouter); 
router.use('/article', articleRouter); 
export default router;