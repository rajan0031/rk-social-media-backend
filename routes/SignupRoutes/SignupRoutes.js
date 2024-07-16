

const registerRoute =require("../../Controllers/SignupControllers/SignupControllers")
// ab ek express ka router banawo bhai



const router = require("express").Router();

router.post("/register", registerRoute);


module.exports = router;
