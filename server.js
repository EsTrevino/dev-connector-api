const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/usersRoutes');
const profile = require('./routes/api/profileRoutes');
const posts = require('./routes/api/postRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//passport
app.use(passport.initialize());
require('./config/passport')(passport);

mongoose.connect(db, () =>{
  console.log('MongoDB connected');
  err => console.log(err);
});



app.use('/api/users/', users);
app.use('/api/profile/', profile);
app.use('/api/posts/', posts);

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`server running on ${port}`));
