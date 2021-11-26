const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = require("./app");

const port = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection succesful");
    app.listen(port, () => {
      console.log(`App running on ${port}`);
    });
  })
  .catch((err) => {
    // Hier moet een foutmelding komen dat de database even niet functioneert naar behoren via react
    console.log("Verbinding met de database is niet gelukt, probeer het later opnieuw");
    console.log(err.name, err.message, err.stack);
  });
