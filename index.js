const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/myconfigs/db');    


const cors = require('cors');



dotenv.config();
const app = express();

// Database connection
connectDB();


// Allow requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  }));
// Middleware
app.use(express.json());
console.log("i am her eno")

app.use(express.urlencoded({ extended: true }));
console.log("i am her two")




console.log("i am her jwlnce")


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));