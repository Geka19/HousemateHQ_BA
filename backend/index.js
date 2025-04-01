// dependencies
const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5010;
const connectDB = require("./dbConnections");

const app = express();
app.use(express.json());
connectDB();

// Routes: Link each endpoint to its respective route
app.use("/api/login", require("./routes/loginRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/activities", require("./routes/acitivityRoutes"));

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));