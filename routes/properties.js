import express from 'express';
const router = express.Router();

//endpoints 
//PROPERTY
/*
    property; name, address, type, nbr of units, rental_cost
*/


let properties = [
    {id: 1, name: "one", address: "khouribga", type: "apartment", nbr_of_units: 12, rental_cost: 40000},
    {id: 2, name: "two", address: "khouribga", type: "house", nbr_of_units: 6, rental_cost: 30000},
    {id: 3, name: "three", address: "khouribga", type: "apartment", nbr_of_units: 3, rental_cost: 10000}
];



router.get('/', (req, res) => {
    res.json(properties);
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


router.post('/', (req, res) => {

});

export default router;