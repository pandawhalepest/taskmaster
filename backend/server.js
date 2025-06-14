import express from 'express';
import connectDB from './config/database.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' })

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware for Json parsing
app.use(express.json());

app.get('/', (req, res) => {
    console,log('we are connected at the root endpoint');
  res.send('API is running...');
});

app.post('/api/signup', (req,res) => {
     
}) 






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));