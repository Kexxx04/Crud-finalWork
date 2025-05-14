const { Router } = require('express');

const router = Router();

router.get('/users', async (req, res) => {
   res.send('retireving a users list');
})

router.get('/users/10', (req, res) => {
    res.send('retrieving a single user');
})

router.post('/users', (req, res) => {
    res.send('creating a new user');
})

router.delete('/users', (req, res) => {
    res.send('deleting a user');
})

router.put('/users', (req, res) => {
    res.send('updating a user');
})

module.exports = router;