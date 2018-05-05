const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


//@route:  GET 'api/profile/test'
//@desc: 'tests post route'
//@access: public route
router.get('/test', (req, res) => {
  res.json({message: "Profile route works"});
});

//@route:  GET api/profile/
//@desc:   Get current users profile
//@access: private route
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    if (!profile) {
      return res.status(404).json({message: "No profile for this user"});
    }
    res.json(profile);
  }).catch(err => res.status(404).json(err));
});

//@route:  POST 'api/profile/'
//@desc:  Create or Edit user profile
//@access: private route
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.status) profileFields.status = req.body.status;
  if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  //skills split into an array
  if(typeof req.body.skills !== 'undefined'){
    profileFields.skills = req.body.skills.split(',');
  }

  //social
  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({user: req.user.id})
    .then(profile =>{
      if(profile){
        Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        ).then(profile => res.json(profile));
      }else{
        Profile.findOne({handle: profileFields.handle}).then(profile =>{
          if(profile){
            res.status(400).json({error: 'that handle already exists'});
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        })
      }
    })

})

module.exports = router;
