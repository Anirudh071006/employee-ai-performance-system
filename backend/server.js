const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});