const express = require('express');
const { signUp, update, getAllUser} = require('../controllers/userController');


const router = express.Router();

router.post('/signUp', signUp)
router.patch('/update/:id', update)
router.route('/').get(getAllUser);

module.exports=router
