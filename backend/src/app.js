const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());//permite la comunicacion entre servidores
app.use(express.json());//permite estring tipo json

//routes
//app.get('/api/v1/users',(req,res) => res.send('User routes'));
app.use('/api/v1/users', require('./routes/users'));
//app.get('/api/v1/notes',(req,res) => res.send('Notes routes'));
app.use('/api/v1/notes', require('./routes/notes'));


module.exports = app;