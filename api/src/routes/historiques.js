'use strict';

let router   = api.Router();
let historiqueCtlr = require('../controllers/historiques');
/* recupere la liste des historiques*/
router.get('/', historiqueCtlr.index);
/* cree le document historique en lui passant l'objet historique dans le model*/
router.post('/', historiqueCtlr.create);
/* recupere le document historique qui porte l'id passé en parametre*/
router.get('/:id', historiqueCtlr.show);
/* mettre à jour le document historique qui porte l'id passé en parametre avec le nouvel objet qui vient du model*/
router.put('/:id', historiqueCtlr.update);
/* supprimer un document historique suivant le parametre id passé*/
router.delete('/:id', historiqueCtlr.destroy);

api.app.use('/historiques', router);
