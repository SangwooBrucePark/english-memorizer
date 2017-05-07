/**
 * Created by bruce on 2017-05-05.
 */
var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');
var moment = require('moment');

/*
 {
 start: int,
 end: int,
 }
 */

router.get('/', function (req, res, next) {
    var cur_datetime = moment().format('YYYY-MM-DD HH:mm:ss:SSS');

    var condition = req.query.condition;

    if (condition === 'range') {
        var start = req.query.start;
        var end = req.query.end;
        var sql = "SELECT id FROM elements WHERE id >= " + start + " and id <= " + end;

        console.log("sql => " + sql);
        dbcon.query(sql, function (err, result) {
            if (err) throw err;
            var ids = [];
            result.forEach(function (p1, p2, p3) {
                ids.push(p1.id);
            });
            console.log(ids);
            shuffle(ids);
            console.log("shuffled => " + ids);

            ids.forEach(function (p1, p2, p3) {
                sql = "INSERT INTO groups (gid, seq, eid) VALUES ('" + cur_datetime + "', " + p2 + ", " + p1 + ")";
                dbcon.query(sql, function (err, result) {
                    console.log('Element is inserted in the new group!!: ' + p1);
                });
            });

            res.json({"result": "ok"});
        });
    } else if (condition === 'random') {
        var numofq = parseInt(req.query.numofq);
        console.log('numofq => ' + numofq);

        sql = 'SELECT id FROM elements';
        console.log("sql => " + sql);
        dbcon.query(sql, function (err, result) {
            if (err) throw err;
            var ids = [];
            result.forEach(function (p1, p2, p3) {
                ids.push(p1.id);
            });
            console.log('original => ' + ids);
            shuffle(ids);
            console.log('shuffled => ' + ids);

            ids.forEach(function (p1, p2, p3) {
                if (typeof p2 === typeof numofq && numofq !== NaN && p2 < numofq) {
                    sql = "INSERT INTO groups (gid, seq, eid) VALUES ('" + cur_datetime + "', " + p2 + ", " + p1 + ")";
                    dbcon.query(sql, function (err, result) {
                        console.log('Element is inserted in the new group!!: ' + p1);
                    });
                }
            });

            res.json({"result": "ok"});
        });
    } else {
        res.json({"result": "wrong condition"});
    }
});

function shuffle(arr) {
    var counter = arr.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
}

module.exports = router;