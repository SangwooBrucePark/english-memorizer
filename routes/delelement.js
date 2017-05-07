/**
 * Created by bruce on 2017-05-06.
 */
var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');

router.get('/', function (req, res, next) {
    var id = req.query.id;

    var sql = "DELETE FROM elements WHERE id = " + id;
    console.log("sql => " + sql);
    dbcon.query(sql, function (err, result) {
        if (err) throw err;
        sql = "DELETE FROM groups WHERE eid = " + id;
        console.log("sql => " + sql);
        dbcon.query(sql, function (err, result) {
            if (err) throw err;
            res.json({
                "result": "ok"
            });
        });
    });
});

module.exports = router;