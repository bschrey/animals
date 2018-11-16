'use strict';

const express = require('express');
const morgan = require('morgan');
const pkg = require('./package.json');

const app = express();

app.use(morgan('dev'));

app.get('/api/version', (req, res) => res.status(200).send(pkg.version));

app.get('/hello/:name', (req, res) => {
	res.status(200).json({'hello': req.params.name});
});

app.listen(30001, () => console.log('Ready.'));