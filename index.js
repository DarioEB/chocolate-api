const express = require('express');
const connection = require('./config/db');
const cors = require('cors');

// Server
const app = express();

// Database
connection();

// Cors Enabled
app.use(cors({credentials: true, origin: true}));
app.options("*", cors());

// Port
const port = process.env.PORT || 4000;

// Bodyparser
app.use(express.json({extended: true}));

// Rutas carpera pública
app.use(express.static('uploads'));

app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/branchs', require('./routes/branchs'));
app.use('/api/contact', require('./routes/contact'));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está funcionando en el puerto: ${port}`);
})