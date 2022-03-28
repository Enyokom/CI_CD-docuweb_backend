'use strict';

let router   = api.Router();
let operationsCtrl = require('../controllers/operations');
/* recupere la liste du document operation*/

router.get('/', operationsCtrl.index);
/* cree le document opération en lui passant la class opération dans le model*/
router.put('/', operationsCtrl.create);
/* recuperation du document operation porte l'id passé en parametre*/
router.get('/:id', operationsCtrl.show);
/* mise à jour du document opération par le parametre id passé et l'objet l'operation*/
router.post('/:id', operationsCtrl.update);
/* supprime le document operation qui porte l'id passé*/
router.delete('/:id', operationsCtrl.destroy);
api.app.use('/operations', router);
