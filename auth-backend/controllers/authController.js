const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/authModel");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    voornaam: req.body.voornaam,
    achternaam: req.body.achternaam,
    username: req.body.username,
    wachtwoord: req.body.wachtwoord,
  });

  res.status(200).json({
    status: "succes",
    newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, wachtwoord } = req.body;

  // check of email en wachtwoord bestaan
  if (!username || !wachtwoord) {
    return next(new AppError("Vul aub een email en wachtwoord in", 400));
  }

  // check of gebruiker bestaar en wachtwoord matched
  const user = await User.findOne({ username }).select("+wachtwoord");

  if (!user || !(await user.correctWachtwoord(wachtwoord, user.wachtwoord)))
    return next(new AppError("Onjuiste username of wachtwoord", 401));

  res.status(200).json({
    status: "succes",
    user,
  });
});
