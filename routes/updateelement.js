/**
 * Created by bruce on 2017-05-13.
 */
var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');
var moment = require('moment');

router.post('/', function(req, res, next) {
    var cur_datetime = moment().format('YYYY-MM-DD HH:mm:ss');
    var sql = "UPDATE elements SET text_eng = '" + req.body.text_eng + "', text_kor = '" + req.body.text_kor + "', updated_at = '" + cur_datetime + "' WHERE id = " + req.body.id;
    console.log("sql => " + sql);
    dbcon.query(sql, function (err, result) {
        if (err) throw err;
        res.json({
            "result": "ok"
        });
    });
});

module.exports = router;