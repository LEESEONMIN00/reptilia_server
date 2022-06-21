const Post = require('../models/post');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const getPostById = async (ctx, next) =>{
    const {id} = ctx.params;

    if(!ObjectId.isValid(id)){
        ctx.status = 400;//Bad Request
        ctx.body={
            message:'Objectid is not available',
        }
        return;
    }
    try {
        const post = await Post.findById(id).exec();
        if(!post){
            ctx.status = 404;
            return ;
        }

        ctx.state.post = post;

        return next();

    } catch (error) {
        ctx.throw(500, error);
    }
};
module.exports = getPostById;
