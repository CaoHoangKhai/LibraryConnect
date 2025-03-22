const express = require("express");
const cors = require("cors");
const authRouter = require("./app/routes/auth.route");
const adminRouter = require("./app/routes/admin.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
    res.send({ message: "Welcome to Library book application." });
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;