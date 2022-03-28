'use strict';
/* toutes les erreurs ce sont des methodes avec la gestion de retour de la base de données*/
const httpError = require('http-errors');
/* besoin du fichier etape dans le model*/
const Etape = require('../models/etape');
const ctrl = {};

/**
 * Display all etapes.
 *
 * @param  {Request}  req // demande
 * @param  {Response} res // reponse
 * @param  {function} next // qu'est ce je fais apres la reponse
/* recupere la liste de tous les etapes*/
ctrl.index = function index(req, res, next) {
  Etape
    .find() /* chercher dans la base*/
    .sort({createdAt: 'desc'}) /* trier du plus recents au plus anciens*/
    .then(function(etapes) {
      return res.status(200).send(etapes); /* retour du statut http 200 reussi en renvoyant la liste des etapes*/
    })
    .catch(next)// sinon une erreur qui va dans le module http error
  ;
};

/**
 * Create a new etape.
 *
 * @param  {Request}  req // demande
 * @param  {Response} res //  requete
 * @param  {function} next // si la création est réussi la phase de questionnement de quoi faire : etape suivante
 */
ctrl.create = function create(req, res, next) {
  Etape
    .create(req.body) // objet en appelant les fonctions
    .then(function(etape) {
      return res.status(201).send(etape); // retour du statut http reussi en renvoyant la liste des nouveaux users crées
    })
    .catch(next) /* http error*/
  ;
};

/**
 * Update an etape.
 *
 * @param  {Request}  req // requete
 * @param  {Response} res // reponse
 * @param  {function} next // la suite de ce qu'il faut faire
 */
ctrl.update = function update(req, res, next) {
  Etape
    .findOneAndUpdate({_id: req.params.id}, req.body, {new: true}) // trouver une mise à jour en fonction de la reponse de la requete
    .then(function(etape) {
      if (etape) {
        return res.status(200).send(etape);
      }

      throw httpError(404, 'Cannot find etape: ' + req.params.id);
    })
    .catch(next)
  ;
};

/**
 * Remove a given etape.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.destroy = function destroy(req, res, next) {
  Etape
    .findOneAndRemove({_id: req.params.id})
    .then(function(etape) {
      return res.status(200).send(etape);
    })
    .catch(next)
  ;
};

/**
 * Display a given etape.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.show = function show(req, res, next) {
  Etape
    .findById(req.params.id)
    .then(function(etape) {
      if (etape) {
        return res.status(200).send(etape);
      }

      throw next(httpError(404, 'Cannot find etape: ' + req.params.id));
    })
    .catch(next)
  ;
};

module.exports = ctrl;
