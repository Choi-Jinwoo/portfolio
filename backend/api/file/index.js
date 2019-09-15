const fileCtrl = require('./file.ctrl');
const authMiddleware = require('../../middleware/auth');
const router = require('express').Router();
const upload = require('../../lib/configMulter');

router.post('/upload', authMiddleware, upload.array('files'), fileCtrl.uploadFile);
router.get('/download', fileCtrl.downloadFile);
module.exports = router;