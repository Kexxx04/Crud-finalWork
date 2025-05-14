const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/users.routes')

const app = express();

app.use(morgan('dev'))

app.use(userRoutes)

app.listen(4000)
console.log('Server on port 40000');