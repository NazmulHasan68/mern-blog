import Post from "../Models/postMode.js";
import { errorHandler } from "../utils/Error.js";

export const createController = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to crate a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please priovide all required fields"));
  }

  const slug = req.body.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    next(error); // Pass the error to your error handler
  }
};

export const getPostController = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDireaction = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(
        req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        })
    }).sort({ updateAt: sortDireaction })
    .skip(startIndex)
    .limit(limit)

    const totalPosts = await Post.countDocuments()


    const now = new Date()
    const oneMonthAgo =- new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    )
    const lastMonthPost = await Post.countDocuments({
      createdAt : {
        $gte : oneMonthAgo
      }
    })

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPost
    })
  } catch (error) {
    next(error);
  }
};
