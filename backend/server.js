const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDB = require('./connect/database');
const port = process.env.PORT || 8000;
const Cors = require('cors');

connectDB();
const app = express();

app.use(Cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));




app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));