const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/usersRoutes');
const profile = require('./routes/api/profileRoutes');
const posts = require('./routes/api/postRoutes');

mongoose.connect(db, () =>{
  console.log('MongoDB connected');
  err => console.log(err);
});

app.get('/', (req, res) =>{
  res.send('setup');
});

app.use('/api/users/', users);
app.use('/api/profile/', profile);
app.use('/api/posts/', posts);

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`server running on ${port}`));
