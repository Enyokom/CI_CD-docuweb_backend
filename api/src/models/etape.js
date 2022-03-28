/**
 * Etape model
 */

'use strict';

// eslint-disable-next-line no-redeclare

/* creation d'un objet mongoose pour se connecter a la DB MongoDB*/
// eslint-disable-next-line no-redeclare
let mongoose = require('mongoose');

const Schema = mongoose.Schema;


/*----------------------------------------------------------------------------*\
  Schema
\*----------------------------------------------------------------------------*/

/**
* Etape Schema
* @constructor Etape
*/

const EtapeSchema = new Schema(/** @lends Etape.prototype */ {
  // meta data
  /* le champ creatAt de type Date et pour valeur par defaut la date de maintenant*/
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // le champ UpdatedAt est la date modification de type Date et pour valeur par defaut la date de maintenant*/
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  name: {
    type: String, // chaine de caracteres
    required: true, // champ obligatoire
    minLength: 2, // longueur mini
    maxLength: 24, // longueur maxi
    unique: true, // le nom d'utilisateur doit etre unique sinon erreur
  },

  descriptif: {
    type: String, // chaine de caractere
    minLength: 5, // longueur min
    maxLength: 30, // longueur maxi
  },
  statut: {
    type: Boolean,
    default: false, // valeur par defaut d
  },
}, {
  timestamps: true, // refence de l'heure
});


/*----------------------------------------------------------------------------*\
  Increase
\*----------------------------------------------------------------------------*/

EtapeSchema.virtual('id').get(function() {
  return this._id.toString();
});

/*----------------------------------------------------------------------------*\
  Expose
\*----------------------------------------------------------------------------*/

// JSON serialization
// le schema de l'objet sera transféré sous format json format api rest
EtapeSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model('Etape', EtapeSchema);
