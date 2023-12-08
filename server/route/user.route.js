import express from 'express';
import userCtrl from '../controller/user.controller.js'
import authCtrl from '../controller/auth.controller.js';

const router = express.Router();

// User Routes
router.route('/api/users')
  .post(userCtrl.create) 
  .get(userCtrl.list);   
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)         
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove); 
  router.param('userId', userCtrl.userByID)


export default router;
