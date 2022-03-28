/* eslint-disable space-infix-ops */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
'use strict';
/* toutes les erreurs ce sont des methode avec la gestion de retour de la ba de données*/
const httpError = require('http-errors');
/* besoin du fichier user dans le model*/
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const ctrl = {};

/**
 * Display all users.
 *
 * @param  {Request}  req // demande
 * @param  {Response} res // reponse
 * @param  {function} next // qu'est ce je fais apres la reponse
/* recupere la liste de tous les users*/
ctrl.index = function index(req, res, next) {
  User
    .find() /* chercher dans la base*/
    .sort({createdAt: 'desc'}) /* trier du plus recents au plus anciens*/
    .then(function(users) {
      return res.status(200).send(users); /* retour du statut http 200 reussi en renvoyant la liste des user*/
    })
    .catch(next)// sinon une erreur qui va dans le module http error
  ;
};

/**
 * Create a new user.
 *
 * @param  {Request}  req // demande
 * @param  {Response} res //  requete
 * @param  {function} next // si la création est réussi la phase de questionnement de quoi faire : historique suivante
 */
ctrl.create = function create(req, res, next) {

  var password = req.body.password;

  if (password)
  {
const salt = bcrypt.genSaltSync(10, 'a');
req.body.password=bcrypt.hashSync(password, salt);

  }

  User
    .create(req.body) // objet en appelant les fonctions
    .then(function(user) {
      return res.status(201).send(user); // retour du statut http reussi en renvoyant la liste des nouveaux users crées
    })
    .catch(next) /* http error*/
  ;
};

/**
 * Update an user.
 *
 * @param  {Request}  req // requete
 * @param  {Response} res // reponse
 * @param  {function} next // la suite de ce qu'il faut faire
 */
ctrl.update = function update(req, res, next) {
  User
    .findOneAndUpdate({_id: req.params.id}, req.body, {new: true}) // trouver une mise à jour en fonction de la reponse de la requete
    .then(function(user) {
      if (user) {
        return res.status(200).send(user);
      }

      throw httpError(404, 'Cannot find user: ' + req.params.id);
    })
    .catch(next)
  ;
};

/**
 * Remove a given user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.destroy = function destroy(req, res, next) {
  User
    .findOneAndRemove({_id: req.params.id})
    .then(function(user) {
      return res.status(200).send(user);
    })
    .catch(next)
  ;
};

/**
 * Display a given user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.show = function show(req, res, next) {
  User
    .findById(req.params.id)
    .then(function(user) {
      if (user) {
        return res.status(200).send(user);
      }

      throw next(httpError(404, 'Cannot find user: ' + req.params.id));
    })
    .catch(next)
  ;
};

/* surcharge de show*/

ctrl.show = function show(req, res, next) {
  User
    .find({_username: req.params.username})
    .then(function(user) {
      if (user) {
        return res.status(200).send(user);
      }

      throw next(httpError(404, 'Cannot find user: ' + req.params.id));
    })
    .catch(next)
  ;
};


module.exports = ctrl;
