'use strict';

let router   = api.Router();
let loginCtrl = require('../controllers/auth');
router.post('/', loginCtrl.login);

api.app.use('/login', router);

