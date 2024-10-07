import jwt from 'jsonwebtoken';
require('dotenv').config();

const KEY = process.env.SECRET_KEY;

//JWT authentication 
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(403).json({ error: 'No token provided, access denied' });
    
    try {
        const decoded = jwt.verify(token, KEY);
        req.user = decoded; // Add the decoded user data to the request
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(401).json({ error: 'Invalid token, access denied' });
    }
};

export default authenticateJWT;