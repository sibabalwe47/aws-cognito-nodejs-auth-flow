const express = require("express");
const authController = require("../controllers/AuthController");
const router = express();

/*
    Endpoint:       /auth/sign-up
    Method:         POST  
    Description:    Allows users to to sign up 
 */

router.post("/sign-up", authController.signUp);

/*
    Endpoint:       /auth/login
    Method:         POST  
    Description:    Allows users to login 
 */
router.post("/login", authController.signIn);

/*
    Endpoint:       /auth/confirm
    Method:         POST  
    Description:    Allows users to login 
 */
router.post("/confirm", authController.confirmEmail);

module.exports = router;
