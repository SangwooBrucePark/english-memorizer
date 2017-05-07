/**
 * Created by bruce on 2017-05-06.
 */
var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');

router.get('/', function (req, res, next) {
    var gid = req.query.gid;
    var sql = "SELECT id, text_eng, text_kor, seq FROM groups, elements WHERE id = eid and gid = '" + gid + "' ORDER BY seq";
    console.log("sql => " + sql);
    dbcon.query(sql, function (err, result) {
        if (err) throw err;
        console.log("result => ", result);
        if (result.length !== 0) {
            res.json({
                "result": "ok",
                "questions": result
            });
        } else {
            res.json({
                "result": "no result"
            });
        }
    });
});

module.exports = router;