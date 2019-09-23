const eventCtrl = require('./event.ctrl');
const authMiddleware = require('../../middleware/auth');
const router = require('express').Router();
const upload = require('../../lib/configMulter');

router.get('/', authMiddleware, eventCtrl.getEvents);
router.post('/', authMiddleware, eventCtrl.addEvent);
router.delete('/', authMiddleware, eventCtrl.deleteEvent);

module.exports = router;