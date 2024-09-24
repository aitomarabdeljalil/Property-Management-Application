import express from 'express';
import Property from '../models/Property';
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


router.get('/', async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

//get single property
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

//Create a Property
router.post('/', async (req, res) => {
    const newProperty = {
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        numberOfUnits: req.body.numberOfUnits,
        rentalCost: req.body.rentalCost
    };

    try{
        await Property.create(newProperty);
        res.status(201).json(properties);
    } catch (error) {
        return res.status(400).json({ error: 'Failed to add property'});
    }

    // const values = Object.values(newProperty);
    // for (let value of values) {
    //     if (value.length < 1)
    //         return res.status(400).json(properties);
    // }
    // properties.push(newProperty);
    // res.status(201).json(properties);

});

export default router;