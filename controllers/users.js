const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
usersRouter.get("/", async (request, response) => {
  const foundUsers = await User.find();
  response.json(foundUsers);
});

usersRouter.post("/", async (request, response) => {
  const { password, ...userObject } = request.body;

  if (password.length < 3) {
    return response.status(400).json({
      error: "password not long enough",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User({
    ...userObject,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;
