'use strict';

let router   = api.Router();
let etapeCtrl = require('../controllers/etapes');

/* index retourne la liste des etapes*/
router.get('/', etapeCtrl.index);
/* creer le document en passant l'objet etape qui est dans le modele*/
router.post('/', etapeCtrl.create);
/* montre une etape en passant l'id*/
router.get('/:id', etapeCtrl.show);
/* passer un id en parametre pour mette le document etape en lui passant son id et le nouvel objet qui est declaré dans le modele
*/
router.put('/:id', etapeCtrl.update);
/* permet de supprimer le document etape qui porte son id*/
router.delete('/:id', etapeCtrl.destroy);

/* recuperation du document en tableau*/
// router.get('/:nom', etapeCtrl.showNom);

api.app.use('/etapes', router);
