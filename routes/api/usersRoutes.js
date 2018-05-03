const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');


//@route:  GET 'api/users/test'
//@desc: 'tests post route'
//@access: public route
router.get('/test', (req, res) =>{
  res.json({message: "User route works"});
});

//@route:  GET 'api/users/register'
//@desc: register a user
//@access: public route
router.post('/register', (req, res) =>{
  //setup avatar variable
  const avatar = gravatar.url(req.body.email, {
    s: '200', //size
    r: 'pg', // rating
    d: 'mm' //default
  });
  //1) find if email exists in our database
  User.findOne({email: req.body.email})
    .then(user =>{
      if(user){
        return res.status(400).json({email: 'Email already exists'})
      }else{
        //1) set up newUser object
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        });
  //2) once completed, hash password for security and save user
  bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(newUser.password, salt, (err, hash) =>{
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
          })
        })
      }
    })
})


module.exports = router;
