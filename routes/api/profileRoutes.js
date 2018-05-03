const express = require('express');
const router = express.Router();

//@route:  GET 'api/profile/test'
//@desc: 'tests post route'
//@access: public route
router.get('/test', (req, res) =>{
  res.json({message: "Profile route works"});
});

module.exports = router;
