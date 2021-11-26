const express = require("express");

const app = express();

const userRoutes = require("./routes/authRoutes");
const AppError = require("./utils/appError");

app.use((req, res, next) => {
  // Je hebt 3 headers nodig 1e is hoe het heet 2e argument is vanwaar ze je api mogen gebruiken. ipv * zet je dan localhost:3000
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // Welke methods sta je toe.

  next(); // Laat het doorgaan naar de volgende middleware.
});

app.use(express.json({ limit: "20kb" }));

// Routes
app.use("/auth", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Kan ${req.originalUrl} niet vinden op deze site!`, 404));
});

module.exports = app;
