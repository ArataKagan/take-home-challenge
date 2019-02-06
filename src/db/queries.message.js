const Message = require("./models").Message;

module.exports = {
    getAllMessages(callback){
        return Message.all()
        .then((messages) => {
            console.log("inside of getAllMessages from queries.messages");
            console.log("messages");
            callback(null, messages);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addMessage(newMessage, callback){
        return Message.create(newMessage)
        .then((message) => {
            console.log("new message created");
            callback(null, message);
        })
        .catch((err) => {
            callback(err);
        });
    }
}