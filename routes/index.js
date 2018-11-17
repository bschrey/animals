const express = require('express');
const router = express.Router();
const pkg = require('../package.json');

/* GET home page. */
router.get('/', (req, res, next) => {
  	res.status(200).json({'animals': 'server'});
});

router.get('/api/version', (req, res, next) => {
  	res.status(200).send(pkg.version);
});

module.exports = router;
