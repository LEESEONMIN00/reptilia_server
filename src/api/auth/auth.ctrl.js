const Joi = require('joi');
const User = require('../../models/user');


//회원등록
exports.register = async (ctx)=>{
    const schema = Joi.object().keys({
        username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
        password: Joi.string().required(),

    });
    const result = schema.validate(ctx.request.body);
    console.log(result);
  
    const{username, password} = ctx.request.body;
    console.log("111",ctx.request.body);
    try {
        const exists = await User.findByUsername(username);
        if(exists){
            ctx.status = 409;
            return;
        }
        const user = new User({
            username,
            description:'',
        });
        await user.setPassword(password);
        await user.save();

        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token',token,{
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
        });
        
        
    } catch (e) {
        ctx.throw(500,e);
        
    }
}
//로그인
exports.login = async (ctx)=>{
    const {username, password} = ctx.request.body;
   
    if(!username || !password){
        ctx.status = 401;
        return;
    }
    try {
        const user = await User.findByUsername(username);
        if(!user){
            ctx.status = 401;
            return;
        }
     he
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token',token,{
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    } catch (e) {
        ctx.throw(500,e);
    }
};
//로그인 확인
exports.check = async (ctx)=>{
    const {user} = ctx.state;
    if(!user){
        ctx.status = 401;
        return;
    }
    ctx.body = user;
};
//로그아웃
exports.logout = async (ctx) =>{
    ctx.cookies.set('access_token');
    ctx.status = 204;
};

// if (result.error) {
//     ctx.status = 400;
//     console.log(result.error.details[0].path["email"]);
//     switch (result.error.details[0].path[0]) {
//         case 'email':
//             ctx.body = {message:"E-mail형식 맞추셈"};
//             break;
    
//         default:
//             break;
//     }

//     ctx.body = result.error;
//     return;
// }