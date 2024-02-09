const express = require('express');
const app = express();

const PORT = process.env.PORT || 3333;

const connection = require('./config/connection')

app.get('/api/users', async(req, res) => {
    const db = await connection;
    const users = await db.collection('users').find().toArray();
    res.json(users);
})

app.listen(PORT, () => {
    console.log('server started on port', PORT)
})