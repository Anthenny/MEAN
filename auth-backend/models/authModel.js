const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  voornaam: {
    type: String,
    required: [true, "Een gebruiker moet een voornaam hebben"],
    lowercase: true,
  },
  achternaam: {
    type: String,
    required: [true, "Een gebruiker moet een achternaam hebben"],
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Een gebruiker moet een username hebben"],
    lowercase: true,
  },
  wachtwoord: {
    type: String,
    required: [true, "Een gebruiker moet een wachtwoord hebben"],
  },
});

// Doc middleware
userSchema.pre("save", async function (next) {
  this.wachtwoord = await bcrypt.hash(this.wachtwoord, 12);
});

// Methods
userSchema.methods.correctWachtwoord = async function (ingevuldeWachtwoord, gebruikerWachtwoord) {
  return await bcrypt.compare(ingevuldeWachtwoord, gebruikerWachtwoord);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
