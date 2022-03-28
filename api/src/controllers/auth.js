/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

const httpError = require('http-errors');
const ctrl = {};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('../models/user');
/* fonction login*/

ctrl.login = function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  var varTemp = '';
  /*variable est Isgood*/

  var isGood = false;

  // Validation des données reçues
  if (!email || !password) {
    return res.status(400).json({ message: 'Bad email or password' });
  }

  users.findOne({ email: email })
    .then(user => {
      if (user === null)// si user est null alors le compte n existe pas
      {
        return res.status(401).json({ message: 'This account does not exists !' });
      }

      varTemp = user.password;
      isGood = bcrypt.compareSync(password, varTemp);


      // Vérification du mot de passe
      
      if (isGood === true) {
        console.log('ok');
               // Génération du token
         const token = jwt.sign({
           id: user.id,
           nom: user.username,
          email: user.email,
        }, '48yhsbjjndjj', { expiresIn: 3600 });

        return res.json({ access_token: token });
    }
        return res.status(401).json({ message: 'Wrong password' });
    })
    .catch(next);
};

module.exports = ctrl;
