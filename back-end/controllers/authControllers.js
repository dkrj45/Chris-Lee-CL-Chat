const pool = require("../db");
const bcrypt = require("bcrypt");
const {v4: uuidv4} = require("uuid");

module.exports.handleLogin = (req, res) => {
    if(req.session.user && req.session.user.email){
        res.json({loggedIn: true, username: req.session.user.username, email: req.session.user.email})
    } else {
        res.json({loggedIn: false})
    }
}

module.exports.attemptLogin = async(req, res) => {
    const potentialLogin = await pool.query(
        "SELECT id, username, email, passhash, userid FROM users u WHERE u.email=$1",
        [req.body.email]
    )

    if(potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(req.body.password, potentialLogin.rows[0].passhash)
        if(isSamePass){
            req.session.user = {
                username: potentialLogin.rows[0].username,
                email: req.body.email,
                id: potentialLogin.rows[0].id,
                userid: potentialLogin.rows[0].userid
            }
            res.json({
                loggedIn: true,
                email: req.body.email,
                username: potentialLogin.rows[0].username
            })
        } else {
            res.json({
                loggedIn: false,
                status: "Wrong password"
            })
        }
    } else {
        res.json({
            loggedIn: false,
            status: "Wrong email and/or password"
        })
    }
}

module.exports.attemptRegister = async(req, res) => {
    // const usersTable = await pool.query("SELECT users");
    // console.log(usersTable)
    // if(!usersTable){
    //     await pool.query("CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR NOT NULL UNIQUE, email VARCHAR NOT NULL UNIQUE, passhash VARCHAR NOT NULL, userid VARCHAR NOT NULL UNIQUE)")
    // }
    const existingUser = await pool.query("SELECT email from users WHERE email=$1", [req.body.email])
    if (existingUser.rowCount === 0) {
        //register
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const newUserQuery = await pool.query("INSERT INTO users(username, email, passhash, userid) values ($1, $2, $3, $4) RETURNING id, username, email, userid",
            [req.body.name, req.body.email, hashedPass, uuidv4()]);
        req.session.user = {
            username: req.body.name,
            email: req.body.email,
            id: newUserQuery.rows[0].id,
            userid: newUserQuery.rows[0].userid
        }
        res.json({
            signedUp: true,
            username: req.body.name,
            email: req.body.email
        })
    } else {
        res.json({
            signedUp: false,
            status: "Email already taken"
        })
    }
}