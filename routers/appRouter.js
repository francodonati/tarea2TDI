const express = require('express');

const router = express.Router();
const { getStatus, deleteAll } = require('../controllers/appController');

router.get('/status', getStatus);
router.delete('/data', deleteAll);

module.exports = router;