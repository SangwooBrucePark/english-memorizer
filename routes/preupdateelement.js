var express = require('express');
var router = express.Router();

var dbcon = require('../bin/dbconnector');

router.get('/', function(req, res, next) {
    var id = req.query.id;

    var sql = "SELECT * FROM elements WHERE id ='" + id + "'";
    console.log("sql => " + sql);
    dbcon.query(sql, function (err, result) {
        if (result.length !== 0) {
            res.render('preupdateelement', {
                'id': result[0].id,
                'text_eng': decodeURIComponent(result[0].text_eng),
                'text_kor': decodeURIComponent(result[0].text_kor)
            });
        }
    });
});

module.exports = router;
