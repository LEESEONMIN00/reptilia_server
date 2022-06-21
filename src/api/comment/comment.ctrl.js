const Comment = require("../../models/comment");

const Joi = require("joi")
const {validateInput} = require("../../lib/validation");
const { removeHTML } = require("../../lib/util");


exports.readAllComment = async (ctx) =>{

    try{
        const comment = await Comment.find().lean().exec();
        
        ctx.body = comment;
    }catch(error){
        ctx.throw(500, error);
    }
}


exports.writeComment = async (ctx) =>{

    const schema = Joi.object().keys({
        content: Joi.string().required(),
    });

    validateInput(schema,ctx);

    const {title,content} = ctx.request.body;

    const comment = new Comment({
        title,
        content,
        user: ctx.state.user,
    });

    try{
        await comment.save();
        ctx.body= comment;
    }catch(error){
        ctx.throw(500,error);

    }
}