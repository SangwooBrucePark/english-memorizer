/**
 * Created by bruce on 2017-05-05.
 */
var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');
var moment = require('moment');

router.post('/', function (req, res, next) {
    var cur_datetime = moment().format('YYYY-MM-DD HH:mm:ss');
    var sql = "INSERT INTO elements (text_eng, text_kor, updated_at, created_at) VALUES ('" + req.body.text_eng + "', '" + req.body.text_kor + "', '" + cur_datetime + "', '" + cur_datetime + "')";
    console.log("sql => " + sql);
    dbcon.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    res.json({"result": "ok"});
});

module.exports = router;