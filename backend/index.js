const express = require("express");
const cors = require("cors");           
const dotenv = require("dotenv").config();
const connectDB = require("./dbConnections");

const app = express();

// CORS needs to be BEFORE express.json() ideally
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use('/uploads', express.static('uploads'));


app.use(express.json());  // Body parser
connectDB();


// Routes
app.use("/api/auth", require("./routes/loginRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/activities", require("./routes/acitivityRoutes"));

// Start server
const PORT = process.env.PORT || 5012;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
