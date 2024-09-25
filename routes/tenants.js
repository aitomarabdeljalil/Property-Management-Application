import express from 'express';
import Tenant from '../models/Tenant.js';
const router = express.Router();

//Endpoints 

//Add a tenant
router.post('/', async (req, res) => {    
    try{
        const newTenant = await Tenant.create(req.body);
        res.status(201).json(newTenant);
    } catch (error) {
        return res.status(400).json({ error: 'Failed to add tenant'});
    }
});

//Update a tenant
router.put('/:id', async (req, res) => {
    const tid = parseInt(req.params.id);
    const updatedTenant = req.body;
    try{
        await Tenant.update(
            { 
                name: updatedTenant.name,
                contact: updatedTenant.contact,
                sectionOccupied: updatedTenant.sectionOccupied,
                propertyId: updatedTenant.propertyId,
            },
            {
                where: {
                id: tid,
                },
            },
        );
        res.status(201).json(updatedTenant);
    } catch (error) {
        return res.status(400).json({ error: 'Failed to modify tenant or the tenant doesn\'t exist'});
    }
});

//Delete a tenant
router.delete('/:id', async (req, res) => {
    const tid = parseInt(req.params.id);
    try{
        await Tenant.destroy(
            {
                where: { id: tid, },
            },
        );
        res.status(201).json({});
    } catch (error) {
        return res.status(400).json({ error: 'Failed to delete tenant or the tenant doesn\'t exist'});
    }
});

export default router;