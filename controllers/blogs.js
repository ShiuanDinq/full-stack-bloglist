const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const foundBlog = await Blog.find({});
  response.json(foundBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id);
  response.json(foundBlog);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
