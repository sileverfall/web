var express = require('express');
var router = express.Router();

exports.index = function (req, res) {
    res.send("Welcome " + req.params.username);
    res.render('hello');
};