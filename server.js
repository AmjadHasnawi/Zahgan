var express = require('express');
var bodyParser = require('body-parser');
var Event = require('./database-mongo');
var connect = require('connect');
const path = require('path');
const mongoose = require('mongoose');

const User = require('./database-mongo/User');
const UserSession = require('./database-mongo/UserSession');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
var data=[{Name:'https://www.gettyimages.in/landing/assets/static_content/home/info-tabs3.jpg' ,HomeWork:'rami'}]

app.get('/items', function (req, res) {
 // console.log('hhhhh',data)
  students.save(data);
  students.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
      console.log('my get data' ,data)
    }
  });
  
});


//delete a event in  the database
app.delete('/create/:id', function (req, res, next) {
  Event.findByIdAndRemove({
    _id: req.params.id
  }).then(function (event) {
    res.send(event)

  })
});

//error handling middleware
app.use(function (err, req, res, next) {
  // console.log(err);
  res.status(400).send({
    error: err.message
  })
})

//deployment helper

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'react-client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'react-client/build', 'index.html'));
  });
}

app.listen(process.env.PORT || 4000, function () {
  console.log('listening on port 4000!');
});

// Signup User
app.post('/account/signup', (req, res, next) => {
  const { body } = req;
  const {
    firstName,
    lastName,
    password
  } = body;
  let {
    email
  } = body;

  if (!firstName) {
    return res.send({
      success: false,
      message: 'Error: First name cannot be blank.'
    });
  }
  if (!lastName) {
    return res.send({
      success: false,
      message: 'Error: Last name cannot be blank.'
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }

  console.log('here')

  email = email.toLowerCase();

  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find({
    email: email,
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error.'
      })
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exists.'
      });
    }

    // Save the new user
    const newUser = new User();

    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error.'
        });
      }
      return res.send({
        success: true,
        message: 'Signed up'
      });
    });
  });

});