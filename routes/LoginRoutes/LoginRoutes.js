const { loginRoutes } = require("../../Controllers/LoginControllers/LoginControllers");



// ab ek express ka router banawo bhai



const router = require("express").Router();

router.post("/login", loginRoutes);


module.exports = router;
