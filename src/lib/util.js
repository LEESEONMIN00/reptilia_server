const sanitizeHtml = require("sanitize-html")

sanitizeHtml
exports.removeHTML = body =>{
    const filtered= sanitizeHtml(body,{
        allowerTags: [
            "h1",
            "h2",
            "b",
            "i",
            "u",
            "s",
            "p",
            "ul",
            "ol",
            "li",
            "a",
            "img",
            "blockquote"
        ],
        allowedAttributes:{
            a:["href","name","target"],
            img: ["src"],
            li:["class"],
        },
            allowedSchemas:["data","html"]
    });
    return filtered;    
}
