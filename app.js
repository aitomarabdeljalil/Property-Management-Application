import express from 'express';
import sequelize from './db.js';
import properties from './routes/properties.js';
import tenants from './routes/tenants.js';

const app = express();
const PORT = process.env.PORT || 5555;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/properties', properties);
app.use('/api/tenants', tenants);

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