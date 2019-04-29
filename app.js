/* 
    Simple web API to google cloud.
    The api have two methods
    api/getcustomers
    lists all existing customers
    api/getcustomer/#id
    returns specific customer

    dependencies
    -express
    -./datastore
*/
'use strict';
const express = require('express');
const datastore = require('./datastore');
const port = process.env.PORT || 8080;

var app = express();
app.use(express.json());

app.get('/api/getcustomers', async (req, res) => {
    const customers = await datastore.getCustomers();
    res.status(200).send(JSON.stringify(customers));
});

app.get('/api/getcustomer/:id', async (req, res) => {
    var id = req.params.id;
    var customer = await datastore.getCustomer(id);
    if(!customer){ res.status(404).send(`Customer with id ${id} was not found.`);}
    res.status(200).send(JSON.stringify(customer));
});

const server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});



