import Blog from "../models/blogModel.js";


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    await Blog.create({
      title,
      content,
      author,
    });
    res.status(201).json({ msg: "Blog created successfully" });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    await blog.update({ title, content, author });
    res.json({ msg: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    await blog.destroy();
    res.json({ msg: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ msg: "Server error occurred" });
  }
};
