import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from "bcrypt";
require('dotenv').config();

const router = express.Router();
const KEY = process.env.SECRET_KEY;

//endpoints

//Register a new user
router.post('/register', async (req, res) =>{
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', user: { username: newUser.username } });
    } catch (error) {
        res.status(500).json({error: 'Failed to register user'});
    }
});

//Login and get a JWT token
router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);
            if(!match)
                return res.status(401).json({ error: 'Invalid password' });

            

            const token = jwt.sign({ username: user.username }, KEY, { expiresIn: '1h' });
            res.json({ token });
        }
        else
            res.status(500).json({error: 'Failed to login'});
    } catch (error) {
        res.status(500).json({error: 'Failed to login'});
    }
});

export default router;