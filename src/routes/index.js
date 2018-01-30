const router = require('express').Router();
const DataController = require('../controllers/DataController');

router.post('/data/fetch', DataController);

module.exports = router;