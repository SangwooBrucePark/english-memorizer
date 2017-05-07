/**
 * Created by bruce on 2017-05-06.
 */
var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');

router.get('/', function (req, res, next) {
    var gid = req.query.gid;

    var sql = "DELETE FROM groups WHERE gid ='" + gid + "'";
    console.log("sql => " + sql);
    dbcon.query(sql, function (err, result) {
        res.json({
            "result": "ok"
        });
    });
});

module.exports = router;