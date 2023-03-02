const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { jwtSign, jwtVerify, getJwt } = require("./jwt/jwtAuth");

module.exports.handleLogin = (req, res) => {
  const token = getJwt(req);

  //   console.log(token);

  if (!token) {
    res.json({ loggedIn: false });
    return;
  }

  jwtVerify(token, process.env.JWT_SECRET)
    .then((decoded) => {
      res.json({ loggedIn: true, username: decoded.username, token });
    })
    .catch((err) => {
      //   console.log(err);
      res.json({ loggedIn: false });
    });
};

module.exports.attemptLogin = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT id, username, email, passhash, userid FROM users u WHERE u.email=$1",
    [req.body.email]
  );

  if (potentialLogin.rowCount > 0) {
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passhash
    );
    if (isSamePass) {
      jwtSign(
        {
          username: potentialLogin.rows[0].username,
          email: req.body.email,
          id: potentialLogin.rows[0].id,
          userid: potentialLogin.rows[0].userid,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      )
        .then((token) =>
          res.json({
            loggedIn: true,
            username: potentialLogin.rows[0].username,
            token,
          })
        )
        .catch((err) => {
          console.log(err);
          res.json({
            loggedIn: false,
            status: "Something went wrong. Please try again later.",
          });
        });
    } else {
      res.json({
        loggedIn: false,
        status: "Wrong password",
      });
    }
  } else {
    res.json({
      loggedIn: false,
      status: "Wrong email and/or password",
    });
  }
};

module.exports.attemptRegister = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT email from users WHERE email=$1",
    [req.body.email]
  );
  if (existingUser.rowCount === 0) {
    //register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username, email, passhash, userid) values ($1, $2, $3, $4) RETURNING id, username, email, userid",
      [req.body.name, req.body.email, hashedPass, uuidv4()]
    );
    jwtSign(
      {
        username: req.body.name,
        email: req.body.email,
        id: newUserQuery.rows[0].id,
        userid: newUserQuery.rows[0].userid,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )
      .then((token) =>
        res.json({ loggedIn: true, username: req.body.name, token })
      )
      .catch((err) => {
        // console.log(err);
        res.json({
          loggedIn: false,
          status: "Something went wrong. Please try again later.",
        });
      });
  } else {
    res.json({
      loggedIn: false,
      status: "Email already taken",
    });
  }
};
