import express from 'express';
import Payment from '../models/Payment.js';
import Tenant from '../models/Tenant.js';
const router = express.Router();

//endpoints

//Add a payment for a tenant
router.post('/:tenantId/paymants', async (req, res) => {
    const tId = parseInt(req.params.tenantId);
    try{
        const tenant = await Tenant.findByPk(tId);
        if (tenant) {
            const payment = await Payment.create(req.body);
            res.status(2001).json(payment);
        } else {
            res.status(400).json({ error: 'The tenant doesn\'t exist'});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Failed to make the payment'});
    }
});

//modify a payment
router.put('/:tenantId/paymants', async (req, res) => {
    const tId = parseInt(req.params.tenantId);
    const updatedPayment = req.body;
    try{
        const tenant = await Tenant.findByPk(tId);
        if (tenant) {
            await Payment.update(
                { 
                    amount: updatedPayment.amount,
                    datePaid: updatedPayment.datePaid,
                    isSettled: updatedPayment.isSettled,
                },
                {
                    where: {
                        tenantId: tId,
                    },
                },
            );
            res.status(201).json(updatedPayment);
        } else {
            res.status(400).json({ error: 'The tenant doesn\'t exist'});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Failed to make the payment'});
    }
});


export default router;