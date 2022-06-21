exports.validateInput = (schema, ctx)=>{
    const result =schema.validate(ctx.request.body);
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    } 
};


