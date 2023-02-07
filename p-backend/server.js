import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import aboutRoutes from "./routes/about.js";
import skillsRoutes from './routes/skills.js';
import projectsRoutes from './routes/projects.js';
import certificatesRoutes from './routes/certificates.js'
import quoteRoutes from './routes/quote.js'
import errorHandler from "./middleware/errorMiddleware.js";
import userrouter from "./routes/user.js"
const app = express()
import dotenv from 'dotenv'
dotenv.config()
const PORT =  process.env.PORT || 5000

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const CONNECTION_URL = process.env.CONNECTION_URL
mongoose.set('strictQuery', true);
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } ).then(()=>{
    app.listen(PORT, () =>{
        console.log(`Running on port: ${PORT}`)
    })
}).catch((error) => console.log(error.message));

app.use('/about', aboutRoutes)

app.use('/skills', skillsRoutes)

app.use('/projects', projectsRoutes)
app.use('/certificates', certificatesRoutes)
app.use('/quote', quoteRoutes);
app.use("/users", userrouter);
app.use(errorHandler);