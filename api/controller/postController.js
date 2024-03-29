/* eslint-disable prettier/prettier */
const Post = require('../models/post');

// create post
const createPost = async (req, res) => {
    try {
        const newPost = await new Post(req.body);
        // console.log(req.body.photo);
        newPost.save();

        res.status(200).json({
            message: newPost,
        });
    } catch (err) {
        res.status(500).json({
            error: 'Could not create post',
        });
    }
};

// update post
const updPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true },
                );

                res.status(200).json({
                    message: 'post updated successfully',
                });
            } catch (err) {
                res.status(500).json({
                    error: err.message,
                });
            }
        } else {
            res.status(404).json({
                error: 'you can only update your post!',
            });
        }
    } catch (error) {
        res.status(404).json({
            error: 'you can only update your post!',
        });
    }
};

// delete post
const delPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id);

                res.status(200).json({
                    message: 'Post has been deleted',
                });
            } catch (err) {
                res.status(500).json({
                    error: err.message,
                });
            }
        } else {
            res.status(404).json({
                error: 'You can only delete your post!',
            });
        }
    } catch (error) {
        res.status(404).json({
            error: 'You can only delete your post!',
        });
    }
};

// get a post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json({
            message: post,
        });
    } catch (err) {
        res.status(500).json({
            error: 'Can not find user!!',
        });
    }
};

// get all post
const getAllPost = async (req, res) => {
    const username = req.query.user;
    const category = req.query.cat;
    const { popular } = req.query;
    const { search } = req.query;

    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (category) {
            posts = await Post.find({
                categories: {
                    $in: [category],
                },
            });
        } else if (popular) {
            posts = await Post.find({ popular });
        } else if (search) {
            posts = await Post.aggregate([{ $match: { title: search } }]);
        } else {
            posts = await Post.find().sort({ createdAt: -1 });
        }

        res.status(200).json({
            message: posts,
        });
    } catch (err) {
        res.status(500).json({
            error: 'Can not find post!',
        });
    }
};

// get all posts of a user
const allPostOfUser = async (req, res) => {
    const username = req.query.user;
    try {
        const posts = await Post.find({ username });

        res.status(200).json({
            message: posts,
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was no post!',
        });
    }
};

// get all posts of a user
// const popularPost = async (req, res) => {
//     const { popular } = req.query;
//     try {
//         const posts = await Post.find({ popular });

//         res.status(200).json({
//             message: posts,
//         });
//     } catch (err) {
//         res.status(500).json({
//             error: 'There was no post!',
//         });
//     }
// };

module.exports = {
    createPost,
    updPost,
    delPost,
    getPost,
    getAllPost,
    allPostOfUser,
};
