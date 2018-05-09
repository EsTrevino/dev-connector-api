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
  Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']).then(profile => {
    if (!profile) {
      return res.status(404).json({message: "No profile for this user"});
    }
    res.json(profile);
  }).catch(err => res.status(404).json(err));
});

//@route: GET 'api/profile/handle/:handle'
//@desc:  get user profile by handle
//@access: public route
router.get('/handle/:handle', (req, res) => {
  Profile.findOne({handle: req.params.handle}).populate('user', ['name', 'avatar']).then(profile => {
    if (!profile) {
      res.status(404).json({message: 'no profile found for this user'})
    }
    res.json(profile)
  }).catch(err => res.status(404).json(err));
});

//@route: GET 'api/profile/user/:user_id'
//@desc:  get profile by user id
//@access: public route
router.get('/user/:user_id', (req, res) => {
  Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']).then(profile => {
    if (!profile) {
      res.status(404).json({message: 'no profile found for this user'})
    }
    res.json(profile)
  }).catch(err => res.status(404).json(err));
});

//@route: GET 'api/profile/all'
//@desc:  get all profiles
//@access: public route
router.get('/all', (req, res) => {
  Profile.find().populate('user', ['name', 'avatar']).then(profiles => {
    if (!profiles) {
      res.status(404).json({message: 'There are no profiles for this user'})
    }
    res.json(profiles);
  }).catch(err => res.status(404).json(err));
})


//@route:  POST 'api/profile/'
//@desc:  Create or Edit user profile
//@access: private route
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle)
    profileFields.handle = req.body.handle;
  if (req.body.company)
    profileFields.company = req.body.company;
  if (req.body.website)
    profileFields.website = req.body.website;
  if (req.body.location)
    profileFields.location = req.body.location;
  if (req.body.bio)
    profileFields.bio = req.body.bio;
  if (req.body.status)
    profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  //skills split into an array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',').map(skill => {
      return skill.trim();
    });

  }

  //social
  profileFields.social = {};
  if (req.body.youtube)
    profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter)
    profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook)
    profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram)
    profileFields.social.instagram = req.body.instagram;

  Profile.findOne({user: req.user.id}).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate({
        user: req.user.id
      }, {
        $set: profileFields
      }, {new: true}).then(profile => res.json(profile));
    } else {
      Profile.findOne({handle: profileFields.handle}).then(profile => {
        if (profile) {
          res.status(400).json({error: 'that handle already exists'});
        }
        new Profile(profileFields).save().then(profile => res.json(profile));
      })
    }
  })
})

//@route:  POST 'api/profile/experience'
//@desc: add experience to profile
//@access: private route
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }
    profile.experience.unshift(newExp);
    profile.save().then(profile => res.json(profile));
  })
})

//@route:  POST 'api/profile/education'
//@desc: add education to profile
//@access: private route
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }
    profile.education.unshift(newEdu);
    profile.save().then(profile => res.json(profile));
  })
})
//@route:  DELETE 'api/profile/experience/:exp_id'
//@desc:   delete experience from profile
//@access: private route
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    profile.save().then(profile => res.json(profile));
  }).catch(err => res.status(404).json(err));
})

//@route:  DELETE 'api/profile/education/:edu_id'
//@desc:   delete education from profile
//@access: private route
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    profile.save().then(profile => res.json(profile));
  }).catch(err => res.status(404).json(err));
})

//@route:  DELETE 'api/profile/
//@desc:   delete user and profile
//@access: private route
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
  Profile.findOneAndRemove({user: req.user.id}).then(() =>{
    User.findOneAndRemove({_id: req.user.id}).then(() => res.json({success: true}));
  })
})

module.exports = router;
