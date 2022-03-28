'use strict';

require('../config'); // necessite un fichier confi

const { Etape } = require('../config');
/* creer un objet etape par defaut quand il n'existe pas dans la base de données*/
function createEtape(etape) {
  let defaultEtape = {
    name: 'test etape',
    descriptif: 'Maintenance Aero', // valeur par defaut cree avec des objets par defaut
  };

  if (!etape) { /*! si etape n'existe pas dans la base*/
    etape = defaultEtape; /* creer l'objet etape par defaut*/
  }

  return Etape.create(etape); /* utilise le controle dans la base de donnée de MG*/
}

module.exports = {createEtape};

