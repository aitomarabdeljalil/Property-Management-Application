import express from 'express';
import Property from '../models/Property.js';
const router = express.Router();

//endpoints 

//Get All Properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
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