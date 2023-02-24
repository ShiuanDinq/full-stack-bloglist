const supertest = require("supertest");
const app = require("../app");
const { initialUsers, usersInDb } = require("../test/test_helper");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
  userObject = new User(initialUsers[1]);
  await userObject.save;
});

test("user with invalid username is not created", async () => {
  const newUser = {
    name: "edmund hang",
    username: "ed",
    password: "stringlong",
  };

  await api
    .post("./api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});
