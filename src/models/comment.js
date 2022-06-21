const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: String,
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    user:{
        _id: mongoose.Types.ObjectId,
        username: String,
    },
    post:{
        _id: mongoose.Types.ObjectId,
        title:String,
    }

});

const Comment = mongoose.model('Comment', CommentSchema,'comment');

module.exports = Comment;