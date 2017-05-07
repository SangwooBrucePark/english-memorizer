/**
 * Created by bruce on 2017-05-06.
 */
var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');

router.get('/', function (req, res, next) {
    var start = req.query.start;
    var end = req.query.end;

    var sql = 'SELECT * FROM elements';

    if (start === undefined || end === undefined) {
        console.log('sql => ' + sql);
        dbcon.query(sql, function (err, result) {
            console.log('result => ', result);
            res.json(result);
        });
    } else {
        sql += ' WHERE id >= ' + start + ' and id <= ' + end;
        console.log('sql => ' + sql);
        dbcon.query(sql, function (err, result) {
            console.log('result => ', result);
            res.json(result);
        });
    }
});

module.exports = router;