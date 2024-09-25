import express from 'express';
import Property from '../models/Property.js';
const router = express.Router();

//endpoints 
//PROPERTY
/*
    property; name, address, type, numberOfUnits, rentalCost
*/


// let properties = [
//     {id: 1, name: "one", address: "khouribga", type: "apartment", numberOfUnits: 12, rentalCost: 40000},
//     {id: 2, name: "two", address: "Marrakech", type: "house", numberOfUnits: 6, rentalCost: 30000},
//     {id: 3, name: "three", address: "khouribga", type: "apartment", numberOfUnits: 3, rentalCost: 10000}
// ];

//Get All Properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

//Get Single Property
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let property = null;
    if (!isNaN(id) && id > 0)
        property = properties.find((property) => property.id === id) || null;
    if (property !== null) {
        res.status(200).json(property);
    }
    else {
        res.status(404).json({ message: "Not found"});
    }
});

//Add a Property
router.post('/', async (req, res) => {    
    try{
        const newProperty = await Property.create(req.body);
        res.status(201).json(newProperty);
    } catch (error) {
        return res.status(400).json({ error: 'Failed to add property'});
    }
});

export default router;