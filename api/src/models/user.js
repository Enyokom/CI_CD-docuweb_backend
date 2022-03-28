/**
 * User model
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
 * User Schema
 * @constructor User
 */

const UserSchema = new Schema(/** @lends User.prototype */ {
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

  username: {
    type: String, // chaine de caracteres
    required: true, // champ obligatoire
    minLength: 2, // longueur mini
    maxLength: 30, // longueur maxi
  },


  email: {
    type: String, // chaine de caractere
    minLength: 5, // longueur min
    maxLength: 30, // longueur maxi
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Créer une énumération => enum
  role: {
    type: String,
    enum: ['operateur', 'admin', 'superviseur'],
    default: 'operateur',
  },

  // construction d'un objet de type objet dans la reference articles
}, {
  timestamps: true, // refence de l'heure
});


/*----------------------------------------------------------------------------*\
  Increase
\*----------------------------------------------------------------------------*/

UserSchema.virtual('id').get(function() {
  return this._id.toString();
});

/* UserSchema.virtual('username').get(function() {
  return this._username.toString();
});*/

/*----------------------------------------------------------------------------*\
  Expose
\*----------------------------------------------------------------------------*/

// JSON serialization
// le schema de l'objet sera transféré sous format json format api rest
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

module.exports = mongoose.model('User', UserSchema);
