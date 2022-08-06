const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "no blogs found" });
  }
  return res.status(200).json({ blogs });
};
const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existinguser;
  try {
      existinguser=await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if(!existinguser){
    return res.status(400).json({message:"unable to find this id"})
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session=await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existinguser.blogs.push(blog);
    await existinguser.save({session});
    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message:error });
  }
  return res.status(200).json({ blog });
};
const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
    const blogId=req.params.id;
    let blog;
  
  try {
    blog =await Blog.findByIdAndUpdate(blogId,{
        title,description
          })
  } catch (error) {
    return console.log(error);
  }
  if(!blog){
  return res.status(500).json({ message:"unable to update" });
  }
  return res.status(200).json({ blog });
};
const getById = async (req, res, next) => {
    const id=req.params.id;
    let blog;
  
    try {
      blog =await Blog.findById(id)
    } catch (error) {
      return console.log(error);
    }
    if(!blog){
        return res.status(500).json({ message:"unable to find" });
        }
  return res.status(200).json({ blog });

}
const deleteBlog = async (req, res, next) => {
    const id=req.params.id;
    let blog;
  
    try {
      blog =await Blog.findByIdAndRemove(id).populate('user');
      await blog.user.blogs.pull(blog);
      await blog.user.save();
    } catch (error) {
      return console.log(error);
    }
    if(!blog){
        return res.status(500).json({ message:"unable to delete" });
        }
  return res.status(200).json({ message:"blog deleted"});


}
const getByUserId = async (req, res, next) => {
  const id=req.params.id;
  let userBlogs;

  try {
    userBlogs =await User.findById(id).populate('blogs');
   
  } catch (error) {
    return console.log(error);
  }
  if(!userBlogs){
      return res.status(404).json({ message:"no blogs found" });
      }
return res.status(200).json({ user:userBlogs});


}
module.exports = { getAllBlogs, addBlog,updateBlog,getById,deleteBlog,getByUserId };
