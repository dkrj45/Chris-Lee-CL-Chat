const express = require('express');
const validateForm = require('../controllers/validateForm');
const router = express.Router();
const pool = require("../db");
const Yup = require("yup");
const bcrypt = require("bcrypt");

router.post("/login", validateForm({
    email: Yup.string().required("Email required").min(5, "Invalid Email"),
    password: Yup.string().required("Password required").min(1, "Invalid Password")
}), async (req, res) => {

    const potentialLogin = await pool.query(
        "SELECT id, username, passhash FROM users u WHERE u.username=$1",
        [req.body.email]
    )

    if(potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash)
        if(isSamePass){
            req.session.user = {
                username: req.body.email,
                id: potentialLogin.rows[0].id
            }
            res.json({
                loggedIn: true,
                username: req.body.email
            })
            console.log("login success")
        } else {
            res.json({
                loggedIn: false,
                status: "Wrong password"
            })
            console.log("not matching pw")
        }
    } else {
        res.json({
            loggedIn: false,
            status: "Wrong username and/or password"
        })
        console.log("Wrong email or password")
    }
})

router.post("/signup", validateForm({
    email: Yup.string().required("Email required").min(5, "Invalid Email"),
    password: Yup.string().required("Password required").min(1, "Invalid Password")
}), async (req, res) => {

    const existingUser = await pool.query("SELECT username from users WHERE username=$1", [req.body.email])
    if (existingUser.rowCount === 0) {
        //register
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const newUserQuery = await pool.query("INSERT INTO users(username, passhash) values ($1, $2) RETURNING username",
            [req.body.email, hashedPass]);
        req.session.user = {
            username: req.body.email,
            id: newUserQuery.rows[0].id
        }
        res.json({
            signedUp: true,
            username: req.body.email
        })
        console.log("Register successful")
    } else {
        console.log("This email is taken")
        res.json({
            signedUp: false,
            status: "Username taken"
        })
    }
})

module.exports = router;
