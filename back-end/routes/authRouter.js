const express = require('express');
const validateForm = require('../controllers/validateForm');
const router = express.Router();
const Yup = require("yup");
const { handleLogin, attemptLogin, attemptRegister } = require('../controllers/authControllers');
const { rateLimiter } = require('../controllers/rateLimiter');

router.route("/login")
.get(handleLogin)
.post(validateForm({
    email: Yup.string().required("Email required").min(5, "Invalid Email"),
    password: Yup.string().required("Password required").min(1, "Invalid Password")
}),rateLimiter,attemptLogin)

router.post("/signup", validateForm({
    email: Yup.string().required("Email required").min(5, "Invalid Email"),
    password: Yup.string().required("Password required").min(1, "Invalid Password")
}),rateLimiter,attemptRegister)

module.exports = router;
