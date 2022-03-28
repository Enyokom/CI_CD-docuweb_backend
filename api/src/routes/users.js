'use strict';

let router   = api.Router();
let userCtrl = require('../controllers/users');

/* router.get('/', userCtrl.index);
get => verbe
index => méthode (définie dans Controllers)
/*

/* recupere la liste des tous les users (index est une méthode définie dans controller.users)*/
/* recupere la liste des users*/
router.get('/', userCtrl.index);
/* creer un user en lui passant le user dans le model*/
router.post('/', userCtrl.create);
/* recupere un documment user en passant l'id*/
router.get('/:id', userCtrl.show);
/* une surcharge meme methode de parametres différente: recupération d'un tableau d'un document user selon le parametre nom*/
router.get('/:username', userCtrl.show);
/* mettre le document à jour avec le nouvel objet en lui passant le parametre id*/
router.put('/:id', userCtrl.update);
/* supprimer un document user suivant le parametre id passé*/
router.delete('/:id', userCtrl.destroy);


api.app.use('/users', router);

/* router.get('/:pwd' , userCtrl.hach);*/
