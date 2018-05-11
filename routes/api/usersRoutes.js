const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const keys = require("../../config/keys");

//@route:  GET 'api/users/test'
//@desc: 'tests post route'
//@access: public route
router.get("/test", (req, res) => {
  res.json({ message: "User route works" });
});

//@route:  POST 'api/users/register'
//@desc: register a user
//@access: public route
router.post("/register", (req, res) => {
  //setup avatar variable
  const avatar = gravatar.url(req.body.email, {
    s: "200", //size
    r: "pg", // rating
    d: "mm" //default
  });
  //1) find if email exists in our database
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //1) set up newUser object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      //2) once completed, hash password for security and save user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route:  POST 'api/users/login'
//@desc: login user, return jwt token
//@access: public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { secretOrKey } = keys;
  //find user by email
  User.findOne({ email: email }).then(user => {
    //check email
    if (!user) {
      return res.status(404).json({ message: "Invalid Email" });
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched, set payload variable
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        //sign token
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ message: "Incorrect Password" });
      }
    });
  });
});

//@route:  GET 'api/users/current'
//@desc: Returns current user
//@access: private route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
