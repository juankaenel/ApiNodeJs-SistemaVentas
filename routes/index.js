import routerx from 'express-promise-router';
import categoryRouter from './category';
import articleRouter from './article';
import userRouter from './user';
import personRouter from './person';
import revenueRouter from './revenue';
import saleRouter from './sale';

const router = routerx();
/* /api/ruta */
router.use('/category', categoryRouter); 
router.use('/article', articleRouter); 
router.use('/user', userRouter); 
router.use('/person', personRouter); 
router.use('/revenue', revenueRouter); 
router.use('/sale', saleRouter); 

export default router;