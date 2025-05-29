const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config()
const connectDB = require('./connect/database');
const port = process.env.PORT || 8000;
const app = express();


connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

    

app.listen(port, () => console.log(`Server listening on ${port}`));