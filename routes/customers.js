const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Customer } = require('../models/customer')

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('No such customer');

    res.send(customer);
});

router.post('/', async (req, res) => {
    if (!req.body.name) return res.status(400).send('Bad request. Customer must have a name');

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    if (!req.body.name) return res.status(400).send('Bad request. Customer must have a name');

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, { new: true });

    if(!customer) return res.status(404).send('No such customer');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('No such customer');

    res.send(customer);
});

module.exports = router;
