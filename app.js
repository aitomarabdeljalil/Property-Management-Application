import express from 'express';
import sequelize from './db.js';
import properties from './routes/properties.js';
import tenants from './routes/tenants.js';
import payments from './routes/payments.js';
import auth from './routes/auth.js';
import authenticateJWT from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5555;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Auth routes
app.use('/api/users', auth);

//Routes
app.use('/api/properties', authenticateJWT, properties);
app.use('/api/tenants', authenticateJWT, tenants);
app.use('/api/tenants', authenticateJWT, payments);

// Sync database and start server
sequelize.sync().then(() => {
        console.log('Database synchronized');
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    }).catch((err) => { 
        console.error('Failed to sync database:', err); 
    }
);