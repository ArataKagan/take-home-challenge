require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..","views");
const bodyParser = require("body-parser");

module.exports = {
    init(app, express){
        app.set("views", viewsFolder);
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({ extended:false}));
        app.use(bodyParser.json());
    }
};