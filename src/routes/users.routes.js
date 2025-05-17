const { Router } = require('express');
const {getAllUsers,getUser,createUser,deleteUser,updatingUser, loginUser} = require('../controllers/user.controller')

const router = Router();

router.get('/users', getAllUsers)

router.get('/users/:id', getUser)

router.post('/users', createUser)

router.delete('/users/:id', deleteUser)

router.put('/users/:id', updatingUser)

router.post('/users/login', loginUser)

module.exports = router;