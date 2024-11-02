import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  
dotenv.config();
import cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(express.json());
app.use(cookieParser())
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// user route
import userRoutes from './routes/user.route.js'
app.use('/api/user',userRoutes);

//auth route
import AuthRooute from './routes/auth.route.js';
app.use('/api/auth', AuthRooute)



//middleware for error handle
app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server Error';
  res.status(statusCode).json({
    success : false,
    statusCode,
    message
  })
})