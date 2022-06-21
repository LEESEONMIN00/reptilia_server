
const checkOwnPost = (ctx, next)=>{
    const{user, post} = ctx.state;
    console.log(post.user._id.toString(), user._id);
//자기것이 아닌상황 403;
if(post.user._id.toString() !== user._id){
    ctx.status = 403;
    return;
}
    return next();
};

module.exports = checkOwnPost;