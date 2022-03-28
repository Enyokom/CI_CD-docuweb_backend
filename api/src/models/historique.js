/**
 * Historique model
 */

'use strict';


/* creation d'un objet mongoose pour se connecter a la DB MongoDB*/

// eslint-disable-next-line no-redeclare
let mongoose = require('mongoose');

const Schema = mongoose.Schema;


/*----------------------------------------------------------------------------*\
  Schema
\*----------------------------------------------------------------------------*/

/**
* Historique Schema
* @constructor Historique
*/

const HistoriqueSchema = new Schema(/** @lends Historique.prototype */ {
  // meta data
  /* le champ creatAt de type Date et pour valeur par defaut la date de maintenant*/
  createdAt: {
    type: Date,
    default: Date.now,
  },
  /* le champ UpdatedAt est la date modification de type Date et pour valeur par defaut la date de maintenant*/
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  userid: {
    type: String,
    required: true,
  },
  operationid: {
    type: String,
    required: true,
  },

}, {
  timestamps: true, // refence de l'heure
});


/*----------------------------------------------------------------------------*\
  Increase
\*----------------------------------------------------------------------------*/

HistoriqueSchema.virtual('id').get(function() {
  return this._id.toString();
});

/*----------------------------------------------------------------------------*\
  Expose
\*----------------------------------------------------------------------------*/

// JSON serialization
// le schema de l'objet sera transféré sous format json format api rest
HistoriqueSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model('Historique', HistoriqueSchema);
