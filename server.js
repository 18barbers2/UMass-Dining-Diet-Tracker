'use strict';

const express = require('express');
const port = 8080;
const app = express();

app.use(express.json());

app.get('/login/:email', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const username = req.params['email'];
    console.log(username);
    const name = "Bob";
    const json = {"name": name, "username": username};
    res.json(json);
});

// register account
app.get('/user/register', (req,res) => {
    console.log(`body = ${JSON.stringify(req.body)}\n`);
    res.send('BODY');
});

app.get('/', (req,res) => {
    res.send("Register Account");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});