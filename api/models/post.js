/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// create post schema
const PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            required: false,
        },
        popular: {
            type: String,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// create post model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
