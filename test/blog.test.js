const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");

const api = supertest(app);
const { initialBlogs, blogsInDb } = require("../test/test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("Harry Potter");
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Eregon",
    author: "Doraemon",
    url: "www.eregon.com",
    likes: 555,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogsAtEnd = await blogsInDb();
  const titles = response.body.map((blog) => blog.title);

  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain("Eregon");
});

test("blog id is unique", async () => {
  const blogs = await blogsInDb();
  blogs.forEach((blog) => expect(blog._id).toBeDefined());
});

test("blog likes default to 0 if not proviede", async () => {
  const newBlog = {
    title: "Eregon 2",
    author: "Doraemon",
    url: "www.eregon.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  expect(response.body.likes).toBe(0);
});

test("post blog fails if title is missing", async () => {
  const newBlog = {
    author: "Doraemon",
    url: "www.eregon.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});


afterAll(async () => {
  await mongoose.connection.close();
});
