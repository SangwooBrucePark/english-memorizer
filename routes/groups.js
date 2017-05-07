/**
 * Created by bruce on 2017-05-05.
 */
var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');

router.get('/', function (req, res, next) {
    var sql = 'SELECT gid, count(*) as cnt FROM groups GROUP BY gid ORDER BY gid DESC';
    console.log("sql => " + sql);
    dbcon.query(sql, function (err, result) {
        console.log("result => ", result);
        res.json(result);
    });
});

module.exports = router;