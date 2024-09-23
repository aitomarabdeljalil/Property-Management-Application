import express from 'express';
import properties from './routes/properties.js';
const port = process.env.PORT || 5555;

const app = express();

//Routes
app.use('/api/properties', properties);

// app.get('/', (req, res) => {
//     res.send("hello");
// });

app.listen(port, () => {
    console.log(`listening in port ${port}`);
})