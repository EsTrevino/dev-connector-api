const express = require('express');
const router = express.Router();

// @route GET 'api/users/test'
//@desc 'tests post route'
//@access: public route
router.get('/test', (req, res) =>{
  res.json({message: "User route works"});
});

module.exports = router;
