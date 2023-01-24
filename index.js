import express from 'express'; 
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import informationRouter from './routes/information.js';
import adminRouter from './routes/admin.js'

dotenv.config();
await connectDB();
const PORT = process.env.PORT || 5000;

const app = new express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running ...');
});

app.use('/api/admin', adminRouter);

app.use('/api/information', informationRouter);

app.listen(
    PORT,
    console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);
