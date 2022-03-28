'use strict';
/* toutes les erreurs ce sont des methodes avec la gestion de retour de la base de données*/
const httpError = require('http-errors');
/* besoin du fichier historique dans le model*/
const Historique = require('../models/historique');
const ctrl = {};

/**
 * Display all historiques.
 *
 * @param  {Request}  req // demande
 * @param  {Response} res // reponse
 * @param  {function} next // qu'est ce je fais apres la reponse
/* recupere la liste de tous les historiques*/
ctrl.index = function index(req, res, next) {
  Historique
    .find() /* chercher dans la base*/
    .sort({createdAt: 'desc'}) /* trier du plus recents au plus anciens*/
    .then(function(historiques) {
      return res.status(200).send(historiques); /* retour du statut http 200 reussi en renvoyant la liste des historiques*/
    })
    .catch(next)// sinon une erreur qui va dans le module http error
  ;
};

/**
 * Create a new historique.
 *
 * @param  {Request}  req // demande
 * @param  {Response} res //  requete
 * @param  {function} next // si la création est réussi la phase de questionnement de quoi faire : historique suivante
 */
ctrl.create = function create(req, res, next) {
  Historique
    .create(req.body) // objet en appelant les fonctions
    .then(function(historique) {
      return res.status(201).send(historique); // retour du statut http reussi en renvoyant la liste des nouveaux users crées
    })
    .catch(next) /* http error*/
  ;
};

/**
 * Update an historique.
 *
 * @param  {Request}  req // requete
 * @param  {Response} res // reponse
 * @param  {function} next // la suite de ce qu'il faut faire
 */
ctrl.update = function update(req, res, next) {
  Historique
    .findOneAndUpdate({_id: req.params.id}, req.body, {new: true}) // trouver une mise à jour en fonction de la reponse de la requete
    .then(function(historique) {
      if (historique) {
        return res.status(200).send(historique);
      }

      throw httpError(404, 'Cannot find historique: ' + req.params.id);
    })
    .catch(next)
  ;
};

/**
 * Remove a given historique.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.destroy = function destroy(req, res, next) {
  Historique
    .findOneAndRemove({_id: req.params.id})
    .then(function(historique) {
      return res.status(200).send(historique);
    })
    .catch(next)
  ;
};

/**
 * Display a given historique.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.show = function show(req, res, next) {
  Historique
    .findById(req.params.id)
    .then(function(historique) {
      if (historique) {
        return res.status(200).send(historique);
      }

      throw next(httpError(404, 'Cannot find historique: ' + req.params.id));
    })
    .catch(next)
  ;
};

module.exports = ctrl;
