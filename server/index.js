import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  
import userRoutes from './routes/user.route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// route
app.use('/api',userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
