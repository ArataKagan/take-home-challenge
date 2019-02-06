const messageQuery = require("../db/queries.message.js");


module.exports = {
    showMessage(req, res, next){
        messageQuery.getAllMessages((err, messages) => {
            if(err){
                res.redirect(500, "/");
            } else {
                res.render("message", {messages})
            }
        })
    },

    createMessage(req, res, next){
        let newMessage = {
            message: req.body.message,
            name: req.body.name
        }
        console.log("inside of messageControllers");
    
        messageQuery.addMessage(newMessage, (err, message) => {
            if(err){
               req.flash("error", err);
            } else {
                console.log("message was successfully created as below:");
                console.log(message);
            }
        });

        

    }
}