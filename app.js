import express from 'express';
import sequelize from './db.js';
import properties from './routes/properties.js';
import tenants from './routes/tenants.js';
import payments from './routes/payments.js';
import auth from './routes/auth.js';
import authenticateJWT from './middleware/auth.js';

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Auth routes
app.use('/api/auth', auth);

//Routes
app.use('/api/properties', authenticateJWT, properties);
app.use('/api/tenants', authenticateJWT, tenants);
app.use('/api/payments', authenticateJWT, payments);


module.exports = app;