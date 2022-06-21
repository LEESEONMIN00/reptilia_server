const User = require("../../models/user");

exports.getUserInfo = async(ctx)=>{
    const {id} = ctx.params;
    try{
        const user = await User.findById(id).exec();
        if(!user){
            ctx.status = 404;
            ctx.body={message:
                "안됨"
            };
            return;
        }
        ctx.body = user;
    }catch{
        console.log(error);
    }

}