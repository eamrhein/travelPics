const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const panels = require('./routes/api/panels');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();

// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log(err));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', err => {
  console.log('Mongoose Connection Error : ' + err);
});

if (process.env.NODE_ENV === 'production') {


  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
  });
}

app.use(passport.initialize());
require('./config/passport')(passport);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/panels', panels);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
