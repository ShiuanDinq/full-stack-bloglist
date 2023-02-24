const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Harry Potter",
    author: "J.K.Rowlin",
    url: "www.harrypotter.com",
    likes: 123,
  },
  {
    title: "Lord of the Ring",
    author: "Tolkien",
    url: "www.lotr.com",
    likes: 555,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const initialUsers = [
  {
    name: "edmund hang",
    username: "ed hang",
    password: "stringlong",
  },
  {
    name: "raymond hang",
    username: "ray hang",
    password: "stringlong",
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
};
