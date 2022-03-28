'use strict';
/* toutes les erreurs ce sont des methode avec la gestion de retour de la ba de données*/
const httpError = require('http-errors');
/* besoin du fichier operation dans le model*/
const Operation = require('../models/operation');
const ctrl = {};

/**
 * Display all operations.
 *
 * @param  {Request}  req // demande
 * @param  {Response} res // reponse
 * @param  {function} next // qu'est ce je fais apres la reponse
/* recupere la liste de tous les operations*/
ctrl.index = function index(req, res, next) {
  Operation
    .find() /* chercher dans la base*/
    .sort({createdAt: 'desc'}) /* trier du plus recents au plus anciens*/
    .then(function(operations) {
      return res.status(200).send(operations); /* retour du statut http 200 reussi en renvoyant la liste des operation*/
    })
    .catch(next)// sinon une erreur qui va dans le module http error
  ;
};

/**
 * Create a new operation.
 *
 * @param  {Request}  req // demande
 * @param  {Response} res //  requete
 * @param  {function} next // si la création est réussi la phase de questionnement de quoi faire : historique suivante
 */
ctrl.create = function create(req, res, next) {
  Operation
    .create(req.body) // objet en appelant les fonctions
    .then(function(operation) {
      return res.status(201).send(operation); // retour du statut http reussi en renvoyant la liste des nouveaux operations crées
    })
    .catch(next) /* http error*/
  ;
};

/**
 * Update an operation.
 *
 * @param  {Request}  req // requete
 * @param  {Response} res // reponse
 * @param  {function} next // la suite de ce qu'il faut faire
 */
ctrl.update = function update(req, res, next) {
  Operation
    .findOneAndUpdate({_id: req.params.id}, req.body, {new: true}) // trouver une mise à jour en fonction de la reponse de la requete
    .then(function(operation) {
      if (operation) {
        return res.status(200).send(operation);
      }

      throw httpError(404, 'Cannot find operation: ' + req.params.id);
    })
    .catch(next)
  ;
};

/**
 * Remove a given operation.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.destroy = function destroy(req, res, next) {
  Operation
    .findOneAndRemove({_id: req.params.id})
    .then(function(operation) {
      return res.status(200).send(operation);
    })
    .catch(next)
  ;
};

/**
 * Display a given operation.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.show = function show(req, res, next) {
  Operation
    .findById(req.params.id)
    .then(function(operation) {
      if (operation) {
        return res.status(200).send(operation);
      }

      throw next(httpError(404, 'Cannot find operation: ' + req.params.id));
    })
    .catch(next)
  ;
};

module.exports = ctrl;
