const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
console.log("before open showMessage");

router.get("/", messageController.showMessage);
router.post("/create", messageController.createMessage);


module.exports = router;