import routerx from 'express-promise-router';
import categoryRouter from './category';
import articleRouter from './article';
import userRouter from './user';
import personRouter from './person';

const router = routerx();
/* /api/ruta */
router.use('/category', categoryRouter); 
router.use('/article', articleRouter); 
router.use('/user', userRouter); 
router.use('/person', personRouter); 

export default router;