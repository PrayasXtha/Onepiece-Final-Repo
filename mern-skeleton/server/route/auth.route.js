import express from 'express'
import authCtrl from '../controller/auth.controller.js'
import userCtrl from '../controller/user.controller.js'

const router = express.Router()
router.route('/api/auth/signin') .post(authCtrl.signin)
router.route('/api/auth/signout').get(authCtrl.signout)
router.route('/api/auth/signup').post(userCtrl.create); 
export default router