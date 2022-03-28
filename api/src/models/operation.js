/**
 * Operation model
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
* Operation Schema
* @constructor Operation
*/

const OperationSchema = new Schema(/** @lends Operation.prototype */ {
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

  operationname: {
    type: String, // chaine de caracteres
    required: true, // champ obligatoire
    minLength: 2, // longueur mini
    maxLength: 50, // longueur maxi
    unique: true, // le nom de l'opération doit etre unique sinon erreur
  },
  statut: {
    type: Boolean,
    default: false,
  },
  historiques: [{
    type: Schema.Types.ObjectId, // construction d'un objet de type objet dans la reference historiques
    ref: 'Etape',
  }],
}, {
  timestamps: true, // refence de l'heure
});


/*----------------------------------------------------------------------------*\
  Increase
\*----------------------------------------------------------------------------*/

OperationSchema.virtual('id').get(function() {
  return this._id.toString();
});

/*----------------------------------------------------------------------------*\
  Expose
\*----------------------------------------------------------------------------*/

// JSON serialization
// le schema de l'objet sera transféré sous format json format api rest
OperationSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model('Operation', OperationSchema);
