import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  
dotenv.config();
import cors from 'cors'
import cookieParser from 'cookie-parser'

import path from 'path'
const __dirname = path.resolve()

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(express.json());
app.use(cookieParser())
const corsOrigin ={
  origin:'http://localhost:5173', 
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOrigin))
app.use('/public', express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// user route
import userRoutes from './routes/user.route.js'
app.use('/api/user',userRoutes);

//auth route
import AuthRooute from './routes/auth.route.js';
app.use('/api/auth', AuthRooute)

//post router 
import PostRouter from './routes/post.route.js';
app.use('/api/post', PostRouter)

//coment router
import Commentrouter from './routes/comment.route.js';
app.use('/api/comment', Commentrouter)

// app.use(express.static(path.json(__dirname, '/client/dist')))
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res)=>{
  res.sendFile(path.json(__dirname, 'client', 'dist', 'index.html'))
})



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