const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorMiddleware");
const mongoose = require("mongoose");
const connectDB = require('./config/db')

const port = process.env.PORT || 5000;
require("./config/db");

connectDB()

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is starting on port ${port}`));
